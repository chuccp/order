<template>
  <van-config-provider :theme-vars="themeVars" ref="vanConfigProvider"  >
  <van-row gutter="20"  >
    <van-col span="4" >
      <van-sidebar v-model="active" @change="onChange" >
        <van-sidebar-item v-for="group in state.groups" :title="group.categoryName" :badge="group.goodsList.length" v-show="group.goodsList.length>0" />
      </van-sidebar>
    </van-col>
    <van-col span="20" style="padding-left: 14px;">
      <van-cell-group :style='{
      "overflow-x":"scroll",
      "-webkit-overflow-scrolling": "touch",
      "height": (storex.state.viewHeight-66)+"px"
    }' :border="false" ref="groupCell"  >
        <div v-for="group in state.groups" :ref="setItemRef" class="group-views" v-show="group.goodsList.length>0" >
        <van-cell-group  :title="group.categoryName" class="my-van-cell-group"  >
          <van-cell  v-for="goods  in group.goodsList"  >
            <van-card
                :desc="goods.remark"
                :title="goods.goodsName"
                :thumb="imageUrl+goods.imageLink"
            >
              <template #tags>
                <van-tag plain type="danger">单位:{{goods.unit}}</van-tag>
              </template>
              <template #footer class="van-cell-group-footer">
                <van-stepper v-model="goods.goodsNum" default-value="0" min="0"  step="10" />
                <van-cell-group style="margin-top: 15px;background: var(--van-card-background-color);">
                  <van-button plain size="mini" @click="goods.goodsNum=50" type="primary" class="num-button">50</van-button>
                  <van-button plain size="mini" @click="goods.goodsNum=100" type="primary" class="num-button">100</van-button>
                  <van-button plain size="mini" @click="goods.goodsNum=200" type="primary" class="num-button">200</van-button>
                  <van-button plain size="mini" @click="goods.goodsNum=300" type="primary" class="num-button">300</van-button>
                </van-cell-group>
              </template>
            </van-card>
          </van-cell>
        </van-cell-group>
        </div>
      </van-cell-group>
    </van-col>
  </van-row>
    <van-cell-group class="van-cell-group-bottom">
      <van-cell :title="'总数:'+order.goodsNum"  :label="'种类:'+order.orderCategoryNum"  >

        <template #value>
          <van-button @click="changeShow" type="success">下单</van-button>
        </template>
      </van-cell>
    </van-cell-group>
  </van-config-provider>
  <van-action-sheet
      v-model:show="state.show"
      title="下单列表"
      close-on-click-action
      ref="actionSheet"
  >
    <template #description>
      <Order ref="orderVue"></Order>
    </template>
  </van-action-sheet>
</template>
<script>
import {ref, onMounted, onBeforeUpdate, onUpdated, reactive, nextTick, computed,toRaw } from "vue";
import {Toast,Dialog} from "vant";
import {scan,orderGoods} from '@/api/goods'
import {useStore} from 'vuex';
import store from 'storejs';
import Order from './order.vue'
export default {
  components: {Order},
  setup() {
    const active  = ref(0);
    const groupCell = ref(null);

    const storex = useStore()
    const vanConfigProvider = ref(null);
    const orderVue = ref(null)
    const actionSheet = ref(null)
    const imageUrl = ref(import.meta.env.VITE_APP_IMAGE_API)
    const state = reactive({groups:[],show:false})
    let groupItemRels =[]
    const setItemRef=(el)=>{
      if(el){
        groupItemRels.push(el)
      }
    }
    let start = false
    onMounted(()=>{
        groupItemRels =[];
        scan().then((response=>{
          const groups = response.data.responseBody;
          if(store.has("goodObj")){
              const goodObj = store.get("goodObj")
              for(const group of groups){
                for(const goods of group.goodsList){
                  const sg = goodObj[goods.goodsId]
                  if (sg){
                    goods.goodsNum = sg.goodsNum
                  }
                }
              }
            }
          state.groups =groups
        }))

    })

    const order = computed(()=>{
      let goodObj = {}
      let goodsNum = 0
      let orderCategoryNum = 0
      for(const group of state.groups){
        for(const goods of group.goodsList){
          if(goods.goodsNum){
            goodsNum = goods.goodsNum+goodsNum
            orderCategoryNum = orderCategoryNum+1
            goodObj[goods.goodsId] = toRaw(goods)
          }
        }
      }
      if(state.groups.length>0){
        store.set("goodObj", goodObj);
      }
      return {goodsNum,orderCategoryNum}
    })

    const onChange = (index)=> {
      Toast({message:state.groups[index].categoryName,position: 'bottom'})
      let scrollHeight = 0
      for (let i=0; i<index; i++)
      {
        scrollHeight = scrollHeight+groupItemRels[i].offsetHeight
      }
      groupCell.value.$el.scrollTop = scrollHeight
    };
    const themeVars = {cellGroupTitleColor:'var(--van-primary-color)',actionSheetMaxHeight:'100%'};
    const changeShow = ()=>{
      state.show = true
      if(orderVue.value){
        orderVue.value.loadStore()
      }
      console.log(actionSheet.value.$el)
    }
    return {
      active,onChange,state,setItemRef,groupCell,themeVars,vanConfigProvider,imageUrl,storex,order,orderVue,changeShow,actionSheet
    }
  }}
</script>
<style scoped>
.van-row {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.van-config-provider{
  height: 100%;
  width: 100%;
  float: left;
}
.content {
  padding: 16px 16px 160px;
}
.custom-button {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 100px;
}
.van-cell-group-bottom{

}
</style>