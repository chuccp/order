<template>
  <van-nav-bar left-text="返回" @click-left="onClickLeft"  left-arrow :title="store.state.title" :fixed="true" />
  <div class="main-view" :style="{height:state.height+'px' }">
    <router-view />
  </div>
  <van-tabbar v-model="active" :route="true"  >
    <van-tabbar-item  icon="shop-o" replace to="/group"   >{{ $t('name.shop') }}</van-tabbar-item>
    <van-tabbar-item  icon="cart-o" replace to="/order"   >{{ $t('name.order') }}</van-tabbar-item>
    <van-tabbar-item  icon="user-o" replace to="/me"   >{{ $t('name.me') }}</van-tabbar-item>
  </van-tabbar>
</template>
<script setup>
import {ref, onMounted, onBeforeUpdate,reactive} from 'vue';
import {useStore} from 'vuex';
const active  = ref(0);
const store = useStore()
const state  = reactive({height:760});
const onClickLeft = () => history.back();
onMounted(()=>{
  state.height = document.body.clientHeight-90
})
</script>
<style>
.main-view{
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  position: fixed;
  top: 40px;
}
</style>
