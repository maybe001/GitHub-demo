import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            //首页路由
            path: '/',
            component: () => import('@/views/Home/index.vue')
        },
        {
            name: "searchuser",
            //可视化显示路由
            path: '/searchuser/:user',
            component: () => import('@/views/SearchUser/index.vue')
        }
    ],
    //路由行为配置项
    scrollBehavior() {
        return {
            top: 0
        }
    }
})
//对外暴露router
export default router
