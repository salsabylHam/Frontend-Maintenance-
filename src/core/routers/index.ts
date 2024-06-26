import { createMemoryHistory, createRouter } from 'vue-router'
import { ROUTES, DASHBOARD_ROUTES } from '@constants'
import authGuard from '../guards/auth.guard'
const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            ...ROUTES.HOME,
            redirect: ROUTES.SIGN_IN.path,
            component: () => import('@pages/LandingPages/Home/Home.vue'),
            beforeEnter: authGuard,
            children: [
                {
                    ...ROUTES.SIGN_IN,
                    component: () => import('@pages/LandingPages/Home/Login/Login.vue'),
                },
                {
                    ...ROUTES.SIGN_UP,
                    component: () => import('@pages/LandingPages/Home/Signup/Signup.vue'),
                },
            ],
        },
        {
            ...ROUTES.MAIN,
            component: () => import('@pages/Dashboard/MainDashboard.vue'),
            beforeEnter: authGuard,
            children: [
                {
                    ...DASHBOARD_ROUTES.STOCKS,
                    component: () => import('@pages/Dashboard/Stocks/Stocks.vue'),
                },
            ],
        },
    ],
})
export default router
