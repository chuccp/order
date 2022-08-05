<template>

  <coke-form @action="action" @remove="remove" :hasRemove="true" >
    <van-cell-group inset>
      <van-field v-model="state.formData.userName" label="用户名" placeholder="请输入用户名" />
      <van-field v-model="state.formData.userNo" label="手机号" placeholder="请输入手机号" />
      <selectField  v-model="state.formData.roleId" :columns="roles" select-name="roleName" select-key="roleId"  :show-value="state.formData.roleName"  label="角色" placeholder="选择角色" v-if="$hasRole('super')"></selectField>
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
import {getUser,updateUser,deleteUser} from '@/api/user'
import {Dialog} from "vant";
import { useRouter,useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const state = reactive({formData:{userName:"",userId:route.params.id,open:true}})
const roles = ref([{"roleId":3,"roleName":"客户"},{"roleId":2,"roleName":"普通管理员"},{"roleId":1,"roleName":"超级管理员"}])

onMounted(()=>{

  getUser(state.formData).then(response=>{
    state.formData = Object.assign(state.formData,response.data.responseBody)
    state.formData.open = state.formData.status==1
  })

})

const action = ()=>{
  state.formData.status = state.formData.open?1:0
  updateUser(state.formData).then((response)=>{
    Dialog.alert({
      message: '添加成功',
    }).then(() => {
      router.push({ path: '/user/listUser' })
    });
  })
}

const remove=()=>{
  Dialog.confirm({
    message: '请确认该用户有无下单，否则无法删除',
  }).then(() => {
    deleteUser(state.formData).then((response)=>{
      if(response.data.responseBody){
        Dialog.alert({
          message: '删除成功',
        }).then(() => {
          router.push({ path: '/user/listUser' })
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