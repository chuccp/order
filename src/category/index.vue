<template>

  <van-cell-group inset>
    <van-field v-model="value" label="分类名" placeholder="请输入产品名" />
  </van-cell-group>
  <van-cell-group inset style="margin-top: 10px">
  <van-button type="primary" size="large">提交</van-button>
  </van-cell-group>
</template>

<script setup>
import {useStore} from 'vuex';
import {ref, onMounted, onBeforeUpdate,reactive} from 'vue';
import i18n from '../i18n'

const addCategory = i18n.global.t('name.addCategory');
const  store = useStore()

onMounted(()=>{
  store.commit("increment",addCategory);
})

</script>

<style scoped>

</style>