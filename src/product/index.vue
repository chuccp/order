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
    <selectField v-model="state.formData.categoryId" :columns="categorys" select-name="categoryName" select-key="categoryId"  label="类别" placeholder="选择类别"></selectField>
    <selectField v-model="state.formData.unit" :columns="['箱']" label="单位" placeholder="选择单位"></selectField>
    <van-cell title="图片上传" class="show-file">
      <template #extra>
        <van-uploader :preview-options="{closeable: true}" v-model="fileList" upload-text="建议上传正方形80*80图片" name="file" accept="image/png, image/jpeg" :after-read="afterRead" max-count="1"  />
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
const state = reactive({formData:{open:true}})
const categorys = ref([])
const fileList = ref([])
onMounted(()=>{
  allCategory({}).then((response)=>{
    categorys.value.push(...response.data.responseBody)
  })
})
let imgFile;
const action=()=>{

  let formData = new FormData();
  formData.append("goodsName",state.formData.goodsName)
  formData.append("categoryId",state.formData.categoryId)
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

</style>