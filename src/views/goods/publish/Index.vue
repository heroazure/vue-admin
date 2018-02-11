<template>
  <layout-main>
    <Breadcrumb slot="navigator">
      <Breadcrumb-item href="/goods">商品管理</Breadcrumb-item>
      <Breadcrumb-item>商品发布</Breadcrumb-item>
    </Breadcrumb>
    <Form ref="formValidate" :model="form" :rules="ruleValidate" :label-width="80">
      <FormItem label="商品名称" prop="name">
        <Row :gutter="10">
          <Col span="12">
          <Input v-model="form.name" placeholder="请输入商品名称" :maxlength="30"></Input>
          </Col>
          <Col span="6">
          标题不能超过30个字
          </Col>
        </Row>
      </FormItem>
      <FormItem label="商品属性" prop="property">
        <Row :gutter="10">
          <Col span="4">
          <Select v-model="form.property.material" placeholder="请选择外壳材质">
            <Option :value="item.id" v-for="item in materials" :key="item.id">{{item.name}}</Option>
          </Select>
          </Col>
          <Col span="4">
          <Select v-model="form.property.material" placeholder="请选择外壳材质">
            <Option :value="item.id" v-for="item in materials" :key="item.id">{{item.name}}</Option>
          </Select>
          </Col>
          <Col span="4">
          <Select v-model="form.property.material" placeholder="请选择外壳材质">
            <Option :value="item.id" v-for="item in materials" :key="item.id">{{item.name}}</Option>
          </Select>
          </Col>
          <Col span="4">
          <Select v-model="form.property.material" placeholder="请选择外壳材质">
            <Option :value="item.id" v-for="item in materials" :key="item.id">{{item.name}}</Option>
          </Select>
          </Col>
          <Col span="4">
          <Select v-model="form.property.material" placeholder="请选择外壳材质">
            <Option :value="item.id" v-for="item in materials" :key="item.id">{{item.name}}</Option>
          </Select>
          </Col>
          <Col span="3">
          最少添加3个属性
          </Col>
        </Row>
        <Row style="margin-left: 0;margin-right: -10px;margin-top: 5px;" :gutter="10">
          <Col span="4">
          <Select v-model="form.property.material" placeholder="请选择外壳材质">
            <Option :value="item.id" v-for="item in materials" :key="item.id">{{item.name}}</Option>
          </Select>
          </Col>
          <Col span="4">
          <Select v-model="form.property.material" placeholder="请选择外壳材质">
            <Option :value="item.id" v-for="item in materials" :key="item.id">{{item.name}}</Option>
          </Select>
          </Col>
          <Col span="4">
          <Select v-model="form.property.material" placeholder="请选择外壳材质">
            <Option :value="item.id" v-for="item in materials" :key="item.id">{{item.name}}</Option>
          </Select>
          </Col>
          <Col span="4">
          <Select v-model="form.property.material" placeholder="请选择外壳材质">
            <Option :value="item.id" v-for="item in materials" :key="item.id">{{item.name}}</Option>
          </Select>
          </Col>
          <Col span="4">
          <Select v-model="form.property.material" placeholder="请选择外壳材质">
            <Option :value="item.id" v-for="item in materials" :key="item.id">{{item.name}}</Option>
          </Select>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="支持定制" prop="canCustom">
        <Row :gutter="10">
          <Col span="6">
          <RadioGroup v-model="form.canCustom">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </RadioGroup>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="商品规格">
        <Row :gutter="10">
          <Col span="24">

          </Col>
        </Row>
      </FormItem>
      <FormItem label="商品价格" prop="price">
        <Row :gutter="10">
          <Col span="6">
          <Input v-model="form.price" placeholder="请输入商品价格">
          <Icon type="social-yen-outline" slot="prepend"></Icon>
          </Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="优惠价" prop="discountPrice">
        <Row :gutter="10">
          <Col span="6">
          <Input v-model="form.discountPrice" placeholder="请输入优惠价">
          <Icon type="social-yen-outline" slot="prepend"></Icon>
          </Input>
          </Col>
          <Col span="3">
          <Select v-model="form.discountPriceNum">
            <Option :value="item" v-for="item in numArray" :key="item">{{item}}</Option>
          </Select>
          </Col>
          <Col span="3">
          起</Col>
        </Row>
      </FormItem>
      <FormItem label="起批数" prop="minWholesaleNum">
        <Row :gutter="10">
          <Col span="6">
          <InputNumber :min="1" v-model="form.minWholesaleNum"></InputNumber>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="商品图片" prop="picture">
        <Row :gutter="10">
          <Col span="22">
          <upload-qiniu
            ref="uploadGoods"
            :show-upload-list="false"
            :default-file-list="defaultListGoods"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="1"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :on-before-upload="handleBeforeUpload"
            @update="onUpdateGoods"
            multiple
            type="drag"
            style="display: inline-block;">
            <div class="goods-add">
              <Icon type="plus-round"></Icon>
            </div>
          </upload-qiniu>
          <div id="goods" class="goods">
            <div class="goods-item" :data-id="item.uid" v-for="(item,index) in uploadListGoods" :key="item.uid">
              <template v-if="item.status === 'finished'">
                <span v-if="index===0" class="goods-item-primary-icon">主图</span>
                <img :src="item.url" :alt="item.name">
                <div class="goods-item-cover">
                  <Icon type="ios-eye-outline" @click.native="onPreview(item.url)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="onRemoveGoodsImg(item)"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
          </div>
          <p>拖拽可调整图片顺序，将图片拖拽至最左侧可将其设置为主图。尺寸大于等于640像素*640像素，大小不超过1Mb。</p>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="商品描述" prop="desc">
        <Row :gutter="10">
          <Col span="12">
          <Input v-model="form.desc" type="textarea" :autosize="{minRows: 4,maxRows: 8}" placeholder="请输入商品描述"></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="图文详情" prop="detail">
        <Row :gutter="10">
          <Col span="12">
          <Card class="pic-detail">
            <div class="pic-detail-title">请至少上传 10 张照片</div>
            <div class="pic-detail-op">
              <div class="pic-detail-item" v-for="item in uploadListDetail">
                <div class="img-wrap" v-if="item.status === 'finished'">
                  <img :src="item.url" :alt="item.name">
                  <div class="pic-detail-item-cover">
                    <Icon type="ios-eye-outline" @click.native="onPreview(item.url)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="onRemoveDetailImg(item)"></Icon>
                  </div>
                </div>
                <Progress v-else v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </div>
              <p class="pic-detail-tip">(图片请勿添加水印，宽高比例在9:16 - 16:9之间并且宽度大于等于640px)</p>
              <upload-qiniu
                ref="uploadDetail"
                :show-upload-list="false"
                :default-file-list="defaultListDetail"
                :format="['jpg','jpeg','png']"
                :max-size="10"
                @update="onUpdateDetail"
                multiple
                type="select"
                container-id="pic-detail"
                btn-id="pic-detail-btn">
                <Button type="success">上传图片</Button>
              </upload-qiniu>
            </div>
          </Card>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="上架设置">
        <Row :gutter="10">
          <Col span="12">
          <RadioGroup v-model="form.published">
            <Radio label="0">暂不上架，放入我的商品中</Radio>
            <Radio label="1">立即上架</Radio>
          </RadioGroup>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="onSubmit('formValidate')">发布</Button>
      </FormItem>
    </Form>
    <Modal title="图片预览" v-model="preview.visible">
      <img :src="preview.imgUrl" v-if="preview.visible" style="width: 100%">
    </Modal>
  </layout-main>
</template>
<style lang="less" scoped>
  @import "./style";
</style>
<script>
  import UploadQiniu from 'components/upload-qiniu'
  import api from 'service/goods'
  import dragula from 'dragula'
  export default{
    components: {
      [UploadQiniu.name]: UploadQiniu
    },
    data(){
      const validatePrice = (rule, value, callback) => {
        let errors = [];
        // test if email address already exists in a database
        // and add a validation error to the errors array if it does
        ///^((([1-9]+[0-9]*)|0)|([0-9]+\.[0-9]{1,2}))$/
        //
        if (!/^(([1-9]+[0-9]*)|0)|((([1-9]+[0-9]*)|0)\.[0-9]{1,2})$/.test(value)) {
          errors.push(new Error('精确到分'))
        }
        callback(errors)
      }
      return {
        isEdit: false,
        id: '',
        form: {
          name: '',
          canCustom: '1',
          price: '',
          property: {
            material: ''
          },
          discountPrice: '',
          discountPriceNum: 500,
          minWholesaleNum: 1,
          picture: '',
          desc: '',
          published: '1'
        },
        ruleValidate: {
          name: [
            {required: true, message: '必填', trigger: 'blur'},
            {type: 'string', max: 30, message: '标题不能超过30个字', trigger: 'change'}
          ],
          property: [
            {
              required: true,
              validator(rule, value, callback, source, options) {
                let errors = [];
                // test if email address already exists in a database
                // and add a validation error to the errors array if it does
                errors.push(new Error('最少添加3个属性'))
                callback(errors)
              },
              trigger: 'change'
            }
          ],
          canCustom: [
            {required: true, message: '必选', trigger: 'change'}
          ],
          price: [
            {type: 'string', required: true, message: '必填', trigger: 'blur'},
            {validatePrice, trigger: 'blur'}
          ]
        },
        materials: [
          {id: '0', name: '材质1'},
          {id: '1', name: '材质2'}
        ],
        numArray: [500, 1000, 1500, 2000, 2500, 3000],
        //商品图片相关
        preview: {
          imgUrl: '',
          visible: false
        },
        defaultListGoods: [],
        defaultListDetail: [],
        uploadListGoods: [],
        uploadListDetail: []
      }
    },
    mounted(){
      this.initPage()
      this.initDragula()
    },
    methods: {
      onSubmit(name){
        /*this.$refs[name].validate((valid) => {
         if (valid) {
         this.$Message.success('Success!')
         } else {
         this.$Message.error('Fail!')
         }
         })*/
        this.createGoods()
      },
      createGoods(){
        api.postGoods({
          title: this.form.name,
          is_custom_made: this.form.canCustom,
          actual_price: this.form.price,
          favourable_price: this.form.discountPrice,
          favourable_price_count: this.form.discountPriceNum,
          min_wholesale_count: this.form.minWholesaleNum,
          desc: this.form.desc,
          published: this.form.published,
        }).then(({data}) => {
          this.$Message.success('发布成功!')
        })
      },
      onPreview (url) {
        this.preview.imgUrl = url
        this.preview.visible = true
      },
      onUpdateGoods(items){
          this.uploadListGoods=items
      },
      onUpdateDetail(items){
        this.uploadListDetail=items
      },
      onRemoveDetailImg (item) {
        let fileList = this.$refs.uploadDetail.fileList
        fileList.splice(fileList.indexOf(item), 1)
        this.uploadListDetail = fileList
      },
      onRemoveGoodsImg(item){
        let fileList = this.$refs.uploadGoods.fileList
        fileList.splice(fileList.indexOf(item), 1)
        this.uploadListGoods = fileList
      },
      handleSuccess (item, file, fileList) {

      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < 5;
        if (!check) {
          this.$Notice.warning({
            title: 'Up to five pictures can be uploaded.'
          });
        }
        return check;
      },
      initPage(){
        this.isEdit = !!this.$route.params.id
        if (this.isEdit) {
          this.id = this.$route.params.id
          this.getDetail()
        }
      },
      getDetail(){
        api.getGoodsDetail({id: this.id})
          .then(({data}) => {
            this.form.name = data.title
            this.form.canCustom = data.is_custom_made + ''
            this.form.price = data.actual_price
            this.form.discountPrice = data.favourable_price
            this.form.discountPriceNum = data.favourable_price_count
            this.form.minWholesaleNum = data.min_wholesale_count
            this.form.desc = data.desc
            this.form.published = data.published + ''
            this.defaultListGoods = (data.display_image || []).map(item => {
              return {
                name: item.id,
                url: item.path
              }
            })
            this.defaultListDetail = (data.detail_photos || []).map(item => {
              return {
                name: item.id,
                url: item.path
              }
            })
          })
      },
      initDragula(){
        this.$nextTick(() => {
          dragula([document.getElementById('goods')], {
            direction: 'horizontal'
          }).on('drop', (el, target) => {
            this.sortGoods()
          })
        })
      },
      sortGoods(){
        let goodsDom = document.querySelectorAll('#goods>.goods-item')
        let goodsList = this.$refs.uploadGoods.fileList
        this.uploadListGoods = Array.from(goodsDom).map(item => {
          return goodsList.find(im => im.uid + '' === item.dataset.id)
        })
        this.$refs.uploadGoods.fileList = this.uploadListGoods
      }
    }
  }
</script>
