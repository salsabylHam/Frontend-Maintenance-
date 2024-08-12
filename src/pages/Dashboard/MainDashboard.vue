<script lang="ts" setup>
import DashboardNavigation from '@/shared/components/DashboardNavigation/DashboardNavigation.vue'
import SideBar from '@/shared/components/SideBar/SideBar.vue'
import NotificationSideBar, {
    type SideBarProps as NotificationSideBarProps,
} from '@/shared/components/NotificationSideBar/NotificationSideBar.vue'
import { DASHBOARD_SIDEBAR_LINKS } from '@constants'
import useUserDropdownMenue from '@/core/composable/useUserdropdownMenue'
import { useDashboardStore } from '@/core/stores/dashboard.store'
import { cn } from '@/shared/lib/utils'
import { useUserStore } from '@/core/stores'
import { User } from '@/shared/interfaces/user'
import Skeleton from '@/shared/components/ui/skeleton/Skeleton.vue'

const dashboardStore = useDashboardStore()
const userStore = useUserStore()
const userDropdownMenue = useUserDropdownMenue(
    // user data
    {
        fullName: `${(userStore.user as User).firstName} ${(userStore.user as User).lastName}`,
    },
    async () => userStore.logout(),
)
const notifications: NotificationSideBarProps['notification'] = [
    {
        message: 'Order number 1503 arrived',
        time: '3 minute ago',
        variant: 'success',
    },
    {
        message: 'Your Have submitted new repair demand',
        time: '1 day ago',
        variant: 'normal',
    },
    {
        message: 'Machine #CRP5 has broken gear',
        time: '1 week ago',
        variant: 'danger',
    },
]
const demands: NotificationSideBarProps['demands'] = [
    {
        username: 'Tom freak',
        message: 'Machine #CRP5 has broken gear',
        time: '1 week ago',
    },
    {
        username: 'Tom freak',
        message: 'Machine #CRP6 has broken gear',
        time: '1 week ago',
    },
    {
        username: 'Tom freak',
        message: 'Machine #CRP56 has broken gear',
        time: '1 week ago',
    },
]
</script>
<template>
    <div class="relative flex h-screen bg-background">
        <SideBar
            :user-dropdown-menue="userDropdownMenue"
            :config="DASHBOARD_SIDEBAR_LINKS"
            :is-sidebar-collapsed="dashboardStore.isLeftSidebarCollapsed"
        />
        <main
            :class="
                cn(
                    'relative flex-1',
                    !dashboardStore.isRightSidebarCollapsed && dashboardStore.isLeftSidebarCollapsed && 'mr-[17%]',
                    !dashboardStore.isRightSidebarCollapsed && !dashboardStore.isLeftSidebarCollapsed && 'mr-[17%] ml-[15%]',
                    !dashboardStore.isLeftSidebarCollapsed && dashboardStore.isRightSidebarCollapsed && 'ml-[15%]',

                )
            "
        >
            <DashboardNavigation
                v-model:is-right-sidebar-collapsed="dashboardStore.isRightSidebarCollapsed"
                v-model:is-left-sidebar-collapsed="dashboardStore.isLeftSidebarCollapsed"
            />
            <router-view />
        </main>
        <NotificationSideBar
            :notification="notifications"
            :demands="demands"
            :is-sidebar-collapsed="dashboardStore.isRightSidebarCollapsed"
        />
    </div>
</template>
