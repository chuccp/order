<template>
  <div class="c-scroll-view" @touchmove="onTouchMove"   @touchstart="onTouchstart" @touchend="onTouchEnd" :style="{height:props.height+'px',width:'100%'}" ref="viewElement">
    <div class="c-scroll-view-insert" ref="viewInsertElement" >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import {defineProps,ref} from "vue"

const props=defineProps({
  height:Number
})

const viewInsertElement = ref(null)
const viewElement = ref(null)
let preScroll = 0
let initClientY = 0
const onTouchMove=(e)=>{
  if(viewElement.value.scrollTop==preScroll){
     const movieClientY = e.targetTouches[0].clientY
     const mTop = initClientY - movieClientY
     viewElement.value.scrollTop = viewElement.value.scrollTop+mTop
  }
}
const onTouchstart=(e)=>{
  initClientY = e.targetTouches[0].clientY
  preScroll = viewElement.value.scrollTop
}
const onTouchEnd=()=>{

}

</script>

<style scoped>
.c-scroll-view{
  overflow-x: hidden;
  overflow-y:scroll;
}
.c-scroll-view-insert{

}
</style>