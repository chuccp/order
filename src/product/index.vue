<template>

  <van-cell-group inset>
    <van-field v-model="value" label="文本" placeholder="请输入产品名" />
    <van-field
        v-model="message"
        rows="2"
        autosize
        label="留言"
        type="textarea"
        maxlength="50"
        placeholder="请输入备注"
        show-word-limit
    />
  </van-cell-group>

</template>

<script setup>


</script>

<style scoped>

</style>