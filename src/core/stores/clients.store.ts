import { defineStore } from 'pinia';
import { env } from '../constants';
import { Client } from '@/shared/components/Client/columns';

export interface ClientStore {
    pending: Client[]
    clients: Client[]
}


export const useClientStore = defineStore('client', {
    persist: true,
    state: (): ClientStore => ({
        pending: [],
        clients: [],
    }),
    getters: {
        types: function () {
            const types = new Set<string>()
            this.clients.map((client) => client.type.forEach((val) => types.add(val)))
            const mapedTypes: any[] = []
            types.forEach((val) => (mapedTypes.push({
                value: val,
                label: val
            })))
            return mapedTypes
        }
    },
    actions: {
        getClients(params: any) {
            return window.$axios
                .get(`${env.BACKEND_BASE_URL}/api/v1/clients`, { params })
                .then(async (data: any) => {
                    this.$patch({ clients: data });
                    return data;
                });
        },
        async createClient(client: any) {
            return window.$axios.post(`${env.BACKEND_BASE_URL}/api/v1/clients`, client).then(
                (data: any) => {
                    this.$patch({ clients: [...this.clients, data] })
                }
            );
        },
        async deleteClient(id: number) {
            return window.$axios.delete(`${env.BACKEND_BASE_URL}/api/v1/clients/${id}`).then(
                () => {
                    this.$patch({
                        clients: this.clients.filter(
                            (client) => client.id != id
                        )
                    })

                }
            );
        },
        async bulkDeleteClients(clients: any[]) {
            return await Promise.all(clients.map((client) => this.deleteClient(client.id)))
        },
        async updateClient(id: number, client: any) {
            return window.$axios.put(
                `${env.BACKEND_BASE_URL}/api/v1/clients/${id}`,
                client,
            );
        },
    },
});