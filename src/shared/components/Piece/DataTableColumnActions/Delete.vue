<script lang="ts" setup>
import { usePiecesStore } from '@/core/stores/piece.store'
import Button from '@components/ui/button/Button.vue'
import { Icon } from '@iconify/vue'
import { Piece } from '../columns'
import { DeleteProps } from '@/shared/interfaces/table'

const props = defineProps<DeleteProps<Piece>>()

const pieceStore = usePiecesStore()
</script>

<template>
    <Button
        variant="ghost"
        size="icon"
        @click="pieceStore.bulkDeletePieces(props.table.getSelectedRowModel().rows.map((row) => row.original))"
    >
        <Icon icon="ph:trash" class="text-destructive" />
    </Button>
</template>
