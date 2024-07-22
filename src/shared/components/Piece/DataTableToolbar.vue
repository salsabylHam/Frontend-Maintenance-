<script setup lang="ts">
import Button from '@components/ui/button/Button.vue'
import { Icon } from '@iconify/vue'
import Separator from '@components/ui/separator/Separator.vue'
import Search from './DataTableColumnActions/Search.vue'
import { computed, ref } from 'vue'
import { Table } from '@tanstack/vue-table'
import { Piece } from './columns'
import DataTableViewOptions from './DataTableViewOptions.vue'
import Delete from './DataTableColumnActions/Delete.vue'
import Copy from './DataTableColumnActions/Copy.vue'
import Sort from './DataTableColumnActions/Sort.vue'
interface DataTableToolbarProps {
    table: Table<Piece>
    copyKey: string
}

const props = defineProps<DataTableToolbarProps>()
const columnNames: (keyof Piece)[] = ['discription', 'code', 'quantity', 'price'] as const
const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)
const isLoading = ref<Boolean>(false)
</script>

<template>
    <div class="flex justify-center items-center p-2 h-14 space-x-2 bg-secondary rounded-sm">
        <div class="flex justify-center space-x-2 items-center">
            <Button variant="ghost" size="icon">
                <Icon icon="ph:plus" />
            </Button>
            <Button variant="ghost" size="icon">
                <Icon icon="ph:funnel-simple-bold" />
            </Button>
            <Sort :table="props.table" :keys="columnNames" />
        </div>
        <div class="flex flex-grow items-center space-x-2">
            <div class="flex items-center space-x-4">
                <Separator orientation="vertical" class="h-4 bg-secondary-foreground"></Separator>
                <div v-if="props.table.getIsSomeRowsSelected()">
                    <p class="text-xs">{{ props.table.getSelectedRowModel().rows.length }} Selected</p>
                </div>
            </div>
            <Delete :table="props.table" />
            <Copy :table="props.table" copy-key="code" />
            <Button
                v-if="isFiltered"
                variant="ghost"
                class="text-xs h-8 px-2 lg:px-3"
                @click="table.resetColumnFilters()"
            >
                <p>Reset</p>
                <Icon icon="ph:funnel-simple-x" class="ml-2 h-4 w-4" />
            </Button>
            <Button v-if="isLoading" variant="ghost" size="icon">
                <Icon icon="ph:spinner-gap" class="h-5 w-5 animate-loading" />
            </Button>
            <div class="relative flex flex-row-reverse flex-grow h-5 items-center">
                <Search :table="props.table" column="code" />
            </div>
            <DataTableViewOptions :table="props.table" />
        </div>
    </div>
</template>
<style scoped></style>
