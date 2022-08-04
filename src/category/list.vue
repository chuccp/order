<template>
  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
  >
    <van-cell v-for="item in list" :key="item.categoryId" :label="showLabel(item)" :title="item.categoryName" >

      <template #extra>
        <van-button icon="edit" :to="'/user/editCategory/'+item.categoryId" type="default" >修改</van-button>
<!--        <van-button icon="minus" type="warning" v-if="item.status==1" >隐藏</van-button>-->
<!--        <van-button icon="plus" type="warning"  plain v-if="item.status==0" >显示</van-button>-->
      </template>

    </van-cell>
  </van-list>
</template>

<script setup>
import { ref } from 'vue';
import {listCategory} from '@/api/category'

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
let current = 1

const showLabel = (item)=>{
  return    `状态:${item.status==1?'显示':'隐藏'}  排序:${item.sort}`
}

const onLoad = () => {

  listCategory({current}).then((response)=>{
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