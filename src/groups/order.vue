<template>
  <van-cell-group :style="{height:(height-150)+'px','overflow-x':'scroll' }">
    <van-cell v-for="goods  in goodsArray" :title="goods.goodsName" :value="goods.goodsNum+goods.unit" />
  </van-cell-group>
  <van-cell-group class="van-cell-group-bottom">
    <van-cell :title="'总数:'+order.goodsNum"  :label="'种类:'+order.goodsCategory"  >
      <template #value>
        <van-button  type="success">下单</van-button>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script setup>
import {defineExpose, onMounted, ref,computed} from "vue";
import store from 'storejs';
const imageUrl = ref(import.meta.env.VITE_APP_IMAGE_API)
const goodsArray = ref([])
const height = ref(document.body.clientHeight*4/5)
const loadStore=()=>{
  goodsArray.value = []
  const goodObj = store.get("goodObj")
  for(const goodsId in goodObj){
    goodsArray.value.push(goodObj[goodsId])
  }
}
onMounted(()=>{
  loadStore()
})
const order = computed(()=>{
  let goodsNum = 0
  let goodsCategory = 0
  for(const goods of goodsArray.value){
    goodsNum = goodsNum+goods.goodsNum
    goodsCategory = goodsCategory+1
  }
  return {goodsNum,goodsCategory}

})
defineExpose({
  loadStore
})


</script>

<style scoped>

</style>