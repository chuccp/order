<template>
<div :style="{height:store.state.viewHeight+'px',width:'100%','overflow-x':'scroll'}">
  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
  >
    <van-cell v-for="goods in list" :key="goods.userGoodsId"  class="order-cell-group" >
      <van-card
          :title="goods.goodsName"
      >
        <template #desc>
          <div class="van-card__desc van-ellipsis" v-if="$hasRole('super','manager')">客户：{{ goods.userName }}</div>
          <div class="van-card__desc van-ellipsis">总数量：{{ goods.goodsTotalNum }}</div>
          <div class="van-card__desc van-ellipsis">品种数：{{ goods.goodsCategory }}</div>
          <div class="van-card__desc van-ellipsis">下单时间：{{ goods.createTime }}</div>
        </template>
        <template #footer  style="padding-bottom: 10px">
          <van-button round type="success" @click="showOrderGroup(goods)">查看详情</van-button>
        </template>
      </van-card>

    </van-cell>
  </van-list>
</div>

  <van-action-sheet
      v-model:show="state.show"
      title="下单列表"
      close-on-click-action
  >
    <template #description>
      <List :orderGroupId="state.orderGroupId"></List>
    </template>
  </van-action-sheet>

</template>

<script setup>
import {reactive, ref} from "vue";
import {hasRole} from "@/util/permission";
import {orderGroupList,allOrderGroupList} from '@/api/goods'
import {useStore} from "vuex";
import List from './list.vue'
const store = useStore()
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const state = reactive({show:false,orderGroupId:0})

const imageUrl = ref(import.meta.env.VITE_APP_IMAGE_API)
let loadOrder
if(hasRole("super","manager")){
  loadOrder = allOrderGroupList
}else {
  loadOrder = orderGroupList
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

const showOrderGroup=(goods)=>{
  console.log(goods)
  state.show = true
  state.orderGroupId = goods.orderGroupId
}

</script>

<style scoped>

</style>