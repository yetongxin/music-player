import Vue from 'vue'
import VueRouter from 'vue-router'
// import Recommend from '@/components/recommend/recommend'
// import Singer from '@/components/singer/singer'
// import SingerDetail from '@/components/singer-detail/singer-detail'

const Recommend = (resolve) => {
    import('@/components/recommend/recommend').then((module) => {
        resolve(module)
    })
}
const Singer = (resolve) => {
    import('@/components/singer/singer').then((module) => {
        resolve(module)
    })
}
const SingerDetail = (resolve) => {
    import('@/components/singer-detail/singer-detail').then((module) => {
        resolve(module)
    })
}
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        redirect: '/recommend'
    },
    {
        path: '/recommend',
        component: Recommend
    },
    {
        path: '/singer',
        component: Singer,
        children: [
            {
                path: ':id',
                component: SingerDetail
            }
        ]
    }
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
