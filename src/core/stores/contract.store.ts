import { defineStore } from 'pinia';
import { env } from '../constants';
import { Contract } from '@/shared/components/Contract/columns';

export interface ContractStore {
    pending: Contract[]
    contracts: Contract[]
}

export const useContractStore = defineStore('contract', {
    persist: true,
    state: (): ContractStore => ({
        pending: [],
        contracts: [],
    }),
    getters: {},
    actions: {
        async getContracts(params: any) {
            return window.$axios
                .get(`${env.BACKEND_BASE_URL}${env.VERSION}/contracts`, { params })
                .then((contracts: any) => {
                    this.$patch({ contracts });
                    return contracts;
                });
        },
        async createContract(contract: any) {
            return window.$axios.post(`${env.BACKEND_BASE_URL}${env.VERSION}/contracts`, contract);
        },
        async deleteContract(id: number) {
            return window.$axios.delete(`${env.BACKEND_BASE_URL}${env.VERSION}/contracts/${id}`);
        },
        async updateContract(id: number, contract: any) {
            return window.$axios.patch(
                `${env.BACKEND_BASE_URL}${env.VERSION}/contracts/${id}`,
                contract,
            );
        },
    },
});
