import { User } from '@interfaces/user'
import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
import router from '../routers'
import { DASHBOARD_ROUTES, ROUTES } from '../constants'

export type UserStore = {
    user: User | {}
}

export type LoginRequestType = {
    email: string
    enterpriseCode: string
    password: string
}
export enum PROVIDER {
    GOOGLE = 'google',
    UNKOWN = 'oidc',
}
export interface AuthProviders {
    id: number
    name: string
    provider: PROVIDER
}
const { cookies } = useCookies()

export const useUserStore = defineStore('user', {
    state: (): UserStore => ({
        user: {},
    }),
    actions: {
        async login(body: LoginRequestType) {
            return window.$axios.post(`/auth/signin`, body).then(async (data: any) => {
                cookies.set('user-token', data.access_token)
                this.$patch({ user: data.user })
                await router.push(ROUTES.MAIN)
            })
        },
        loginWithProvider(id: number, provider: PROVIDER) {
            const authUrl = `http://localhost:4000/api/v1/auth/${id}/${provider.toString()}`
            const popup = window.open(authUrl, 'oauthPopup', 'width=600,height=600')
            const handleMessage = async (event: MessageEvent) => {
                if (event.origin !== 'http://localhost:4000') {
                    return
                }
                // this responce contains
                const response = event.data

                cookies.set('user-token', response.access_token)
                this.$patch({ user: response.user })
                await router.push(ROUTES.MAIN)
                window.removeEventListener('message', handleMessage)
            }

            window.addEventListener('message', handleMessage)
        },
        async getAuthProviders(code: string): Promise<AuthProviders[]> {
            return window.$axios.get(`/enterprise/${code}/auth`)
        },
    },
    persist: true,
})
