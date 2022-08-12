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
const onTouchMove=()=>{
  console.log(viewElement.value)
  console.log(viewElement.value.scrollTop)

}
const onTouchstart=()=>{

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