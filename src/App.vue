<template>
  <router-view />
  <div class="safe-area-bottom" ref="bottom"></div>
</template>
<script setup>
import {onMounted, ref,onUpdated} from 'vue'
import {useStore} from 'vuex';
const store = useStore()
const bottom = ref(null)
document.body.onload = ()=>{
  store.commit("updateClientHeight",window.innerHeight)
  console.log("onload:"+bottom.value.clientHeight)
  store.commit("updateBottomHeight",bottom.value.clientHeight)
  setTimeout(()=>{
    console.log("onload:"+bottom.value.clientHeight)
    store.commit("updateBottomHeight",bottom.value.clientHeight)
  },100)
}
document.body.onresize=()=>{
  store.commit("updateClientHeight",document.body.clientHeight)
}

</script>
<style>
.safe-area-bottom{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: -2;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

}
</style>
