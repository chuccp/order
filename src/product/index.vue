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
        maxlength="50"
        placeholder="请输入备注"
        show-word-limit
    />
    <selectField v-model="state.formData.categoryId" :columns="categorys" select-name="categoryName" select-key="categoryId"  label="类别" placeholder="选择类别"></selectField>
    <selectField v-model="state.formData.unit" :columns="['箱']" label="单位" placeholder="选择单位"></selectField>
  </van-cell-group>
  </coke-form>
</template>

<script setup>
import {reactive, ref,onMounted} from "vue";
import {allCategory} from '../api/category'
const value = ref("")
const message = ref("")
const state = reactive({formData:{}})
const categorys = ref([])

onMounted(()=>{
  allCategory({}).then((response)=>{
    categorys.value.push(...response.data.responseBody)
  })
})



const action=()=>{
  console.log(state.formData.categoryId)
}

</script>

<style scoped>

</style>