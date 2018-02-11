<template>
  <div :class="[prefixCls]" :id="containerId">
    <div
      :id="btnId"
      :class="classes"
      @dragover.prevent="dragOver = true"
      @dragleave.prevent="dragOver = false">
      <slot></slot>
    </div>
    <slot name="tip"></slot>
    <upload-list
      v-if="showUploadList"
      :files="fileList"
      @on-file-remove="handleRemove"
      @on-file-preview="handlePreview"></upload-list>
  </div>
</template>
<script>
  import UploadList from './upload-list.vue'
  import {oneOf} from './assist'
  import Emitter from './emitter'
  import axios from 'axios'

  const prefixCls = 'ivu-upload'

  export default {
    name: 'upload-qiniu',
    mixins: [Emitter],
    components: {UploadList},
    props: {
        /*value:{
          type: Array,
          default () {
            return []
          }
        },*/
      containerId: {
        type: String,
        default: 'container'
      },
      btnId: {
        type: String,
        default: 'trigger'
      },
      multiple: {
        type: Boolean,
        default: true
      },
      showUploadList: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        validator (value) {
          return oneOf(value, ['select', 'drag']);
        },
        default: 'select'
      },
      format: {
        type: Array,
        default () {
          return [];
        }
      },
      //单位为mb
      maxSize: {
        type: Number
      },
      onBeforeUpload: {
        type: Function,
        default () {
          return {};
        }
      },
      onProgress: {
        type: Function,
        default () {
          return {};
        }
      },
      onSuccess: {
        type: Function,
        default () {
          return {};
        }
      },
      onError: {
        type: Function,
        default () {
          return {};
        }
      },
      onComplete: {
        type: Function,
        default () {
          return {};
        }
      },
      onRemove: {
        type: Function,
        default () {
          return {};
        }
      },
      onPreview: {
        type: Function,
        default () {
          return {};
        }
      },
      onExceededSize: {
        type: Function,
        default () {
          return {};
        }
      },
      onFormatError: {
        type: Function,
        default () {
          return {};
        }
      },
      defaultFileList: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data () {
      return {
        prefixCls: prefixCls,
        dragOver: false,
        fileList: [],
        tempIndex: 1,
        uptoken: ''
      };
    },
    mounted(){
      this.$nextTick(() => {
        this.getUptoken(this.initQiniu)
      })
    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-select`]: this.type === 'select',
            [`${prefixCls}-drag`]: this.type === 'drag',
            [`${prefixCls}-dragOver`]: this.type === 'drag' && this.dragOver
          }
        ]
      }
    },
    methods: {
      initQiniu () {
        let that = this
        let uploader = Qiniu.uploader({
          runtimes: 'html5,flash,html4',      // 上传模式，依次退化
          browse_button: this.btnId,         // 上传选择的点选按钮，必需
          // 在初始化时，uptoken，uptoken_url，uptoken_func三个参数中必须有一个被设置
          // 切如果提供了多个，其优先级为uptoken > uptoken_url > uptoken_func
          // 其中uptoken是直接提供上传凭证，uptoken_url是提供了获取上传凭证的地址，如果需要定制获取uptoken的过程则可以设置uptoken_func
          uptoken: this.uptoken, // uptoken是上传凭证，由其他程序生成
          //uptoken_url: '/index.php/api/Index/UploadToken',         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
          //uptoken_func: function(){    // 在需要获取uptoken时，该方法会被调用
          // do something
          //},
          multi_selection: this.multiple,
          get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
          // downtoken_url: '/downtoken',
          // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
          // unique_names: true,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
          // save_key: true,                  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
          domain: 'http://7xlx4s.com1.z0.glb.clouddn.com/',     // bucket域名，下载资源时用到，必需
          container: this.containerId,             // 上传区域DOM ID，默认是browser_button的父元素
          max_file_size: `${this.maxSize}mb`,             // 最大文件体积限制
          max_retries: 3,                     // 上传失败最大重试次数
          dragdrop: true,                     // 开启可拖曳上传
          drop_element: this.containerId,          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
          chunk_size: '4mb',                  // 分块上传时，每块的体积
          auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传

          init: {
            'FilesAdded': function (up, files) {
              plupload.each(files, function (file) {
                // 文件添加进队列后，处理相关的事情
                that.onBeforeUpload(file)
                let type = file.type.split('/')[1]
                if (that.format && that.format.length && that.format.indexOf(type) === -1) {
                  up.removeFile(file)
                  that.onFormatError(file, that.fileList)
                  return false
                  //let progress = new FileProgress(file, 'fsUploadProgress')
                }
                // 检查最大尺寸
                if (that.maxSize) {
                  if (file.size > that.maxSize * 1024 * 1024) {
                    that.onExceededSize(file, that.fileList)
                    up.removeFile(file)
                    return false
                  }
                }
              })
            },
            'BeforeUpload': function (up, file) {
              // 每个文件上传前，处理相关的事情
              that.handleStart(file)
            },
            'UploadProgress': function (up, file) {
              // 每个文件上传时，处理相关的事情
              that.handleProgress(file)
            },
            'FileUploaded': function (up, file, info) {
              // 每个文件上传成功后，处理相关的事情
              // 其中info.response是文件上传成功后，服务端返回的json，形式如：
              // {
              //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
              //    "key": "gogopher.jpg"
              //  }
              // 查看简单反馈
              let domain = up.getOption('domain')
              let res = JSON.parse(info.response)
              let path = domain + "/" + res.key //获取上传成功后的文件的Url
              that.handleSuccess({path: path, name: res.hash}, file)
            },
            'Error': function (up, err, errTip) {
              //上传出错时，处理相关的事情
              /*if(err.code === -600){
               console.log('文件大小超过限制')
               }*/
              console.log('err:', err)
              //that.handleError(err, up)
            },
            'UploadComplete': function () {
              //队列文件处理完毕后，处理相关的事情
              that.handleComplete()
            }
          }
        })
      },
      getUptoken(cb){
        if (this.uptoken) {
          cb && cb()
          return
        }
        axios({
          url: '/index.php/api/Index/UploadToken',
          method: 'get'
        }).then(({data}) => {
          if (data.status.code === 0) {
            this.uptoken = data.data
            cb && cb()
          }
        })
      },
      handleStart (file) {
        file.uid = Date.now() + this.tempIndex++
        const item = {
          status: 'uploading',
          name: file.name,
          size: file.size,
          percentage: 0,
          uid: file.uid,
          showProgress: true
        }
        this.fileList.push(item)
      },
      getItem (file) {
        const fileList = this.fileList
        let target
        fileList.every(im => {
          target = file.uid === im.uid ? im : null
          return !target
        })
        return target
      },
      handleProgress (file) {
        const item = this.getItem(file)
        item.percentage = file.percent || 0
        this.onProgress(item, file, this.fileList)
      },
      handleSuccess (res, file) {
        const item = this.getItem(file)

        if (item) {
          item.status = 'finished'
          item.url = res.path
          item.name = res.name
          this.dispatch('FormItem', 'on-form-change', item)
          this.onSuccess(item, file, this.fileList)

          setTimeout(() => {
            item.showProgress = false
          }, 100)
        }
      },
      handleError (err, file) {
        const item = this.getItem(file)
        const fileList = this.fileList

        item.status = 'fail'

        fileList.splice(fileList.indexOf(item), 1)

        this.onError(err, fileList)
      },
      handleComplete(){
        this.onComplete()
      },
      handleRemove(item) {
        const fileList = this.fileList
        fileList.splice(fileList.indexOf(item), 1)
        this.onRemove(item, fileList)
      },
      handlePreview(item) {
        if (item.status === 'finished') {
          this.onPreview(item)
        }
      },
      clearFiles() {
        this.fileList = []
      }
    },
    watch: {
      defaultFileList: {
        immediate: true,
        handler(fileList) {
          this.fileList = fileList.map(item => {
            item.status = 'finished'
            item.percentage = 100
            item.uid = Date.now() + this.tempIndex++
            return item
          })
          this.$emit('update',this.fileList)
        }
      }
    }
  }
</script>
