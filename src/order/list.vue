<template>
  <van-cell-group :style="{height:(height-150)+'px','overflow-x':'scroll' }">
    <van-cell v-for="goods  in userOrders" :title="goods.goodsName" :value="goods.goodsNum" :label="goods.remark" />
  </van-cell-group>
  <van-cell-group class="van-cell-group-bottom">
    <van-cell :title="'总数:'+order.goodsNum"  :label="'产品种类:'+order.goodsCategory"  >
    </van-cell>
  </van-cell-group>
</template>

<script setup>
import {defineExpose, onMounted, ref, computed, defineEmits, reactive, defineProps, watch} from "vue";
import {orderList,order2List} from '@/api/order'
import {hasRole} from "@/util/permission";
const props = defineProps({
  orderGroupId:Number
})
const userOrders = ref([])

const height = ref(document.body.clientHeight*4/5)

let loadOrder
if(hasRole("super","manager")){
  loadOrder = order2List
}else {
  loadOrder = orderList
}
onMounted(()=>{
  loadOrder({orderGroupId:props.orderGroupId}).then((response)=>{
    userOrders.value = response.data.responseBody
  })

})

watch(()=>props.orderGroupId,(newValue,oldValue)=>{
  console.log("newValue:"+newValue)
  loadOrder({orderGroupId:newValue}).then((response)=>{
    userOrders.value = response.data.responseBody
  })
})
const order = computed(()=>{
  let goodsNum = 0
  let goodsCategory = 0
  for(const goods of userOrders.value){
    goodsNum = goodsNum+goods.goodsNum
    goodsCategory = goodsCategory+1
  }
  return {goodsNum,goodsCategory}

})

</script>

<style scoped>

</style>