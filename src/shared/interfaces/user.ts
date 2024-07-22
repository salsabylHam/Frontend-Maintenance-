export interface User {
    id: number
    email: string
    firstName: string
    lastName: string
    picture: any
    phone: string
    phone2?: string
    roleId: number
    enterprise: Enterprise
    teams: any[]
    role: Role
}

export interface Enterprise {
    id: number
    name: string
    address: string
    code: string
}

export interface Role {
    id: number
    label: string
    code: string
    __rolePermissions__: RolePermissions[]
}

export interface RolePermissions {
    id: number
    roleId: number
    permissionId: number
    read: boolean
    create: boolean
    update: boolean
    delete: boolean
    __permission__: Permission
}

export interface Permission {
    id: number
    label: string
    code: string
}
