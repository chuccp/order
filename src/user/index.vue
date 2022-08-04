<template>

  <coke-form @action="action">
    <van-cell-group inset>
      <van-field v-model="state.formData.userName" label="用户名" placeholder="请输入用户名" />
      <van-field v-model="state.formData.userNo" label="手机号" placeholder="请输入手机号" />
      <selectField v-model="state.formData.roleId" :columns="roles" select-name="roleName" select-key="roleId"  label="角色" placeholder="选择角色" v-if="$hasRole('super')"></selectField>

      <van-cell center title="是否启用">
        <template #right-icon>
          <van-switch v-model="state.formData.open" size="24" />
        </template>
      </van-cell>

    </van-cell-group>
  </coke-form>
</template>
<script setup>
import {reactive, ref,onMounted} from "vue";
import {addUser} from '../api/user'
import {Dialog} from "vant";
import { useRouter } from 'vue-router'
const router = useRouter()
const state = reactive({formData:{userName:"",roleId:3,open:true}})
const roles = ref([{"roleId":3,"roleName":"客户"},{"roleId":2,"roleName":"普通管理员"},{"roleId":1,"roleName":"超级管理员"}])
const action = ()=>{
  if(state.formData.open){
    state.formData.status = 1
  }else{
    state.formData.status = 0
  }
  addUser(state.formData).then((response)=>{
    Dialog.alert({
      message: '添加成功',
    }).then(() => {
      router.push({ path: '/user/me' })
    });
  })
}
</script>

<style scoped>

</style>