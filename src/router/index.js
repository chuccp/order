import { createRouter, createWebHistory } from 'vue-router'
import Groups from '../groups/index.vue'
import i18n from '../i18n'
import store from "../store";

// import Order from '../order/index.vue'
// import Me from '../me/index.vue'
 const routes = [{

     path: '/',
     name: 'index',
     redirect:'/group'

 },{

    path: '/group',
     name: 'group',
    component:Groups,
     meta:{title:i18n.global.t('name.shop')}

},{

     path: '/order',
     name: 'Order',
     component: () => import('../order/index.vue'),
     meta:{title:i18n.global.t('name.order')}

 },{
     path: '/me',
     name: 'Me',
     component: () => import('../me/index.vue'),
     meta:{title:i18n.global.t('name.me')}

 },{

     path: '/product',
     name: 'Product',
     component: () => import('../product/index.vue'),
     meta:{title:i18n.global.t('name.addProduct')}

 },{

     path: '/product',
     name: 'Product',
     component: () => import('../product/list.vue'),
     meta:{title:i18n.global.t('name.listProduct')}

 },{

     path: '/category',
     name: 'category',
     component: () => import('../category/index.vue'),
     meta:{title:i18n.global.t('name.addCategory')}

 },{

     path: '/listCategory',
     name: 'listCategory',
     component: () => import('../category/list.vue'),
     meta:{title:i18n.global.t('name.listCategory')}

 }]
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes , // `routes: routes` 的缩写
})

router.beforeEach((to,from,next)=>{
    if(to.meta.title){
        store.commit("increment",to.meta.title);
    }
    next(vm=>{
        console.log(vm)
    })

    return true
})

export default router