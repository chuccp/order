<template>
  <van-config-provider :theme-vars="themeVars" ref="vanConfigProvider">
  <van-row gutter="20" >
    <van-col span="4" >
      <van-sidebar v-model="active" @change="onChange" >
        <van-sidebar-item v-for="group in state.groups" :title="group.categoryName" :badge="group.goodsList.length" v-show="group.goodsList.length>0" />
      </van-sidebar>

    </van-col>
    <van-col span="20" style="padding-left: 14px;">
      <van-cell-group :style='{
      "overflow-x":"scroll",
      "-webkit-overflow-scrolling": "touch",
      "height": state.height+"px"
    }' :border="false" ref="groupcell"  >
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
                <van-button round type="primary" @click="showOrder(goods)" size="normal">下单</van-button>
              </template>

            </van-card>
          </van-cell>
        </van-cell-group>
        </div>
      </van-cell-group>
    </van-col>
  </van-row>

    <van-action-sheet v-model:show="state.show" title="选择数量" >
      <div class="content">

        <van-card
            :desc="state.goods.remark"
            :title="state.goods.goodsName"
            :thumb="imageUrl+state.goods.imageLink"
        >
          <template #tags>
            <van-tag plain type="danger">单位:{{state.goods.unit}}</van-tag>
          </template>
        </van-card>
        <van-cell-group inset>
          <van-cell title="输入数量" >
            <template #value>
              <van-stepper v-model="state.formData.goodsNum"  />
            </template>
          </van-cell>
        </van-cell-group >
        <van-divider />
        <van-cell-group  title="滑动调整数量">
        <van-slider v-model="state.formData.goodsNum"  :max="200" >
          <template #button>
            <div class="custom-button">{{ state.formData.goodsNum }}</div>
          </template>
        </van-slider>
        </van-cell-group>
        <van-divider />
        <van-button type="primary" @click="subscribe" block>确认下单</van-button>
      </div>
    </van-action-sheet>

  </van-config-provider>
</template>

<script>
import {ref,onMounted,onBeforeUpdate,onUpdated,reactive,nextTick} from "vue";
import {Toast,Dialog} from "vant";
import {scan,orderGoods} from '@/api/goods'

export default {
  setup() {
    const active  = ref(0);
    const groupcell = ref(null);
    const vanConfigProvider = ref(null);
    const imageUrl = ref(import.meta.env.VITE_APP_IMAGE_API)
    const state = reactive({goods:{},num:0,groups:[],show:false,height:540,formData:{goodsNum:50,goodsId:0}})
    // const groups =
    let groupItemRels =[]
    const setItemRef=(el)=>{
      if(el){
        groupItemRels.push(el)
      }
    }
    onMounted(()=>{
        state.height =  vanConfigProvider.value.$el.offsetHeight
        groupItemRels =[];
        scan().then((response=>{
           state.groups =response.data.responseBody
        }))

    })
    const onChange = (index)=> {
      Toast({message:state.groups[index].categoryName,position: 'bottom'})
      let scrollHeight = 0
      for (let i=0; i<index; i++)
      {
        scrollHeight = scrollHeight+groupItemRels[i].offsetHeight
      }
      groupcell.value.$el.scrollTop = scrollHeight
    };
    const showOrder=(goods)=>{
      state.formData.goodsId = goods.goodsId
      state.goods = goods
      state.show = true
    }
    const subscribe=()=>{
      Dialog.confirm({
        title: '添加货物',
        message:
            '确定添加 '+state.goods.goodsName+':'+state.formData.goodsNum+state.goods.unit+'吗。',
      })
          .then(() => {
            orderGoods(state.formData).then((response=>{
              if(response.data.responseBody){
                Toast({message:"添加成功",position: 'bottom'})
                state.show = false
              }
            }))
          })
          .catch(() => {
            // on cancel
          });
    }
    const themeVars = {cellGroupTitleColor:'var(--van-primary-color)'};

    return {
      active,onChange,state,setItemRef,groupcell,themeVars,showOrder,vanConfigProvider,subscribe,imageUrl
    }

  }}


</script>
<style scoped>
.van-row {
  display: flex;
  flex-wrap: wrap;
  position: fixed;
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
</style>