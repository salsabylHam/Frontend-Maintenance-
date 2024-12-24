<script setup lang="ts">
import { Badge, BadgeVariants } from '@components/ui/badge'

const props = withDefaults(defineProps<{
    badgeList: {
        name: string
        variant?: BadgeVariants
    }[]
}>(), {
    badgeList: () => []
})
</script>

<template>
    <Badge v-for="badge in badgeList" :variant="badge.variant?.variant">
        {{ badge.name }}
    </Badge>
</template>