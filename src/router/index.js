import * as VueRouter from 'vue-router'

import App from "@/components/Public/Login-App";
import UserApp from "@/components/User/User-App";

// import Base from "@/components/Base";
// import LoginRegisterPanel from "@/components/LoginRegisterPanel";
// import NavigationBar from "@/components/NavigationBar";
import {getCookie} from "@/router/getCookie";
import ArknightsAnalysisApp from "@/components/User/Arknights/ArknightsAnalysis-App";
import ArknightsGeneral from "@/components/User/Arknights/ArknightsGeneral";
import ArknightsGacha from "@/components/User/Arknights/ArknightsGacha";
import ArknightsDiamond from "@/components/User/Arknights/ArknightsDiamond";
import ArknightsOrder from "@/components/User/Arknights/ArknightsOrder";
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
    //???????????????url????????????,?????????????????????
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
                //????????????????????????????????????
                next({
                    path: '/',
                    // ????????????????????????????????????
                    query: { redirect: to.fullPath },
                })
            }
        }).catch(()=>{
            //????????????????????????????????????
            next({
                path: '/',
                // ????????????????????????????????????
                query: { redirect: to.fullPath },
            })
        })
    }else {
        next()
    }
})

export default router



