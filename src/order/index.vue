<template>

  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
  >
    <van-cell v-for="goods in list" :key="goods.userGoodsId"  >
      <van-card
          :num="goods.goodsNum"
          :desc="goods.remark"
          :title="goods.goodsName"
          :thumb="imageUrl+goods.imageLink"
      >
        <template #tags>
          <van-tag plain type="danger">单位:{{goods.unit}}</van-tag>
        </template>
      </van-card>

    </van-cell>
  </van-list>


</template>

<script setup>
import {ref} from "vue";
import {orderList} from '../api/goods'
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const imageUrl = ref(import.meta.env.VITE_APP_IMAGE_API)
let current = 1
const onLoad = () => {
  orderList({current}).then((response)=>{
    const orderList =  response.data.responseBody
    if(orderList.length==0){
      finished.value = true;
    }else{
      list.value.push(...orderList)
      current++
      loading.value = false;
    }
  })
};
</script>

<style scoped>

</style>