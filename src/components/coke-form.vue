<template>
  <div class="form">
    <slot></slot>
    <van-cell-group inset :border="true" class="sumbit">
      <van-button type="primary" @click="sumbit" size="large">{{ label1 }}</van-button>
    </van-cell-group>
  </div>
</template>

<script setup>
import {defineEmits, defineProps, ref} from "vue"
import {Dialog} from "vant";
const emits = defineEmits(["action"])
const props = defineProps({
  label: String
})
const label1 = ref("提交")
if (props.label) {
  label1.value = props.label
}
const sumbit = () => {
  Dialog.confirm({
    title: '确认',
    message:'确定提交吗。',
  })
      .then(() => {
        emits("action")
      })
      .catch(() => {
        // on cancel
      });
}
</script>

<style scoped>
.form .sumbit {
  margin-top: 20px;
}

.form {
  float: left;
  width: 100%;
  margin-top: 20px;
}
</style>