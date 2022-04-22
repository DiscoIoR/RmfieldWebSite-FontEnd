import * as VueRouter from 'vue-router'

import App from "@/components/Login-App";
import UserApp from "@/components/User-App";

// import Base from "@/components/Base";
// import LoginRegisterPanel from "@/components/LoginRegisterPanel";
// import NavigationBar from "@/components/NavigationBar";
import {getCookie} from "./getCookie.js"
import ArknightsAnalysisApp from "@/components/ArknightsAnalysis-App";
import ArknightsGeneral from "@/components/ArknightsGeneral";
import ArknightsGacha from "@/components/ArknightsGacha";
import ArknightsDiamond from "@/components/ArknightsDiamond";
import ArknightsOrder from "@/components/ArknightsOrder";
import axios from "axios";

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
    //如果访问需要授权,则校验登录状态
    if (to.meta.requiresAuth) {
        let token = getCookie('token')
        axios({
            url: "/api/islogin",
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        }).then(response => {
            if(response.data === true){
                next()
            }else {
                //未登录则重定向到登陆页面
                next({
                    path: '/',
                    // 保存当前位置，用于重定向
                    query: { redirect: to.fullPath },
                })
            }
        }).catch(()=>{
            //未登录则重定向到登陆页面
            next({
                path: '/',
                // 保存当前位置，用于重定向
                query: { redirect: to.fullPath },
            })
        })
    }else {
        next()
    }
})

export default router



