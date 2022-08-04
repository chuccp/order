<template>

  <coke-form @action="action">
    <van-cell-group inset>
      <van-field v-model="state.formData.userName" label="用户名" placeholder="请输入用户名" />
      <van-field v-model="state.formData.userNo" label="手机号" placeholder="请输入手机号" />
      <selectField v-model="state.formData.roleId" :columns="roles" select-name="roleName" select-key="roleId"  label="角色" placeholder="选择角色" v-if="$hasRole('super')"></selectField>
    </van-cell-group>
  </coke-form>
</template>
<script setup>
import {reactive, ref,onMounted} from "vue";
const state = reactive({formData:{userName:"",roleId:3}})
const roles = ref([{"roleId":3,"roleName":"客户"},{"roleId":2,"roleName":"普通管理员"},{"roleId":1,"roleName":"超级管理员"}])
const action = ()=>{

  console.log(state.formData)

}
</script>

<style scoped>

</style>