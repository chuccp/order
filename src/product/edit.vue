<template>
  <coke-form @action="action" @remove="remove" :hasRemove="true" >
    <van-cell-group inset>
      <van-field v-model="state.formData.goodsName" label="产品名" placeholder="请输入产品名" />
      <van-field
          v-model="state.formData.remark"
          rows="2"
          autosize
          label="备注"
          type="textarea"
          maxlength="300"
          placeholder="请输入备注"
          show-word-limit
      />
      <van-field v-model="state.formData.sort" label="排序" placeholder="数字越小越排前面" />
      <van-cell center title="产品种类" title-style="width: 100px;flex: none;">
        <van-checkbox-group v-model="state.formData.categoryIds">
          <van-checkbox v-for="category in categorys" shape="square" :name="category.categoryId" icon-size="24px" style="padding-bottom: 5px">
            {{category.categoryName}}</van-checkbox>
        </van-checkbox-group>
      </van-cell>

      <van-cell title="图片上传" class="show-file">
        <template #extra>
          <van-uploader :preview-options="{closeable: true}" v-model="fileList" upload-text="建议上传正方形图片" name="file" accept="image/png, image/jpeg" :after-read="afterRead" max-count="1"  />
        </template>
      </van-cell>
      <van-cell center title="是否展示">
        <template #right-icon>
          <van-switch v-model="state.formData.open" size="24" />
        </template>
      </van-cell>
    </van-cell-group>
  </coke-form>
</template>
<script setup>
import {useStore} from 'vuex';
import {getGoods,updateGoods,deleteGoods,updateAndImage} from '@/api/goods'
import {allCategory} from '@/api/category'
import { Dialog } from 'vant';
import {reactive, onMounted, ref} from 'vue';
import { useRouter,useRoute } from 'vue-router'
const  store = useStore()
const router = useRouter()
const route = useRoute()
const categorys = ref([])
const units = ref(['箱'])
const fileList = ref([])
const value = ref("")
let imgFile;
const state = reactive({formData:{goodsName:"",sort:"",goodsId:route.params.id,open:false,categoryIds:[]}})

const loadCategory=function(){
  return new Promise((resolve, reject)=>{
    allCategory({}).then((response)=>{
      categorys.value =[]
      categorys.value.push(...response.data.responseBody)
      resolve(response.data.responseBody)
    })
  })
}
const loadGoods=function (){
  return new Promise((resolve, reject)=>{
    getGoods(state.formData).then((response)=>{
      state.formData.open = state.formData.status===1
      resolve(response.data.responseBody)
    })
  })
}
onMounted(async () => {
  categorys.value.push(...await loadCategory())
  state.formData = Object.assign(state.formData, await loadGoods())
  state.formData.open = state.formData.status === 1
  fileList.value.push({url:`${import.meta.env.VITE_APP_IMAGE_API}${state.formData.imageLink}`,isImage: true})
})
const action=()=>{
  state.formData.status = state.formData.open?1:0
  if(imgFile){
    let formData = new FormData();
    formData.append("goodsName",state.formData.goodsName)
    formData.append("categoryIds",state.formData.categoryIds)
    formData.append("remark",state.formData.remark)
    formData.append("sort",state.formData.sort)
    formData.append("file",imgFile.file)
    formData.append("goodsId",state.formData.goodsId)
    updateAndImage(formData).then((response)=>{
      if(response.data.responseBody){
        Dialog.alert({
          message: '修改成功',
        }).then(() => {
          router.push({ path: '/user/listProduct' })
        });
      }
    })
  }else{
    updateGoods(state.formData).then((response)=>{
      if(response.data.responseBody){
        Dialog.alert({
          message: '修改成功',
        }).then(() => {
          router.push({ path: '/user/listProduct' })
        });
      }
    })
  }
}
const remove=()=>{
  Dialog.confirm({
    message: '请确认该产品下无下单信息，否则无法删除',
  }).then(() => {
    deleteGoods(state.formData).then((response)=>{
      if(response.data.responseBody){
        Dialog.alert({
          message: '删除成功',
        }).then(() => {
          router.push({ path: '/user/listProduct' })
        });
      }
    })
  }).catch(() => {

  });
}

const afterRead=(file)=>{
  fileList.value = []
  fileList.value.push({url:file.content,isImage: true})
  imgFile = file
}
</script>
<style scoped>

</style>