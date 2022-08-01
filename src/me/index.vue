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
    <van-cell :title="$t('name.addCategory')" is-link to="/user/category" />
    <van-cell :title="$t('name.listCategory')" is-link to="/user/listCategory" />
  </van-cell-group>
  <van-cell-group title="产品管理">
    <van-cell :title="$t('name.addProduct')" is-link to="/user/product" />
    <van-cell :title="$t('name.listProduct')" is-link to="/user/listProduct" />
  </van-cell-group>
  <van-cell-group title="用户管理">
    <van-cell :title="$t('name.addUser')" is-link to="/user/user" />
    <van-cell :title="$t('name.listUser')" is-link to="/user/listUser" />
  </van-cell-group>
</template>

<script setup>

</script>

<style scoped>

</style>