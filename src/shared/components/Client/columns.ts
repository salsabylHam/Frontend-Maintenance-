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
export type Client = {
    id: number
    logo: number
    name: string
    type: string[]
    description: string
    contact: string
    location: string
    personnel: string
    contracts?: any
    files?: any[]
}

export const columns: ColumnDef<Client>[] = [
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
        accessorKey: 'logo',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'logo' }),
        cell: ({ row }) => {
            const logoFileId = row.original.logo
            const files = row.original.files
            const logoFile = (files as any[] || []).find((file) => file.id == logoFileId)
            return h('div', { class: 'flex items-center space-x-2 font-medium' }, h(Avatar, ()=> [h(AvatarImage, {
                alt: row.original.name,
                src: `${env.BACKEND_BASE_URL}/api/v1/preview?file=${logoFile.name}`
            }), h(AvatarFallback, ()=> row.original.name.slice(0, 2))])
            )
        },
    },
    {
        accessorKey: 'type',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'type' }),
        cell: ({ row }) => {
            const type = row.original.type

            return h('div', { class: 'flex items-center space-x-2 font-medium' }, h(
                BadgeList, {
                badgeList: type.map((val) => ({
                    name: val
                }))
            }
            ))
        },
        filterFn: (row, id, value) => {
            console.log(row, id, value)

            return value.every((v: string) => (row.getValue(id) as string[]).includes(v))
        },
    },

    {
        accessorKey: 'name',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'name' }),
        cell: ({ row }) => {
            return h('div', { class: 'flex items-center space-x-2 font-medium' }, row.getValue('name'))
        },
    },
    {
        accessorKey: 'description',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'description' }),
        cell: ({ row }) => {
            return h('div', { class: 'flex items-center space-x-2 font-medium' }, row.getValue('description'))
        },
    },
    {
        accessorKey: 'contact',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'contact' }),
        cell: ({ row }) => {
            return h('div', { class: 'flex items-center space-x-2 font-medium' }, row.getValue('contact'))
        },
    },
    {
        accessorKey: 'location',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'location' }),
        cell: ({ row }) => {
            return h('div', { class: 'flex items-center space-x-2 font-medium' }, row.getValue('location'))
        },
    },
    {
        accessorKey: 'personnel',
        header: ({ column }) => h(DataTableColumnHeader, { column, title: 'personnel' }),
        cell: ({ row }) => {
            return h('div', { class: 'flex items-center space-x-2 font-medium' }, row.getValue('personnel'))
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const client = row.original

            return h(
                'div',
                { class: 'relative' },
                h(DropdownAction, {
                    client: {
                        id: client.id,
                        name: client.name
                    }
                }),
            )
        },
    },
]
