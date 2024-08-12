import { createMemoryHistory, createRouter } from 'vue-router'
import { ROUTES, DASHBOARD_ROUTES } from '@constants'
import authGuard from '../guards/auth.guard'
import { defineAsyncComponent } from 'vue'
const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            ...ROUTES.HOME,
            component: defineAsyncComponent(() => import('@pages/LandingPages/Home/Home.vue')),
            redirect: ROUTES.SIGN_IN.path,
            beforeEnter: authGuard,
            children: [
                {
                    ...ROUTES.SIGN_IN,
                    component: defineAsyncComponent(() => import('@pages/LandingPages/Home/Login/Login.vue')),
                },
                {
                    ...ROUTES.SIGN_UP,
                    component: defineAsyncComponent(() => import('@pages/LandingPages/Home/Signup/Signup.vue')),
                },
            ],
        },
        {
            ...ROUTES.MAIN,
            component: () => defineAsyncComponent(() => import('@pages/Dashboard/MainDashboard.vue')),
            redirect: DASHBOARD_ROUTES.Overview.path,
            beforeEnter: authGuard,
            children: [
                {
                    ...DASHBOARD_ROUTES.Overview,
                    component: defineAsyncComponent(() => import('@pages/Dashboard/Overview/Overview.vue')),
                },
                {
                    ...DASHBOARD_ROUTES.STOCKS,
                    children: [
                        {
                            ...DASHBOARD_ROUTES.PIECES,
                            component: defineAsyncComponent(() => import('@/pages/Dashboard/Stocks/Pieces.vue')),
                        },
                        {
                            ...DASHBOARD_ROUTES.MACHINES,
                            component: defineAsyncComponent(() => import('@/pages/Dashboard/Stocks/Machines.vue')),
                        },
                    ],
                },
            ],
        },
    ],
})
export default router
