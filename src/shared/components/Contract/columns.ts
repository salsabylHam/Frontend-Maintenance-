import { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import Checkbox from '../ui/checkbox/Checkbox.vue'
import DropdownAction from './DropdownAction.vue'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import BadgeList from '../BadgeList/BadgeList.vue'
import { env } from '@/core/constants'
import Avatar from '../ui/avatar/Avatar.vue'
import AvatarImage from '../ui/avatar/AvatarImage.vue'
import AvatarFallback from '../ui/avatar/AvatarFallback.vue'
import { Client } from '../Client/columns'
export type Contract = {
    id: number;
    scope: string;
    startDate: string;
    endDate: string;
    payment: string;
    termination_clause: string;
    client: Client;
    files: any;
}

export const columns: ColumnDef<Contract>[] = [
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
    {
        accessorKey: 'payment',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'payment' }),
        cell: ({ row }) => {
            const payment = Number.parseFloat(row.getValue('payment'))
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(payment)
            return h('div', { class: 'flex items-center space-x-2 font-medium' }, formatted)
        },
    },
    {
        accessorKey: 'startDate',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'start' }),
        cell: ({ row }) => {
            const date = new Date(row.getValue('startDate'))
            var options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return h('div', { class: 'flex items-center space-x-2 font-medium' }, date.toLocaleDateString("en-US", options))
        },
    },
    {
        accessorKey: 'endDate',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'end' }),
        cell: ({ row }) => {
            const date = new Date(row.getValue('endDate'))
            var options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return h('div', { class: 'flex items-center space-x-2 font-medium' }, date.toLocaleDateString("en-US", options))
        },
    },
    {
        accessorKey: 'scope',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'scope' }),
        cell: ({ row }) => {
            return h('div', { class: 'flex items-center space-x-2 font-medium' }, row.getValue('scope'))
        },
    },
    {
        accessorKey: 'client',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'client' }),
        cell: ({ row }) => {
            return h('div', { class: 'flex items-center space-x-2 font-medium' }, (row.getValue('client') as any).name)
        },
    },
    {
        accessorKey: 'termination_clause',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'clause' }),
        cell: ({ row }) => {
            return h('div', { class: 'flex items-center space-x-2 font-medium' }, row.getValue('termination_clause'))
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const contract = row.original

            return h(
                'div',
                { class: 'relative' },
                h(DropdownAction, {
                    contract: {
                        id: contract.id,
                        name: contract.termination_clause
                    }
                }),
            )
        },
    },
]
