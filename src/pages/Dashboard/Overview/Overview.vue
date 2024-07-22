<script setup lang="ts">
import { useDashboardStore } from '@/core/stores'
import Skeleton from '@/shared/components/ui/skeleton/Skeleton.vue'
import { cn } from '@/shared/lib/utils'
import { defineAsyncComponent } from 'vue'

const OverviewConent = defineAsyncComponent(() => import('./Content/content.vue'))
const dashboardStore = useDashboardStore()
</script>
<template>
    <div class="container pt-7 space-y-6">
        <div>
            <h1 class="font-sans text-lg font-bold text-primary">Overview</h1>
        </div>
        <Suspense>
            <div class="flex flex-col justify-center space-y-7">
                <OverviewConent />
            </div>

            <template #fallback>
                <div class="flex flex-col justify-center space-y-7">
                    <div class="flex justify-between">
                        <Skeleton
                            :class="
                                cn('w-52 h-32', dashboardStore.isAnySidebarCollapsed() && 'md:w-64 md:h-36 w-60 h-32')
                            "
                        />

                        <Skeleton
                            :class="
                                cn('w-52 h-32', dashboardStore.isAnySidebarCollapsed() && 'md:w-64 md:h-36 w-60 h-32')
                            "
                        />
                        <Skeleton
                            :class="
                                cn('w-52 h-32', dashboardStore.isAnySidebarCollapsed() && 'md:w-64 md:h-36 w-60 h-32')
                            "
                        />
                        <Skeleton
                            :class="
                                cn('w-52 h-32', dashboardStore.isAnySidebarCollapsed() && 'md:w-64 md:h-36 w-60 h-32')
                            "
                        />
                    </div>
                    <div class="flex justify-between h-fit">
                        <Skeleton
                            :class="cn('w-[29rem] h-80 p-6', dashboardStore.isAnySidebarCollapsed() && '!w-[37rem]')"
                        />

                        <Skeleton
                            :class="
                                cn('w-[29rem] h-80 p-6', dashboardStore.isAnySidebarCollapsed() && '!w-[37rem]')
                            "
                        />
                    </div>
                </div>
            </template>
        </Suspense>
    </div>
</template>
