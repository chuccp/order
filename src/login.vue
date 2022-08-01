<template>
 <van-nav-bar :title="store.state.title" :fixed="true"/>
  <coke-form @action="action" label="登录">
    <van-cell-group title="请登录" :border="true">
      <van-field v-model="state.formData.phone" label="手机号码" placeholder="请输入手机号码"/>
    </van-cell-group>
  </coke-form>
</template>
<script setup>
import {login} from './api/user'
import {useStore} from 'vuex';
import {reactive, ref} from "vue";
import { useRouter, useRoute } from 'vue-router'
const state = reactive({formData:{phone:""}})
const store = useStore()
const router = useRouter()
const action=()=>{
  login(state.formData).then(response=>{
    console.log(response.data)
    if(response.data.response.responseBody){
      router.push({ path: '/user' })
    }
  })
}
</script>
<style scoped>
.form{
  margin-top: 68px;
  float: left;
  width: 100%;
}
</style>