import { createRouter, createWebHistory } from 'vue-router'

import i18n from '../i18n'
import store from "../store";
import Groups from '../groups/index.vue'
import Login from '../login.vue'
import User from '../user.vue'
 const routes = [{

     path: '/',
     name: 'index',
     redirect:'/user'

 },{

     path: '/login',
     name: 'login',
     component:Login,
     meta:{title:"登录"}

 },{
    path: '/user',
     component:User,
     name: 'user',
     meta:{title:"首页"},
     redirect: '/user/group',
     children: [{

             path: 'group',
             name: 'group',
             component:Groups,
             meta:{title:i18n.global.t('name.shop')}

         },{

             path: 'order',
             name: 'Order',
             component: () => import('../order/index.vue'),
             meta:{title:i18n.global.t('name.order')}

         },{
             path: 'me',
             name: 'Me',
             component: () => import('../me/index.vue'),
             meta:{title:i18n.global.t('name.me')}

         },{

             path: 'product',
             name: 'addProduct',
             component: () => import('../product/index.vue'),
             meta:{title:i18n.global.t('name.addProduct')}

         },{

             path: 'listProduct',
             name: 'listProduct',
             component: () => import('../product/list.vue'),
             meta:{title:i18n.global.t('name.listProduct')}

         },{

             path: 'category',
             name: 'category',
             component: () => import('../category/index.vue'),
             meta:{title:i18n.global.t('name.addCategory')}

         },{

             path: 'listCategory',
             name: 'listCategory',
             component: () => import('../category/list.vue'),
             meta:{title:i18n.global.t('name.listCategory')}

         }
     ]
 }]
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes , // `routes: routes` 的缩写
})

router.beforeEach((to,from,next)=>{
    if(to.meta.title){
        store.commit("increment",to.meta.title);
        document.title = to.meta.title
    }
    next(vm=>{
        console.log(vm)
    })

    return true
})

export default router