import { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import Checkbox from '../ui/checkbox/Checkbox.vue'
import DropdownAction from './DropdownAction.vue'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
export type Piece = {
    id: number
    discription: string
    code: string
    quantity: string
    price: number
}

export const columns: ColumnDef<Piece>[] = [
    {
        id: 'select',
        header: ({ table }) =>
            h(Checkbox, {
                checked: table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() ),
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
