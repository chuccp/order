<template>
  <coke-form @action="action">
    <van-cell-group inset>
      <van-field v-model="state.formData.name" label="分类名" placeholder="请输入分类名" />
    </van-cell-group>
  </coke-form>
</template>
<script setup>
import {useStore} from 'vuex';
import {addCategory} from '../api/category'
import { Dialog } from 'vant';
import {ref, onMounted, onBeforeUpdate,reactive} from 'vue';
import { useRouter, useRoute } from 'vue-router'

const  store = useStore()
const router = useRouter()

const state = reactive({formData:{name:""}})
const action=()=>{
  addCategory(state.formData).then((response)=>{
    if(response.data.response.responseBody){
      Dialog.alert({
        message: '添加成功',
      }).then(() => {
        router.push({ path: '/user/listCategory' })
      });
    }
  })
}
</script>
<style scoped>

</style>