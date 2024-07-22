import { defineStore } from 'pinia'
import type { Dashboard } from '@interfaces/dashboard'
import { env } from '../constants'

export interface OrderStore {
    order: any[]
}

export const useOrderStore = defineStore('order', {
    state: (): OrderStore => ({
        order: [],
    }),
    actions: {
        async getStatisticOverview() {
            return Promise.all([
                window.$axios.get(`${env.BACKEND_BASE_URL}/api/v1/order/statistique/increase-rate`),
                window.$axios.get(`${env.BACKEND_BASE_URL}/api/v1/order/statistique/count`),
            ]).then((res:any) => {
                return { rate: res[0], count: res[1] }
            })
        },
    },
})
