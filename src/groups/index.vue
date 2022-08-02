<template>
  <van-config-provider :theme-vars="themeVars" ref="vanConfigProvider">
  <van-row gutter="20" >
    <van-col span="4" >
      <van-sidebar v-model="active" @change="onChange" >
        <van-sidebar-item v-for="group in state.groups" :title="group.categoryName" :badge="group.goodsList.length" />
      </van-sidebar>

    </van-col>
    <van-col span="20" style="padding-left: 14px;">
      <van-cell-group :style='{
      "overflow-x":"scroll",
      "-webkit-overflow-scrolling": "touch",
      "height": state.height+"px"
    }' :border="false" ref="groupcell"  >
        <div v-for="group in state.groups" :ref="setItemRef" class="group-views" >
        <van-cell-group  :title="group.categoryName" class="my-van-cell-group"  >
          <van-cell  v-for="goods  in group.goodsList" >
            <van-card
                :desc="goods.remark"
                :title="goods.goodsName"
                thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
            >
              <template #tags>
                <van-tag plain type="danger">单位:{{goods.unit}}</van-tag>
              </template>
              <template #footer class="van-cell-group-footer">
                <van-button round type="primary" @click="showOrder" size="normal">下单</van-button>
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
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
        >
        </van-card>
        <van-cell-group inset>
          <van-cell title="输入数量" >
            <template #value>
              <van-stepper v-model="value"  />
            </template>
          </van-cell>
        </van-cell-group >
        <van-divider />
        <van-cell-group  title="滑动调整数量">
        <van-slider v-model="value" @change="onChangeSlider" :max="200" >

          <template #button>
            <div class="custom-button">{{ value }}</div>
          </template>

        </van-slider>
        </van-cell-group>
        <van-divider />
        <van-button type="primary" block>确认下单</van-button>
      </div>
    </van-action-sheet>

  </van-config-provider>
</template>

<script>
import {ref,onMounted,onBeforeUpdate,onUpdated,reactive,nextTick} from "vue";
import {Toast} from "vant";
import {scan} from '../api/goods'

export default {
  setup() {
    const value = ref(50);
    const active  = ref(0);
    const groupcell = ref(null);
    const vanConfigProvider = ref(null);
    const state = reactive({num:0,groups:[],show:false,height:540})
    // const groups =
    let groupItemRels =[]
    const setItemRef=(el)=>{
      if(el){
        groupItemRels.push(el)
      }
    }
    onMounted(()=>{
        state.height =  vanConfigProvider.value.$el.offsetHeight
        console.log(state.height)
        groupItemRels =[];
        scan().then((response=>{
           state.groups =response.data.responseBody
        }))

    })
    const onChangeSlider = (value) => Toast('当前值：' + value);

    const onChange = (index)=> {
      Toast({message:state.groups[index].categoryName,position: 'bottom'})
      let scrollHeight = 0
      for (let i=0; i<index; i++)
      {
        scrollHeight = scrollHeight+groupItemRels[i].offsetHeight
      }
      groupcell.value.$el.scrollTop = scrollHeight
    };
    const showOrder=()=>{
      state.show = true
    }
    const themeVars = {cellGroupTitleColor:'var(--van-primary-color)'};
    return {
      active,onChange,state,setItemRef,groupcell,themeVars,showOrder,vanConfigProvider,value
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
</style>