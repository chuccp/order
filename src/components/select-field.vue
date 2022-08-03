<template>
  <van-field v-model="value" :label="label" @click-input="clickInput" :placeholder="placeholder"/>
  <van-popup v-model:show="show1" :position="position1" :style="{ height: '40%' }">
    <van-picker
        :title="title1"
        :columns="columns1"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
    />
  </van-popup>
</template>

<script setup>
import {ref} from 'vue'
import {defineProps} from "vue"
const props = defineProps({
  label: String,
  placeholder: String,
  columns: Array,
  show: Boolean,
  position: String,
  title:String
})
const value = ref("")
const position1 = ref("bottom")
if (props.position) {
  position1.value = props.position
}
const show1 = ref(false)
if (props.show) {
  show1.value = true
} else {
  show1.value = false
}
const columns1 = ref(["111","222"])
if (props.columns) {
  columns1.value = props.columns;
}
const title1 = ref("选择")
if(props.title){
  title1.value = props.title
}
const onConfirm = (el)=>{
  value.value = el
  show1.value = false
}
const onCancel=()=>{
  show1.value = false
}
const onChange=(el)=>{
  // console.log(el)
}
const clickInput = () => {
  show1.value = true
}

</script>

<style scoped>

</style>