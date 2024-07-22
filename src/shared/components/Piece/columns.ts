import { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import Checkbox from '../ui/checkbox/Checkbox.vue'
import DropdownAction from './DropdownAction.vue'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import { title } from 'process'
export type Piece = {
    id: number
    discription: string
    code: string
    quantity: string
    price: number
}
function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomFloat(min: number, max: number, decimals: number = 2): number {
    const factor = Math.pow(10, decimals)
    return Math.round((Math.random() * (max - min) + min) * factor) / factor
}

function getRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

function generateRandomPiece(id: number): Piece {
    return {
        id,
        discription: getRandomString(20),
        code: getRandomString(10),
        quantity: getRandomInt(1, 100).toString(),
        price: getRandomFloat(10, 500),
    }
}

function generateRandomPieces(count: number): Piece[] {
    const pieces: Piece[] = []
    for (let i = 0; i < count; i++) {
        pieces.push(generateRandomPiece(i + 1))
    }
    return pieces
}

export const randomPieces: Piece[] = generateRandomPieces(100) // Generate 100 random pieces
console.log(randomPieces)
export const columns: ColumnDef<Piece>[] = [
    {
        id: 'select',
        header: ({ table }) =>
            h(Checkbox, {
                checked: table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
                'onUpdate:checked': (value) => table.toggleAllPageRowsSelected(!!value),
                ariaLabel: 'Select all',
                class: 'translate-y-0.5 rounded',
            }),
        cell: ({ row }) =>
            h(Checkbox, {
                checked: row.getIsSelected(),
                'onUpdate:checked': (value) => row.toggleSelected(!!value),
                ariaLabel: 'Select row',
                class: 'translate-y-0.5 rounded',
            }),
        enableSorting: false,
        enableHiding: false,
    },
    // {
    //     accessorKey: 'id',
    //     header: () => h('div', { class: 'text-right' }, 'id'),
    //     cell: ({ row }) => {
    //         return h('div', { class: 'text-right font-medium w-20' }, row.getValue('id'))
    //     },
    // },
    {
        accessorKey: 'discription',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'discription' }),
        cell: ({ row }) => {
            return h('div', { class: 'flex items-center space-x-2 font-medium' }, row.getValue('discription'))
        },
    },
    {
        accessorKey: 'code',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'code' }),
        cell: ({ row }) => {
            return h('div', { class: 'flex items-center space-x-2 font-medium' }, row.getValue('code'))
        },
    },
    {
        accessorKey: 'quantity',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'quantity' }),
        cell: ({ row }) => {
            return h('div', { class: 'flex items-center space-x-2 font-medium' }, row.getValue('quantity'))
        },
    },
    {
        accessorKey: 'price',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'price' }),
        cell: ({ row }) => {
            const price = Number.parseFloat(row.getValue('price'))
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(price)

            return h('div', { class: 'flex items-center space-x-2 font-medium' }, formatted)
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const piece = row.original

            return h(
                'div',
                { class: 'relative' },
                h(DropdownAction, {
                    piece,
                }),
            )
        },
    },
]
