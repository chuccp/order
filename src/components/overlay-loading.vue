<template>
  <van-overlay :show="props.show" >
    <div class="wrapper" @click.stop>
      <div class="block" >
        <van-loading size="24px">{{ props.text }}</van-loading>
      </div>
    </div>
  </van-overlay>
</template>

<script setup>

import {defineEmits, ref,defineProps,computed } from 'vue'
const props = defineProps({
  show: [Number,String],
  text:[String]
})

</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  width: 120px;
  height: 120px;
}
</style>