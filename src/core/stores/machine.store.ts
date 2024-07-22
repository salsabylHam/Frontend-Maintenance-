import { defineStore } from 'pinia'
import { env } from '../constants'

export interface OrderStore {
    machine: any[]
}

export const useMachineStore = defineStore('machine', {
    state: (): OrderStore => ({
        machine: [],
    }),
    actions: {
        async getStatisticOverview() {
            return Promise.all([
                window.$axios.get(`${env.BACKEND_BASE_URL}/api/v1/demande/statistique/machine-down-rate`),
                window.$axios.get(`${env.BACKEND_BASE_URL}/api/v1/machine/statistique/count`),
            ]).then((res: any) => {
                return { rate: res[0], count: res[1] }
            })
        },
    },
})
