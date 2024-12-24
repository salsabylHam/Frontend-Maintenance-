<script setup lang="ts">
import { columns } from './columns'
import DataTable from './data-table.vue'
import { storeToRefs } from 'pinia'
import { useContractStore } from '@/core/stores'

const contractStore = useContractStore()
const { contracts } = storeToRefs(contractStore)
contractStore.getContracts({
    relations: ["files"]
})


</script>

<template>
    <DataTable :columns="columns" :data="contracts" />
</template>
