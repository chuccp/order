<template>
  <coke-form @action="action" @remove="remove" :hasRemove="true">
    <van-cell-group inset>
      <van-field v-model="state.formData.categoryName" label="分类名" placeholder="请输入分类名" />
      <van-field v-model="state.formData.sort" label="排序" placeholder="数字越小越排前面" />
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
import {getCategory,updateCategory,deleteCategory} from '@/api/category'
import { Dialog } from 'vant';
import {reactive,onMounted} from 'vue';
import { useRouter,useRoute } from 'vue-router'
const  store = useStore()
const router = useRouter()
const route = useRoute()
const state = reactive({formData:{categoryName:"",sort:"",categoryId:route.params.id,open:false}})
onMounted(()=>{
  getCategory(state.formData).then((response)=>{
    state.formData = Object.assign(state.formData,response.data.responseBody)
    state.formData.open = state.formData.status==1
  })
})

const action=()=>{
  state.formData.status = state.formData.open?1:0
  updateCategory(state.formData).then((response)=>{
    if(response.data.responseBody){
      Dialog.alert({
        message: '修改成功',
      }).then(() => {
        router.push({ path: '/user/listCategory' })
      });
    }
  })
}

const remove=()=>{
  Dialog.confirm({
    message: '请确认该类别下无产品信息，否则无法删除',
  }).then(() => {
    deleteCategory(state.formData).then((response)=>{
      if(response.data.responseBody){
        Dialog.alert({
          message: '删除成功',
        }).then(() => {
          router.push({ path: '/user/listCategory' })
        });
      }
    })
  }).catch(() => {
    // on cancel
  });;
}

</script>
<style scoped>

</style>