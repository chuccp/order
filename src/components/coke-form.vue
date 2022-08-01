<template>
  <di class="form">
    <slot></slot>
    <van-cell-group inset :border="true" class="sumbit">
      <van-button type="primary" @click="sumbit" size="large">{{ label1 }}</van-button>
    </van-cell-group>
  </di>
</template>

<script setup>
import {defineEmits, defineProps, ref} from "vue"
const emits = defineEmits(["action"])

const props = defineProps({
  label: String
})
const label1 = ref("提交")
if(props.label){
  label1.value = props.label
}

const sumbit= () => {
 emits("action")
}
</script>

<style scoped>
.form .sumbit{
  margin-top: 20px;
}
.form{
  float: left;
  width: 100%;
  margin-top: 20px;
}
</style>