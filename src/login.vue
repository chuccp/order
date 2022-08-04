<template>
 <van-nav-bar :title="store.state.title" :fixed="true"/>
  <coke-form @action="action" label="登录">
    <van-cell-group title="请登录" :border="true">
      <van-field v-model="state.formData.userNo" label="手机号码" placeholder="请输入手机号码"/>
    </van-cell-group>
  </coke-form>
</template>
<script setup>
import {login} from '@/api/user'
import {useStore} from 'vuex';
import {reactive, ref} from "vue";
import { Toast } from 'vant';
import { useRouter, useRoute } from 'vue-router'
const state = reactive({formData:{userNo:""}})
const store = useStore()
const router = useRouter()
const action=()=>{
  login(state.formData).then(response=>{
    if(response.data.responseBody){
      router.push({ path: '/user' })
    }else{
      Toast('号码错误，请重新输入');
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