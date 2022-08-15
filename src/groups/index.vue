<template>
  <van-config-provider :theme-vars="themeVars" ref="vanConfigProvider"  >
  <van-row gutter="20"  >
    <van-col span="4" >
      <van-sidebar v-model="active" @change="onChange" >
        <van-sidebar-item v-for="group in state.groups" :title="group.categoryName" :badge="group.groupNum" v-show="group.goodsList.length>0" />
      </van-sidebar>
    </van-col>
    <van-col span="20">
      <van-cell-group :style='{"height": (storex.state.viewHeight-66)+"px"}' :border="false" ref="groupCell"  >
       <ScrollView :height="storex.state.viewHeight-66" :top="state.top" ref="groupCellScrollView" :style='{
      "position":"relative",
      "width":"100%",
      "height": (storex.state.viewHeight-66)+"px"
    }'>

        <div ref="groupCellInsert" :style='{"min-height": "101%", "width":"100%"}'>
        <div v-for="group in state.groups" :ref="setItemRef" class="group-views" v-show="group.goodsList.length>0" >
        <van-cell-group  :title="group.categoryName" class="my-van-cell-group"  >
          <van-cell  v-for="goods  in group.goodsList"  >
            <van-card
                :desc="goods.remark"
                :title="goods.goodsName"
                :thumb="imageUrl+goods.imageLink"
                @click-thumb="showBigImage(goods)"
            >
              <template #footer class="van-cell-group-footer">
                <van-stepper button-size="30px" v-model="goods.goodsNum" default-value="0" min="0"  step="10" />
                <van-cell-group style="margin-top: 15px;background: var(--van-card-background-color);">
                  <van-button plain size="mini" @click="goods.goodsNum!=50?goods.goodsNum=50:goods.goodsNum=0" type="primary" class="num-button">50</van-button>
                  <van-button plain size="mini" @click="goods.goodsNum!=100?goods.goodsNum=100:goods.goodsNum=0" type="primary" class="num-button">100</van-button>
                  <van-button plain size="mini" @click="goods.goodsNum!=200?goods.goodsNum=200:goods.goodsNum=0" type="primary" class="num-button">200</van-button>
                  <van-button plain size="mini" @click="goods.goodsNum!=300?goods.goodsNum=300:goods.goodsNum=0" type="primary" class="num-button">300</van-button>
                </van-cell-group>
              </template>
            </van-card>
          </van-cell>
        </van-cell-group>
        </div>
        </div>
       </ScrollView>
      </van-cell-group>
    </van-col>
  </van-row>
    <van-cell-group class="van-cell-group-bottom">
      <van-cell :title="'总数:'+order.goodsNum"  :label="'品种:'+order.orderCategoryNum"  >

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
  >
    <template #description>
      <Order ref="orderVue" @action="orderAction"></Order>
    </template>
  </van-action-sheet>
</template>
<script>
import {ref, onMounted, onBeforeUpdate, onUpdated, reactive, nextTick, computed,toRaw } from "vue";
import {Toast,Dialog} from "vant";
import {scan} from '@/api/goods'
import {useStore} from 'vuex';
import store from 'storejs';
import ScrollView from '@/components/ScrollView.vue';
import Order from './order.vue'
import {useRoute, useRouter} from "vue-router";
import { ImagePreview } from 'vant';
import overlayLoading from '@/components/overlay-loading.vue'
export default {
  components: {Order},
  setup() {
    const router = useRouter()
    const active  = ref(0);
    const groupCell = ref(null);
    const storex = useStore()
    const vanConfigProvider = ref(null);
    const groupCellScrollView =  ref(null);
    const orderVue = ref(null)
    const imageUrl = ref(import.meta.env.VITE_APP_IMAGE_API)
    const bigShow = ref(false)
    const state = reactive({groups:[],show:false,bigShow:false,images:[],top:0})
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
          if(store.has(storex.state.user.storeGoodsName)){
              const goodObj = store.get(storex.state.user.storeGoodsName)
              for(const group of groups){
                group.groupNum=0
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
        let groupNum = 0
        for(const goods of group.goodsList){
          if(goods.goodsNum){
            goodsNum = goods.goodsNum+goodsNum
            orderCategoryNum = orderCategoryNum+1
            groupNum = groupNum+1
            goodObj[goods.goodsId] = toRaw(goods)
          }
        }
        group.groupNum = groupNum
      }
      if(state.groups.length>0){
        store.set(storex.state.user.storeGoodsName, goodObj);
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
      console.log("scrollHeight:"+scrollHeight)
      state.top = scrollHeight
      // groupCellScrollView.value.moveTop(scrollHeight)
    };
    const themeVars = {cellGroupTitleColor:'var(--van-primary-color)',actionSheetMaxHeight:'100%'};
    const changeShow = ()=>{
      if((!!order.value.goodsNum) && order.value.goodsNum>0){
        state.show = true
        if(orderVue.value){
          orderVue.value.loadStore()
        }
      }else{
        Toast({message:"您尚未选择产品",position: 'bottom'})
      }
    }
    const orderAction = ()=>{
      state.show = false
      store.set(storex.state.user.storeGoodsName, {});
      for(const group of state.groups){
        for(const goods of group.goodsList){
          goods.goodsNum = 0
        }
      }
      router.push("/user/order")
    }

    const showBigImage = (goods)=>{

      const pre = goods.imageLink.substring(0,goods.imageLink.lastIndexOf("."))
      const stuff = goods.imageLink.substring(goods.imageLink.lastIndexOf("."))

      ImagePreview({
        images: [
          `${imageUrl.value}${pre}-big${stuff}`
        ],
        closeable: true,
      });

    }

    return {
      active,onChange,state,setItemRef,groupCell,themeVars,vanConfigProvider,imageUrl,storex,order,orderVue,changeShow,orderAction,router,showBigImage,bigShow,groupCellScrollView
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
.num-button {
  margin-left: 2px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>