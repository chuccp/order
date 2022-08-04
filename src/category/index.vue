<template>
  <coke-form @action="action">
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
import {addCategory} from '../api/category'
import { Dialog } from 'vant';
import {reactive} from 'vue';
import { useRouter } from 'vue-router'
const  store = useStore()
const router = useRouter()
const state = reactive({formData:{categoryName:"",sort:"",open:true}})
const action=()=>{
  state.formData.status = state.formData.open?1:0
  addCategory(state.formData).then((response)=>{
    if(response.data.responseBody){
      Dialog.alert({
        message: '添加成功',
      }).then(() => {
        router.push({ path: '/user/me' })
      });
    }
  })
}
</script>
<style scoped>

</style>