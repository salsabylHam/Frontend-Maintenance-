<script lang="ts" setup>
import { useClientStore } from '@/core/stores'
import Button from '@components/ui/button/Button.vue'
import { Icon } from '@iconify/vue'
import { Client } from '../columns'
import { DeleteProps } from '@/shared/interfaces/table'

const props = defineProps<DeleteProps<Client>>()

const clientStore = useClientStore()
</script>

<template>
    <Button
        variant="ghost"
        size="icon"
        @click="clientStore.bulkDeleteClients(props.table.getSelectedRowModel().rows.map((row) => row.original))"
    >
        <Icon icon="ph:trash" class="text-destructive" />
    </Button>
</template>
