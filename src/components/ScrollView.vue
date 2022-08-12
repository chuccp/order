<template>
<div class="c-scroll-view" @touchmove.prevent="onTouchMove" @touchstart="onTouchstart" @touchend="onTouchEnd" :style="{height:height+'px',width:'100%'}" ref="viewElement">
  <div class="c-scroll-view-insert" ref="viewInsertElement"  :style="{'margin-top':scrollTop+'px'}">
    <slot></slot>
  </div>
</div>
</template>

<script setup>
import {defineProps, ref, computed, defineExpose, defineEmits,watch} from "vue"
const props = defineProps({
  height:Number,
  top:Number
})

const height = computed(()=>{
  return props.height
})
watch(()=>props.top,(newValue,oldValue)=>{
  moveY.value = -newValue
})

const moveTop = (value)=>{
  moveY.value = -value
}
defineExpose({
  moveTop
})
const viewElement = ref(null)
const viewInsertElement = ref(null)
let mTop = 0
const scrollTop = computed(()=>{
  return moveY.value
})
const moveY  = ref(0)
console.log(props.top)
moveY.value = props.top

let initClientY = 0

let movieClientY = 0
const onTouchMove=(e)=>{
  movieClientY = e.targetTouches[0].clientY
  mTop = movieClientY-initClientY
  if(mTop<5&&mTop>-5){

  }else{
    moveY.value = moveY.value+mTop
    initClientY = movieClientY
  }

}
const onTouchstart=(e)=>{
  mTop = 0
  initClientY = e.targetTouches[0].clientY
}
const onTouchEnd=()=>{
  const mLen = movieClientY-initClientY
  initClientY = 0
  if(scrollTop.value>=0){
    moveY.value = 0
  }else if(scrollTop.value<=-(viewInsertElement.value.offsetHeight-viewElement.value.offsetHeight)){
    moveY.value = -(viewInsertElement.value.offsetHeight-viewElement.value.offsetHeight)
  }
}
</script>

<style scoped>
.c-scroll-view{
  overflow: hidden;
}
.c-scroll-view-insert{

}
</style>