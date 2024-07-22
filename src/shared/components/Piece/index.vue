<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type Piece, columns, randomPieces } from './columns'
import DataTable from './data-table.vue'
import { usePiecesStore } from '@/core/stores/piece.store'
import { storeToRefs } from 'pinia'

const piecesStore = usePiecesStore()
const { pieces } = storeToRefs(piecesStore)
onMounted(async () => {
    // data.value = piecesStore.getPieces({})
    pieces.value = randomPieces
})
</script>

<template>
    <DataTable :columns="columns" :data="pieces" />
</template>
