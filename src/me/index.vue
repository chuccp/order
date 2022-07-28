<template>
  <van-cell-group inset>
    <van-cell  >
      <van-card
          num="2"
          price="2.00"
          desc="描述信息"
          title="商品标题"
          thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
      >
      </van-card>

    </van-cell>
  </van-cell-group>
  <van-cell-group title="分类管理">
    <van-cell :title="$t('name.addCategory')" is-link to="/category" />
    <van-cell :title="$t('name.listCategory')" is-link to="/listCategory" />
  </van-cell-group>
  <van-cell-group title="产品管理">
    <van-cell :title="$t('name.addProduct')" is-link to="/product" />
    <van-cell :title="$t('name.listProduct')" is-link to="/listProduct" />
  </van-cell-group>
  <van-cell-group title="用户管理">
    <van-cell :title="$t('name.addUser')" is-link to="/user" />
    <van-cell :title="$t('name.listUser')" is-link to="/listUser" />
  </van-cell-group>
</template>

<script setup>

</script>

<style scoped>

</style>