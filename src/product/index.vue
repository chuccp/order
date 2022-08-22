<template>

  <coke-form @action="action">
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
import {reactive, ref,onMounted} from "vue";
import {allCategory} from '@/api/category'
import {addGoods} from '@/api/goods'
import {Dialog} from "vant";
import { useRouter } from 'vue-router'
const value = ref("")
const message = ref("")
const router = useRouter()
const state = reactive({formData:{open:true,categoryIds:[]}})
const categorys = ref([])
const fileList = ref([])
onMounted(()=>{
  allCategory({}).then((response)=>{
    categorys.value.push(...response.data.responseBody)
  })
})
let imgFile;
const action=()=>{

  const formData = new FormData();
  formData.append("goodsName",state.formData.goodsName)
  formData.append("categoryIds",state.formData.categoryIds)
  formData.append("remark",state.formData.remark)
  formData.append("unit",state.formData.unit)
  if(imgFile){
    formData.append("file",imgFile.file)
  }
  state.formData.status = state.formData.open?1:0
  addGoods(formData).then((response)=>{
    if(response.data.responseBody){
      Dialog.alert({
        message: '添加成功',
      }).then(() => {
        router.push({ path: '/user/me' })
      });
    }
  })

}

const afterRead=(file)=>{
  fileList.value = []
  fileList.value.push({url:file.content,isImage: true})
  imgFile = file
}
</script>

<style scoped>
.img-icon {
  height: 20px;
}
</style>