<template>
  <van-cell-group :style="{height:(height-150)+'px','overflow-x':'scroll' }">
    <van-cell v-for="goods  in state.formData" :title="goods.goodsName" :value="goods.goodsNum+goods.unit" />
  </van-cell-group>
  <van-cell-group class="van-cell-group-bottom">
    <van-cell :title="'总数:'+order.goodsNum"  :label="'种类:'+order.goodsCategory"  >
      <template #value>
        <van-button @click="click" type="success">确认</van-button>
      </template>
    </van-cell>
  </van-cell-group>
  <overlayLoading :show="state.loading" text="提交中，请稍后"></overlayLoading>
</template>

<script setup>
import {defineExpose, onMounted, ref, computed, defineEmits, reactive} from "vue";
import store from 'storejs';
import {useStore} from "vuex";
import {addOrder} from '@/api/order'
import {Dialog} from "vant";

const emits = defineEmits(["action"])

const state = reactive({formData:[],loading:false})

const storex = useStore()
const imageUrl = ref(import.meta.env.VITE_APP_IMAGE_API)


const height = ref(document.body.clientHeight*4/5)
const loadStore=()=>{
  state.formData = []
  const goodObj = store.get(storex.state.user.storeGoodsName)
  for(const goodsId in goodObj){
    const goods = goodObj[goodsId]
    state.formData.push({goodsId:goods.goodsId,goodsNum:goods.goodsNum,goodsName:goods.goodsName,unit:goods.unit})
  }
}
onMounted(()=>{
  loadStore()
})
const order = computed(()=>{
  let goodsNum = 0
  let goodsCategory = 0
  for(const goods of state.formData){
    goodsNum = goodsNum+goods.goodsNum
    goodsCategory = goodsCategory+1
  }
  return {goodsNum,goodsCategory}

})

const click=()=>{
  console.log(state.formData)
  state.loading = true
  addOrder(state.formData).then(response=>{
    state.loading = false
    Dialog.alert({
      message: '添加成功',
    }).then(() => {
      emits('action')
    });
  }).catch(()=>{
    state.loading = false
  })
}

defineExpose({
  loadStore
})
</script>

<style scoped>

</style>