<script lang="ts" setup>
import Button from '@/shared/components/ui/button/Button.vue'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip'
import { Icon } from '@iconify/vue'
import { cn } from '@/shared/lib/utils'
import { useRoute } from 'vue-router'

export interface NavigationBtnProps {
    to: string
    label: string
    icon?: string
}
const props = defineProps<NavigationBtnProps>()

// Curent route info
const route = useRoute()

const isRoute = (toRoute: string) => {
    return route.path == toRoute
}
</script>

<template>
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger as-child>
                <RouterLink
                    :to="props.to"
                    :key="props.label"
                    as-child
                    class="w-full h-full flex items-center md:space-x-2"
                    v-slot="{ navigate }"
                >
                    <Button
                        :key="props.label"
                        variant="ghost"
                        @click="navigate"
                        :class="cn('relative md:justify-start justify-center w-full', isRoute(props.to) && 'bg-accent')"
                    >
                        <div class="md:w-6 w-2">
                            <span
                                v-if="isRoute(props.to)"
                                :key="props.label"
                                class="absolute top-1 left-0 h-8 w-2 rounded-sm bg-accent-foreground"
                            >
                            </span>
                        </div>
                        <Icon v-if="props.icon" :key="props.label" :icon="props.icon" class="mr-2 w-6 h-6" />
                        <span class="hidden md:block"> {{ props.label }} </span>
                    </Button>
                </RouterLink>
            </TooltipTrigger>
            <TooltipContent side="right" :side-offset="5"> {{ props.label }} </TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>
