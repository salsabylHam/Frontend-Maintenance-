<script setup lang="ts">
import { columns } from './columns'
import DataTable from './data-table.vue'
import { storeToRefs } from 'pinia'
import { useClientStore } from '@/core/stores'

const clientStore = useClientStore()
const { clients } = storeToRefs(clientStore)
clientStore.getClients({
    relations: ["files"]
})


</script>

<template>
    <DataTable :columns="columns" :data="clients" />
</template>
