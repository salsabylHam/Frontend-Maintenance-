<script setup lang="ts">
import DataTableFacetedFilter from './DataTableFacetedFilter.vue';
import { Table } from '@tanstack/vue-table';
import { Client } from './columns';
import { useClientStore } from '@/core/stores';
import Button from '../ui/button/Button.vue';
import { Icon } from '@iconify/vue'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@components/ui/popover'
import Separator from '../ui/separator/Separator.vue';
import Badge from '../ui/badge/Badge.vue';

interface FilterProps {
    table: Table<Client>
}
const props = defineProps<FilterProps>()
const clientStore = useClientStore()

</script>

<template>
    <Popover>
        <PopoverTrigger>
            <Button variant="ghost" size="icon">
                <Icon icon="ph:funnel-simple-bold" />
            </Button>
        </PopoverTrigger>
        <PopoverContent class="flex" :align="'start'">
            <DataTableFacetedFilter v-if="table.getColumn('type')" :align="'end'" :column="table.getColumn('type')"
                title="Type" :options="clientStore.types">
                <template #button="{ selectedValues, options }">
                    <Button variant="ghost" class="h-8 flex justify-start w-full border-dashed">
                        <Icon icon="ph:plus-circle" class="mr-2 h-4 w-4" />
                        Type
                        <template v-if="selectedValues.size > 0">
                            <Separator orientation="vertical" class="mx-2 h-4" />
                            <Badge class="rounded-sm px-1 font-normal lg:hidden">
                                {{ selectedValues.size }}
                            </Badge>
                            <div class="hidden space-x-1 lg:flex">
                                <Badge v-if="selectedValues.size > 2" class="rounded-sm px-1 font-normal">
                                    {{ selectedValues.size }} selected
                                </Badge>

                                <template v-else>
                                    <Badge v-for="option in options
                                        .filter((option) => selectedValues.has(option.value))" :key="option.value"
                                        class="rounded-sm px-1 font-normal">
                                        {{ option.label }}
                                    </Badge>
                                </template>
                            </div>
                        </template>
                    </Button>
                </template>
            </DataTableFacetedFilter>

        </PopoverContent>
    </Popover>
</template>