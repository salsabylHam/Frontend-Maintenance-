import { defineStore } from 'pinia'
import { env } from '../constants'

export interface OrderStore {
    demande: any[]
}

export const useDemandeStore = defineStore('demande', {
    state: (): OrderStore => ({
        demande: [],
    }),
    actions: {
        async getStatisticOverview() {
            return Promise.all([
                window.$axios.get(`${env.BACKEND_BASE_URL}/api/v1/demande/statistique/increase-rate`),
                window.$axios.get(`${env.BACKEND_BASE_URL}/api/v1/demande/statistique/count`),
            ]).then((res: any) => {
                return { rate: res[0], count: res[1] }
            })
        },
        async getStatisticByPriority(): Promise<any> {
            return window.$axios.get(`${env.BACKEND_BASE_URL}/api/v1/demande/statistique/by-priority`)
        },
    },
})
