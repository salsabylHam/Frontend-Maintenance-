import { createRouter, createWebHistory } from 'vue-router'
import { ROUTES, DASHBOARD_ROUTES } from '@constants'
import authGuard from '../guards/auth.guard'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior: (to, _, savedPosition) => {
        if (savedPosition) {
            return savedPosition
        } else if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth'
            }
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: [
        {
            ...ROUTES.HOME,
            component: () => import('@pages/LandingPages/Home/Home.vue')
        },
        {
            ...ROUTES.AUTH,
            component: () => import('@pages/LandingPages/Auth/Auth.vue'),
            redirect: `${ROUTES.AUTH.path}/${ROUTES.LOGIN.path}`,
            beforeEnter: authGuard,
            children: [
                {
                    ...ROUTES.LOGIN,
                    component: () => import('@/pages/LandingPages/Auth/Login/Login.vue'),
                },
                {
                    ...ROUTES.SIGN_UP,
                    component: () => import('@/pages/LandingPages/Auth/Signup/Signup.vue'),
                },
            ],
        },
        {
            ...ROUTES.MAIN,
            component: () => import('@pages/Dashboard/MainDashboard.vue'),
            redirect: `${DASHBOARD_ROUTES.Overview.path}`,
            beforeEnter: authGuard,
            children: [
                {
                    ...DASHBOARD_ROUTES.Overview,
                    component: () => import('@pages/Dashboard/Overview/Overview.vue'),
                },
                {
                    ...DASHBOARD_ROUTES.STOCKS,
                    children: [
                        {
                            ...DASHBOARD_ROUTES.PIECES,
                            component: () => import('@/pages/Dashboard/Stocks/Pieces.vue'),
                        },
                        {
                            ...DASHBOARD_ROUTES.MACHINES,
                            component: () => import('@/pages/Dashboard/Stocks/Machines.vue'),
                        },
                    ],
                },
                {
                    ...DASHBOARD_ROUTES.CLIENTS,
                    component: () => import('@pages/Dashboard/Clients/Clients.vue')
                },
                {
                    ...DASHBOARD_ROUTES.CONTRACTS,
                    component: () => import('@pages/Dashboard/Contracts/Contracts.vue')
                }
            ],
        },

    ],
})
export default router
