<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import { Icon } from '@iconify/vue'
import { cn } from '@lib/utils'
import { Button } from '@components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import type { Client } from './columns'

// Define and destructure props directly
const props = defineProps<{
    column: Column<Client, any>;
    title: string;
}>()

// Define methods for handling column sorting and visibility
const handleSortAscending = () => {
    if (props.column.getIsSorted() === 'asc') {
        props.column.clearSorting()
        return
    }
    props.column.toggleSorting(false)
}

const handleSortDescending = () => {
    if (props.column.getIsSorted() === 'desc') {
        props.column.clearSorting()
        return
    }
    props.column.toggleSorting(true)
}

const handleClearSorting = () => {
    props.column.clearSorting()
}

const handleToggleVisibility = () => {
    props.column.toggleVisibility(false)
}
</script>

<script lang="ts">
export default {
    inheritAttrs: false,
}
</script>

<template>
    <div v-if="props.column.getCanSort()" :class="cn('flex items-center space-x-2', $attrs.class ?? '')">
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="sm" class="-ml-3 h-8 data-[state=open]:bg-accent">
                    <span>{{ props.title }}</span>
                    <Icon icon="ph:arrow-down" v-if="props.column.getIsSorted() === 'desc'" class="ml-2 h-4 w-4" />
                    <Icon icon="ph:arrow-up" v-else-if="props.column.getIsSorted() === 'asc'" class="ml-2 h-4 w-4" />
                    <Icon icon="ph:caret-up-down" v-else class="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" class="w-56 p-2">
                <DropdownMenuItem @click="handleSortAscending">
                    <Icon icon="ph:arrow-up" class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    Sort ascending
                </DropdownMenuItem>
                <DropdownMenuItem @click="handleSortDescending">
                    <Icon icon="ph:arrow-down" class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    Sort descending
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="handleToggleVisibility">
                    <Icon icon="ph:eye" class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    Hide
                </DropdownMenuItem>
                <DropdownMenuItem @click="handleClearSorting">
                    <Icon icon="ph:trash" class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    Clear Sort
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>

    <div v-else :class="$attrs.class">
        {{ props.title }}
    </div>
</template>
