import { User } from '@interfaces/user'
import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
import router from '../routers'
import { ROUTES, env } from '../constants'

export type UserStore = {
    user: User
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
export interface UserRateState {
    month: number
    year: number
    change_percentage: string
}
const { cookies } = useCookies()

export const useUserStore = defineStore('user', {
    state: (): UserStore => ({
        user: {} as User,
    }),
    actions: {
        async login(body: LoginRequestType) {
            return window.$axios.post(`/api/v1/auth/signin`, body).then(async (data: any) => {
                cookies.set(env.TOKEN_KEY.toString(), data.access_token)
                this.$patch({ user: data.user })
                await router.push(ROUTES.MAIN)
            })
        },
        loginWithProvider(id: number, provider: PROVIDER) {
            const authUrl = `${env.BACKEND_BASE_URL}/api/v1/auth/${id}/${provider.toString()}`
            const _ = window.open(authUrl, 'Login with ' + provider.toString(), 'width=600,height=600')
            const handleMessage = async (event: MessageEvent) => {
                if (event.origin.toLocaleLowerCase() !== env.BACKEND_BASE_URL.toString().toLocaleLowerCase()) {
                    return
                }
                // this responce contains
                const response = event.data

                cookies.set(env.TOKEN_KEY.toString(), response.access_token)
                this.$patch({ user: response.user })
                await router.push(ROUTES.MAIN)
                window.removeEventListener('message', handleMessage)
            }

            window.addEventListener('message', handleMessage)
        },
        async getAuthProviders(code: string): Promise<AuthProviders[]> {
            return window.$axios.get(`${env.BACKEND_BASE_URL}/api/v1/enterprise/${code}/auth`)
        },
        async logout() {
            cookies.remove(env.TOKEN_KEY)
            this.user = {} as User
            await router.push('/sign-in')
        },
        async getStatisticOverview() {
            return Promise.all([
                window.$axios.get(
                    `${env.BACKEND_BASE_URL}/api/v1/users/statistique/increase-rate`,
                ),
                window.$axios.get(
                    `${env.BACKEND_BASE_URL}/api/v1/users/statistique/count`,
                ),
            ]).then((res: any) => {
                return { rate: res[0], count: res[1] }
            })
        },
    },
    persist: true,
})
