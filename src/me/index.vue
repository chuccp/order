<template>
  <van-cell-group inset>
    <van-cell  >
      <van-card
          :desc="store.state.user.userNo"
          :title="store.state.user.userName"
      >
        <template #thumb>
          <van-icon name="user-o" size="80" />
        </template>
      </van-card>

    </van-cell>
  </van-cell-group>
  <van-cell-group title="分类管理" v-if="$hasRole('super','manager')">
    <van-cell :title="$t('name.addCategory')" is-link to="/user/category" />
    <van-cell :title="$t('name.listCategory')" is-link to="/user/listCategory" />
  </van-cell-group>
  <van-cell-group title="产品管理" v-if="$hasRole('super','manager')">
    <van-cell :title="$t('name.addProduct')" is-link to="/user/product" />
    <van-cell :title="$t('name.listProduct')" is-link to="/user/listProduct" />
  </van-cell-group>
  <van-cell-group title="用户管理" v-if="$hasRole('super','manager')" >
    <van-cell :title="$t('name.addUser')" is-link to="/user/addUser" />
    <van-cell :title="$t('name.listUser')" is-link to="/user/listUser" />
  </van-cell-group>
</template>

<script setup>
import {useStore} from "vuex";
const store = useStore()
</script>

<style scoped>

</style>