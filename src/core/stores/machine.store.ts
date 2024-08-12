import { defineStore } from 'pinia'
import { env } from '../constants'
import { Machine } from '@/shared/components/Machine/columns'

export interface OrderStore {
    machine: Machine
    pending: Machine[]
    machines: Machine[]
}

export const useMachineStore = defineStore('machine', {
    state: (): OrderStore => ({
        machine: {} as Machine,
        pending: [],
        machines: [],
    }),
    actions: {
        async getMachines(params: Partial<Machine>) {
            return window.$axios.get(`${env.BACKEND_BASE_URL}/api/v1/machine`, { params }).then((machines: any) => {
                this.$patch({ machines: machines as Machine[] })
                return machines
            })
        },
        async createMachine(machine: any) {
            return window.$axios.post(`${env.BACKEND_BASE_URL}/api/v1/machine`, machine)
        },
        async deleteMachine(id: number) {
            return window.$axios.delete(`${env.BACKEND_BASE_URL}/api/v1/machine/${id}`)
        },
        async bulkDeleteMachine(machines: Machine[]) {
            return await Promise.all(machines.map((machine) => this.deleteMachine(machine.id)))
        },
        async updateMachine(id: number, machine: Partial<Machine>) {
            return window.$axios.patch(`${env.BACKEND_BASE_URL}/api/v1/machine/${id}`, machine)
        },
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
