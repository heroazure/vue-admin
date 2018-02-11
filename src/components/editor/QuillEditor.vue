<template>
    <div>
        <quill-editor v-model="content"
                      ref="myTextEditor"
                      :options="editorOption"
                      @change="onChange">
            <div v-if="fileUploadWay!=='base64'" :id="toolbarId" slot="toolbar">
                <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
                <span class="ql-formats"><button type="button" class="ql-italic"></button></span>
                <span class="ql-formats"><button type="button" class="ql-underline"></button></span>
                <span class="ql-formats"><button type="button" class="ql-strike"></button></span>
                <span class="ql-formats"><button type="button" class="ql-blockquote"></button></span>
                <span class="ql-formats"><button type="button" class="ql-code-block"></button></span>
                <span class="ql-formats"><button type="button" class="ql-header" value="1"></button></span>
                <span class="ql-formats"><button type="button" class="ql-header" value="2"></button></span>
                <span class="ql-formats"><button type="button" class="ql-list" value="ordered"></button></span>
                <span class="ql-formats"><button type="button" class="ql-list" value="bullet"></button></span>
                <span class="ql-formats"><button type="button" class="ql-script" value="sub"></button></span>
                <span class="ql-formats"><button type="button" class="ql-script" value="super"></button></span>
                <span class="ql-formats"><button type="button" class="ql-indent" value="-1"></button></span>
                <span class="ql-formats"><button type="button" class="ql-indent" value="+1"></button></span>
                <span class="ql-formats"> <button type="button" class="ql-direction" value="rtl"></button></span>

                <span class="ql-formats"><select class="ql-size">
        <option value="small"></option>
        <option selected></option>
        <option value="large"></option>
        <option value="huge"></option>
      </select></span>
                <span class="ql-formats"><select class="ql-header">
        <option value="1"></option>
        <option value="2"></option>
        <option value="3"></option>
        <option value="4"></option>
        <option value="5"></option>
        <option value="6"></option>
        <option selected="selected"></option>
      </select></span>
                <span class="ql-formats"><select class="ql-color">
        <option selected="selected"></option>
        <option value="#e60000"></option>
        <option value="#ff9900"></option>
        <option value="#ffff00"></option>
        <option value="#008a00"></option>
        <option value="#0066cc"></option>
        <option value="#9933ff"></option>
        <option value="#ffffff"></option>
        <option value="#facccc"></option>
        <option value="#ffebcc"></option>
        <option value="#ffffcc"></option>
        <option value="#cce8cc"></option>
        <option value="#cce0f5"></option>
        <option value="#ebd6ff"></option>
        <option value="#bbbbbb"></option>
        <option value="#f06666"></option>
        <option value="#ffc266"></option>
        <option value="#ffff66"></option>
        <option value="#66b966"></option>
        <option value="#66a3e0"></option>
        <option value="#c285ff"></option>
        <option value="#888888"></option>
        <option value="#a10000"></option>
        <option value="#b26b00"></option>
        <option value="#b2b200"></option>
        <option value="#006100"></option>
        <option value="#0047b2"></option>
        <option value="#6b24b2"></option>
        <option value="#444444"></option>
        <option value="#5c0000"></option>
        <option value="#663d00"></option>
        <option value="#666600"></option>
        <option value="#003700"></option>
        <option value="#002966"></option>
        <option value="#3d1466"></option>
      </select></span>
                <span class="ql-formats"> <select class="ql-background">
        <option value="#000000"></option>
        <option value="#e60000"></option>
        <option value="#ff9900"></option>
        <option value="#ffff00"></option>
        <option value="#008a00"></option>
        <option value="#0066cc"></option>
        <option value="#9933ff"></option>
        <option selected="selected"></option>
        <option value="#facccc"></option>
        <option value="#ffebcc"></option>
        <option value="#ffffcc"></option>
        <option value="#cce8cc"></option>
        <option value="#cce0f5"></option>
        <option value="#ebd6ff"></option>
        <option value="#bbbbbb"></option>
        <option value="#f06666"></option>
        <option value="#ffc266"></option>
        <option value="#ffff66"></option>
        <option value="#66b966"></option>
        <option value="#66a3e0"></option>
        <option value="#c285ff"></option>
        <option value="#888888"></option>
        <option value="#a10000"></option>
        <option value="#b26b00"></option>
        <option value="#b2b200"></option>
        <option value="#006100"></option>
        <option value="#0047b2"></option>
        <option value="#6b24b2"></option>
        <option value="#444444"></option>
        <option value="#5c0000"></option>
        <option value="#663d00"></option>
        <option value="#666600"></option>
        <option value="#003700"></option>
        <option value="#002966"></option>
        <option value="#3d1466"></option>
      </select></span>
                <span class="ql-formats"><select class="ql-font">
        <option selected="selected"></option>
        <option value="serif"></option>
        <option value="monospace"></option>
      </select></span>
                <span class="ql-formats">
        <select class="ql-align">
        <option selected="selected"></option>
        <option value="center"></option>
        <option value="right"></option>
        <option value="justify"></option>
      </select>
      </span>
                <span class="ql-formats">
          <button type="button" class="ql-clean"></button>
      </span>
                <span class="ql-formats">
          <button type="button" class="ql-link"></button>
      </span>
                <span class="ql-formats" v-if="fileUploadWay==='backApi'">
          <button type="button" @click="onImgClick">
            <svg viewBox="0 0 18 18">
                <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect>
                <circle class="ql-fill" cx="6" cy="7" r="1"></circle>
                <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
            </svg>
          </button>
      </span>
                <span class="ql-formats" v-if="fileUploadWay==='thirdParty'" :id="qiniuContainerId+'P'">
          <button type="button" :id="qiniuContainerId">
            <svg viewBox="0 0 18 18">
                <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect>
                <circle class="ql-fill" cx="6" cy="7" r="1"></circle>
                <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
            </svg>
          </button>
      </span>
                <span class="ql-formats">
           <button type="button" class="ql-video"></button>
       </span>
            </div>
        </quill-editor>
        <!--<crop-upload
          v-model="showCrop"
          :width="width"
          :height="height"
          :fileName="fileName"
          :uploadUrl="uploadUrl"
          @uploadSuccess="onUploadSuccess"
        ></crop-upload>-->
    </div>
</template>
<script>
    import {quillEditor} from 'vue-quill-editor'
    import upload from './upload'
    //  import CropUpload from './CropUpload'
    export default {
        name: 'hx-editor',
        components: {
            quillEditor,
//      CropUpload
        },
        props: {
            //编辑器的内容
            value: {
                type: String
            },
            //上传图片的地址
            uploadUrl: {
                type: String
            },
            qiniuContainerId:{
                type:String,
                default:'uploadImg'
            },
            toolbarId:{
                type:String,
                default:'quill-toolbar'
            },
            //上传图片的file控件name
            fileName: {
                type: String,
                default: 'file'
            },
            //图片大小
            maxSize: {
                type: Number,
                default: 400//kb
            },
            //图片上传方式,后台接口：backApi,第三方(例如：七牛):thirdParty,64位编码图片:base64
            fileUploadWay: {
                type: String,
                default: 'backApi'
            },
            //是否使用裁切
            canCrop: {
                type: Boolean,
                default: false
            },
            //裁切的最小尺寸
            width: {
                type: Number,
                default: 200
            },
            //裁切的最小尺寸
            height: {
                type: Number,
                default: 200
            }
        },
        data() {
            return {
                content: '',
                //显示裁切控件
                showCrop: false
            }
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill
            },
            editorOption(){
                if (this.fileUploadWay === 'base64') {
                    return {}
                } else {
                    return {
                        modules: {
                            toolbar: '#'+this.toolbarId
                        }
                    }
                }
            }
        },
        mounted(){
            this.content = this.value
            if (this.fileUploadWay === 'thirdParty') {
                this.initUpload()
            }
        },
        methods: {
            onChange(){
                this.$emit('input', this.content)
            },
            //选择上传图片切换
            onFileChange(e){
                let fileInput = e.target
                if (fileInput.files.length === 0) {
                    return
                }
                if (fileInput.files[0].size > 1024 * this.maxSize) {
                    alert(`图片过大,不能超过${this.maxSize}kb`)
                    return
                }
                if (!this.uploadUrl) {
                    console.log('没有上传图片url')
                    return
                }
                let that = this
                let data = new FormData()
                data.append(this.fileName, fileInput.files[0], name)
                this.editor.focus()
                let xhr = new XMLHttpRequest()
                xhr.open('post', this.uploadUrl)
                xhr.responseType = 'json'
                xhr.send(data)
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        let index = that.editor.getSelection() ? that.editor.getSelection().index : 0
                        that.editor.insertEmbed(index, 'image', xhr.response.url)
                    }
                }
            },
            //裁切上传成功 res根据上传接口值获取
            /*onUploadSuccess: function (res) {
             this.editor.focus()
             let index=that.editor.getSelection()?that.editor.getSelection().index:0
             this.editor.insertEmbed(index, 'image', res.url)
             },*/
            //点击上传图片按钮
            onImgClick() {
                if (this.canCrop) {
                    this.showCrop = true
                } else {
                    //创建input file 不裁切，自己控制
                    let input = document.createElement('input')
                    input.type = 'file'
                    input.name = this.fileName
                    input.accept = 'image/jpeg,image/png,image/jpg,image/gif'
                    input.onchange = this.onFileChange
                    input.click()
                }
            },
            initUpload(){
                let that = this
                //初始化七牛上传logo组件
                upload(this.qiniuContainerId, this.qiniuContainerId+'P',
                    function () {
                        console.log('callback 1')
                    },
                    //获得上传进度的回调
                    function (persent) {
                        console.log('callback 2')
                        console.log(persent)
                    },
                    //获得上传成功后url的回调
                    function (source) {
                        console.log('source:', source)
                        let index = that.editor.getSelection() ? that.editor.getSelection().index : 0
                        that.editor.insertEmbed(index, 'image', source)
                    })
            }
        },
        watch: {
            'value'(newVal, oldVal) {
                if (this.editor && newVal !== this.content) {
                    this.content = newVal
                }
            }
        }
    }
</script>
