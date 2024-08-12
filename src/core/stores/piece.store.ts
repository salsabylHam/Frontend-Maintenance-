import { defineStore } from 'pinia'
import { env } from '../constants'
import { Piece } from '@/shared/components/Piece/columns'

export interface PiecesStore {
    pending: Piece[]
    piece: Piece
    pieces: Piece[]
}

export const usePiecesStore = defineStore('pieces', {
    persist: true,
    state: (): PiecesStore => ({
        pending: [] as Piece[],
        piece: {} as Piece,
        pieces: [] as Piece[],
    }),
    actions: {
        async getPieces(params: any) {
            return window.$axios.get(`${env.BACKEND_BASE_URL}/api/v1/piece`, { params }).then((pieces: any) => {
                this.$patch({ pieces: pieces as Piece[] })
                return pieces
            })
        },
        async createPiece(piece: any) {
            return window.$axios.post(`${env.BACKEND_BASE_URL}/api/v1/piece`, piece).then((p: any) => {
                this.$patch({ pieces: [...this.pieces, p as Piece   ] })
            })
        },
        async deletePiece(id: number) {
            return window.$axios.delete(`${env.BACKEND_BASE_URL}/api/v1/piece/${id}`).then(() => {
                this.$patch({ pieces: this.pieces.filter((piece) => piece.id != id) })
            })
        },
        async bulkDeletePieces(pieces: Piece[]) {
            return await Promise.all(pieces.map((piece) => this.deletePiece(piece.id)))
        },
        async updatePiece(id: number, piece: any) {
            return window.$axios.patch(`${env.BACKEND_BASE_URL}/api/v1/piece/${id}`, piece)
        },
    },
})
