import * as VueRouter from 'vue-router'

import App from "@/components/Login-App";
import UserApp from "@/components/User-App";

// import Base from "@/components/Base";
// import LoginRegisterPanel from "@/components/LoginRegisterPanel";
// import NavigationBar from "@/components/NavigationBar";
import ArknightsAnalysisApp from "@/components/ArknightsAnalysis-App";
import ArknightsGeneral from "@/components/ArknightsGeneral";

const routes = [
    {
        path: '/',
        component: App
    },
    {
        path: '/user',
        component: UserApp,
        // meta: {auth:true}
        children: [
            {
                path: 'arknights-analysis',
                component: ArknightsAnalysisApp,
                children: [
                    {
                        path: 'general',
                        name: 'ArknightsGeneral',
                        component: ArknightsGeneral
                    }
                ]
            }
        ]
    }
    // {
    //     path: '/',
    //     components:{
    //         m1:Base,
    //         m2:LoginRegisterPanel
    //     }
    // },
    // {
    //     path: '/user',
    //     components:{
    //         m1:Base,
    //         m2:NavigationBar
    //     }
    // }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

export default router



