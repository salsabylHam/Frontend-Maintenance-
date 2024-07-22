<script lang="ts" setup>
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'
import { Icon } from '@iconify/vue'
import { type DisplayCardVariants, displayCardVariants } from '.'
import { HTMLAttributes } from 'vue'
import CardDescription from '../../ui/card/CardDescription.vue'

export type DisplayCardProps = {
    title: string
    variant?: DisplayCardVariants['variant']
    class?: HTMLAttributes['class']
    size?: DisplayCardVariants['size']
    reverse?: boolean
    description?: string
    content: {
        value: number
        formatter?: (val: number) => string
    }
} & (
    | {
          state: number
          formatter?: (val: number) => string
          trend: 'up' | 'down' | 'stable'
      }
    | {}
)
const props = defineProps<DisplayCardProps>()
const trendVariant = {
    up: {
        color: props.reverse ? 'text-rose-600' : 'text-green-400',
        formatter: (state: number) => {
            return `+${state.toLocaleString()}%`
        },
        icon: 'ph:trend-up-duotone',
    },
    down: {
        color: props.reverse ? 'text-green-400' : 'text-rose-600',
        formatter: (state: number) => {
            return `-${state.toLocaleString()}%`
        },
        icon: 'ph:trend-down-duotone',
    },
    stable: {
        color: 'text-secondary-foreground',
        formatter: (state: number) => {
            return `${state.toLocaleString()}%`
        },
    },
}
</script>

<template>
    <Card :class="cn(displayCardVariants({ variant, size }), props.class)">
        <CardHeader :class="{ 'pb-2': props.description ? true : false }">
            <CardTitle class="font-sans tracking-wide font-semibold text-sm md:text-base">{{ props.title }}</CardTitle>
            <CardDescription class="text-xs">{{ props.description }}</CardDescription>
        </CardHeader>
        <CardContent>
            <div class="flex flex-row items-center justify-between">
                <span
                    class="font-['Rubik'] tracking-wide md:font-medium font-normal"
                    :class="{
                        'text-2xl md:text-3xl': size == 'default',
                        'text-lg md:text-xl': size == 'xs',
                    }"
                >
                    {{
                        props.content.formatter
                            ? props.content.formatter(props.content.value)
                            : new Intl.NumberFormat().format(props.content.value)
                    }}
                </span>
                <span
                    v-if="'trend' in props && props.trend"
                    :class="
                        cn(
                            'flex space-x-2 font-[\'Rubik\'] tracking-wide font-light persenta',
                            trendVariant[props.trend].color,
                            size == 'default' ? 'md:text-sm text-xs' : '',
                            size == 'xs' ? 'text-xs' : '',
                        )
                    "
                >
                    <span>
                        {{
                            props.formatter
                                ? props.formatter(props.state)
                                : trendVariant[props.trend].formatter(props.state)
                        }}
                    </span>
                    <Icon v-if="props.trend != 'stable'" :icon="trendVariant[props.trend].icon"></Icon>
                </span>
            </div>
        </CardContent>
    </Card>
</template>
