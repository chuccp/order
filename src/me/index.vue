<template>
  <van-cell-group inset>
    <van-cell  >
      <van-card
          :desc="store.state.user.userNo"
          :title="store.state.user.userName"
          class="user-views"
      >
        <template #thumb>
          <van-icon name="user-o" size="80" />
        </template>
        <template #footer>
          <van-button size="normal" @click="logout" >退出登录</van-button>
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
import {inject} from "vue";
import {useRouter} from "vue-router";
const router = useRouter()
const store = useStore()
const cookies = inject("$cookies")
const logout=()=>{
  store.commit("clearUser");
  cookies.remove("token")
  cookies.remove("userInfo")
  router.push({ path: '/login' })
}
</script>

<style scoped>

</style>