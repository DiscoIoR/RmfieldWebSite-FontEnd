import * as VueRouter from 'vue-router'

import App from "@/components/Login-App";
import UserApp from "@/components/User-App";

// import Base from "@/components/Base";
// import LoginRegisterPanel from "@/components/LoginRegisterPanel";
// import NavigationBar from "@/components/NavigationBar";
import ArknightsAnalysisApp from "@/components/ArknightsAnalysis-App";
import ArknightsGeneral from "@/components/ArknightsGeneral";
import ArknightsGacha from "@/components/ArknightsGacha";
import ArknightsDiamond from "@/components/ArknightsDiamond";
import ArknightsOrder from "@/components/ArknightsOrder";
import store from "@/store";

const routes = [
    {
        path: '/',
        component: App,
        meta: { requiresAuth: false },
    },
    {
        path: '/user',
        component: UserApp,
        meta: { requiresAuth: true },
        children: [
            {
                path: 'arknights-analysis',
                component: ArknightsAnalysisApp,
                children: [
                    {
                        path: 'general',
                        name: 'ArknightsGeneral',
                        component: ArknightsGeneral
                    },
                    {
                        path: 'gacha',
                        name: 'ArknightsGacha',
                        component: ArknightsGacha
                    },
                    {
                        path: 'diamond',
                        name: 'ArknightsDiamond',
                        component: ArknightsDiamond
                    },
                    {
                        path: 'order',
                        name: 'ArknightsOrder',
                        component: ArknightsOrder
                    }
                ]
            }
        ]
    }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

router.beforeEach((to,from,next)=>{
    if (to.meta.requiresAuth && !store.state.isLogin ) {
        // 此路由需要授权，请检查是否已登录
        // 如果没有，则重定向到登录页面
        next({
            path: '/',
            // 保存我们所在的位置，以便以后再来
            query: { redirect: to.fullPath },
        })
    }else {
        next()
    }
})

export default router



