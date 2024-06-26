import { defineStore } from 'pinia'

export interface DashboardStore {
    isLeftSidebarCollapsed: boolean
    isRightSidebarCollapsed: boolean
}

export const useDashboardStore = defineStore('dashboard', {
    state: (): DashboardStore => ({
        isLeftSidebarCollapsed: false,
        isRightSidebarCollapsed: false,
    }),
    actions: {
        isAnySidebarCollapsed() {
            return this.isLeftSidebarCollapsed || this.isRightSidebarCollapsed
        },
        isAllSidebarCollapsed() {
            return this.isLeftSidebarCollapsed && this.isRightSidebarCollapsed
        },
    },
    persist: true,
})
