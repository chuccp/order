<template>

  <van-cell-group inset>
    <van-field v-model="value" label="产品名" placeholder="请输入产品名" />
    <van-field
        v-model="message"
        rows="2"
        autosize
        label="备注"
        type="textarea"
        maxlength="50"
        placeholder="请输入备注"
        show-word-limit
    />
    <selectField label="选择类别" placeholder="选择类别"></selectField>
  </van-cell-group>

</template>

<script setup>
import {ref} from "vue";
const value = ref("")
const message = ref("")
</script>

<style scoped>

</style>