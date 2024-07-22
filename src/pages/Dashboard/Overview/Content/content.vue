<script setup lang="ts">
import { useOrderStore, useUserStore, useMachineStore, useDashboardStore, useDemandeStore } from '@/core/stores'
import AreaChart from '@/shared/components/ui/chart-area/AreaChart.vue'
import BarChart from '@/shared/components/ui/chart-bar/BarChart.vue'

import DonutChart from '@/shared/components/ui/chart-donut/DonutChart.vue'
import { cn } from '@/shared/lib/utils'
import DisplayCard from '@components/statistics/DisplayCard/DisplayCard.vue'
import { computed, ref } from 'vue'

type OverviewStats = {
    user: {
        count: number
        rate: number
    }
    order: {
        count: number
        rate: number
    }
    machine: {
        count: number
        rate: number
    }
    demande: {
        count: number
        rate: number
    }
}
const dashboardStore = useDashboardStore()
const userStore = useUserStore()
const orderStore = useOrderStore()
const machineStore = useMachineStore()
const demandeStore = useDemandeStore()

const state = ref<OverviewStats>({
    user: { count: 0, rate: 0 },
    order: { count: 0, rate: 0 },
    machine: { count: 0, rate: 0 },
    demande: { count: 0, rate: 0 },
})

const [userState, orderState, machineState, demandeState] = await Promise.all([
    userStore.getStatisticOverview(),
    orderStore.getStatisticOverview(),
    machineStore.getStatisticOverview(),
    demandeStore.getStatisticOverview(),
])
const userStatistiques = computed(() => {
    return userState.rate
        .map((entry: any) => ({
            'user count': Number(entry.total_users),
            name: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        }))
        .reverse()
})
state.value = {
    user: {
        count: userState.count,
        rate: userState.rate.length == 0 ? 0 : Number(userState.rate[0].change_percentage),
    },
    order: {
        count: orderState.count,
        rate: orderState.rate.length == 0 ? 0 : Number(orderState.rate[0].percentage_change),
    },
    machine: {
        count: machineState.count,
        rate: machineState.rate.length == 0 ? 0 : Number(machineState.rate[0].percentage_change),
    },
    demande: {
        count: demandeState.count,
        rate: demandeState.rate.length == 0 ? 0 : Number(demandeState.rate[0].percentage_change),
    },
}
const ticketsByPriority: { priority: string; count: number }[] = await demandeStore.getStatisticByPriority()
const ticketsByPriorityStatistiques = computed(() => {
    return ticketsByPriority
        .map((entry: any) => ({
            count: Number(entry.count),
            name: entry.priority,
        }))
        .reverse()
})
const trend = (val: number) => {
    if (val > 0) return 'up'
    if (val < 0) return 'down'
    return 'stable'
}
</script>
<template>
    <div class="flex justify-between">
        <DisplayCard
            :size="dashboardStore.isAnySidebarCollapsed() ? 'default' : 'xs'"
            title="Users"
            description="Users sign up rate"
            :content="{ value: state.user.count }"
            :state="Math.abs(state.user.rate)"
            :trend="trend(state.user.rate)"
        />
        <DisplayCard
            :size="dashboardStore.isAnySidebarCollapsed() ? 'default' : 'xs'"
            title="Tikets"
            description="Repaire tickets rate"
            :content="{ value: state.demande.count }"
            :state="Math.abs(state.demande.rate)"
            reverse
            :trend="trend(state.demande.rate)"
        />
        <DisplayCard
            :size="dashboardStore.isAnySidebarCollapsed() ? 'default' : 'xs'"
            title="Orders"
            description="Order rate"
            :content="{ value: state.order.count }"
            :state="Math.abs(state.order.rate)"
            :trend="trend(state.order.rate)"
        />
        <DisplayCard
            :size="dashboardStore.isAnySidebarCollapsed() ? 'default' : 'xs'"
            title="Machines"
            description="Machine down rate"
            :content="{ value: state.machine.count }"
            :state="Math.abs(state.machine.rate)"
            reverse
            :trend="trend(state.machine.rate)"
        />
    </div>
    <div class="flex justify-between h-fit">
        <div
            :class="
                cn(
                    'w-full max-w-[29rem] bg-background border rounded-lg p-6',
                    dashboardStore.isAnySidebarCollapsed() && '!max-w-[37rem]',
                )
            "
        >
            <h2 class="text-secondary-foreground font-bold">User increase rate</h2>
            <AreaChart
                class="w-full h-56 mb-8"
                :show-x-axis="false"
                :data="userStatistiques"
                index="name"
                :rounded-corners="4"
                :categories="['user count']"
            />
        </div>
        <div
            :class="
                cn(
                    'w-full max-w-[29rem] bg-background border rounded-lg p-6',
                    dashboardStore.isAnySidebarCollapsed() && '!max-w-[37rem]',
                )
            "
        >
            <h2 class="text-secondary-foreground font-bold">Demands by priority</h2>
            <DonutChart
                class="w-full h-56 mb-8"
                :showLegend="true"
                :data="ticketsByPriorityStatistiques"
                index="name"
                category="count"
            />
        </div>
    </div>
</template>
