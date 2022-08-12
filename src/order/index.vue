<template>
<div :style="{height:store.state.viewHeight+'px',width:'100%','overflow-x':'scroll'}">
  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
  >
    <van-cell v-for="goods in list" :key="goods.userGoodsId"  >
      <van-card
          :title="goods.goodsName"
          :thumb="imageUrl+goods.imageLink"
      >
        <template #desc>
          <div class="van-card__desc van-ellipsis" v-if="$hasRole('super','manager')">客户：{{ goods.userName }}</div>
          <div class="van-card__desc van-ellipsis">数量：{{ goods.goodsNum }}{{goods.unit}}</div>
          <div class="van-card__desc van-ellipsis">下单时间：{{ goods.createTime }}</div>
        </template>

      </van-card>

    </van-cell>
  </van-list>
</div>

</template>

<script setup>
import {ref} from "vue";
import {hasRole} from "@/util/permission";
import {orderList,allOrderList} from '@/api/goods'
import {useStore} from "vuex";
const store = useStore()
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const imageUrl = ref(import.meta.env.VITE_APP_IMAGE_API)
let loadOrder
if(hasRole("super","manager")){
  loadOrder = allOrderList
}else {
  loadOrder = orderList
}
let current = 1
const onLoad = () => {
  loadOrder({current}).then((response)=>{
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