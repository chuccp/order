<template>
  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
  >
    <van-cell v-for="item in list" :key="item.userId" :label="showLabel(item)" :title="item.userName" >

      <template #extra>
        <van-button icon="edit" :to="'/user/editUser/'+item.userId" type="default" >修改</van-button>
      </template>

    </van-cell>
  </van-list>
</template>

<script setup>
import { ref } from 'vue';
import {listUser} from '@/api/user'
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
let current = 1
const showLabel = (item)=>{
  return    `状态:${item.status==1?'启用':'关闭'} 角色：${item.roleName}`
}
const onLoad = () => {
  listUser({current}).then((response)=>{
    if(response.data.responseBody.length==0){
      finished.value = true;
    }else{
      list.value.push(...response.data.responseBody)
      current++
      loading.value = false;
    }
  })
};
</script>

<style scoped>

</style>