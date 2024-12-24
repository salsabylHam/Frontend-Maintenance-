import { defineStore } from 'pinia';
import { env } from '../constants';

export interface EnterpriseStore {
    enterprise: {
        name: string
    }
}


export const useEnterpriseStore = defineStore('enterprise', {
    persist: true,
    state: (): EnterpriseStore => ({
        enterprise: {} as EnterpriseStore['enterprise']
    }),
    getters: {

    },
    actions: {
        async getFilesStatistics(): Promise<any> {
            return await window.$axios.get(
                `${env.BACKEND_BASE_URL}${env.VERSION}/enterprise/files/statistics`
            )
        }
    },
});