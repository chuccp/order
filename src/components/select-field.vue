<template>
  <van-field v-model="value" :label="label" readonly @click-input="clickInput" :placeholder="props.placeholder"/>
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
import {defineEmits, ref,defineProps,computed } from 'vue'
const props = defineProps({
  label: String,
  placeholder: String,
  columns: Array ,
  show: Boolean,
  position: String,
  title:String,
  value:Array,
  name:String,
  selectKey:String,
  showValue:String,
  selectName:String,
  modelValue: [Number,String]
})
const emits = defineEmits(["update:modelValue","change","confirm"])

const position1 = ref("bottom")
const sValue = ref("")
const value = computed(()=>{
  if(sValue.value.length>0){
    return sValue.value
  }
  return props.showValue
})
if (props.position) {
  position1.value = props.position
}
const show1 = ref(false)
if (props.show) {
  show1.value = true
} else {
  show1.value = false
}

let dataMap = {}
let dataMap2 = {}
const columns1 = computed(()=>{
  const columnValues = []
  if(props.selectName){
    dataMap = {}
    for(const item of props.columns) {
      dataMap[item[props.selectName]]=item[props.selectKey]
      dataMap2[item[props.selectKey]]=item[props.selectName]
      columnValues.push(item[props.selectName])
    }
  }else{
    for(const item of props.columns) {
      columnValues.push(item)
    }
  }
  return columnValues
})
const title1 = ref("选择")
if(props.title){
  title1.value = props.title
}

const onConfirm = (el)=>{
  sValue.value = el
  if(props.selectName){
    emits('update:modelValue', dataMap[el])
  }else{
    emits('update:modelValue', el)
  }
  show1.value = false
  emits('confirm', el)
}
const onCancel=()=>{
  show1.value = false
}
const onChange=(el)=>{
  emits('change', el)
}
const clickInput = () => {
  show1.value = true
}
</script>

<style scoped>

</style>