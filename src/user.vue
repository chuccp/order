<template>
  <van-nav-bar v-if="!isWeixin" left-text="返回" @click-left="onClickLeft"  left-arrow :title="store.state.title" :fixed="true" />
  <div class="main-view" :style="{height:mainHeight+'px',top:state.mTop+'px' }">
    <router-view />
  </div>
  <van-tabbar v-model="active" :safe-area-inset-bottom="true" :fixed="true" :route="true" style="z-index:-1" ref="bottomNav" >
    <van-tabbar-item  icon="shop-o" replace to="/user/group"   >{{ $t('name.shop') }}</van-tabbar-item>
    <van-tabbar-item  icon="cart-o" replace to="/user/order"  v-if="!$hasRole('super','manager')"  >{{ $t('name.order') }}</van-tabbar-item>
    <van-tabbar-item  icon="cart-o" replace to="/user/customerOrder"  v-if="$hasRole('super','manager')"  >{{ $t('name.customerOrder') }}</van-tabbar-item>
    <van-tabbar-item  icon="user-o" replace to="/user/me"   >{{ $t('name.me') }}</van-tabbar-item>
  </van-tabbar>
</template>
<script setup>
import {ref, onMounted, onUpdated, reactive, nextTick, computed} from 'vue';
import {useStore} from 'vuex';
const active  = ref(0);
const isWeixin  = ref(false);
const bottomNav  = ref(null);
const store = useStore()
const state  = reactive({height:760,mTop:50});
const onClickLeft = () => history.back();

const mainHeight = computed(()=>{
  console.log(":"+store.state.bottomHeight)
  const height = store.state.clientHeight-state.mTop-store.state.bottomHeight-50;
  store.commit("updateViewHeight",height)
  return height
})


onMounted(()=>{
  console.log("onMounted:"+store.state.bottomHeight)
  isWeixin.value = weixin()
  if(isWeixin.value){
    state.mTop = 0
  }
  state.height = document.body.clientHeight-state.mTop-50
  store.commit("updateViewHeight",state.height)
})
onUpdated(async () => {
  await nextTick()
  console.log("onUpdated")
  console.log(getComputedStyle(bottomNav.value.$el).getPropertyValue("padding-bottom"))
  const mBottom = bottomNav.value.$el.className
  console.log(mBottom)
  state.height = document.body.clientHeight - state.mTop - mBottom
})
const weixin=()=>{
  const ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger") {
    return true;
  } else {
    return false;
  }
}

</script>
<style>
.main-view{
  -webkit-overflow-scrolling: touch;
  width: 100%;
  position: relative;
}
</style>