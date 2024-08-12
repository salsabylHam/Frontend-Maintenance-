import { type SideBarProps } from '@/shared/components/SideBar/SideBar.vue'

const sidebarNavigation: SideBarProps['config'] = [
    {
        title: 'Dashboards',
        navigations: [
            {
                type: 'button',
                label: 'Overview',
                icon: 'ph:chart-pie-slice-duotone',
                to: '/main/overview',
            },
            {
                type: 'dropdown',
                label: 'Stocks',
                // to: 'Stockes',
                icon: 'ph:dropbox-logo-fill',
                links: [
                    {
                        label: 'Pices',
                        to: '/main/stocks/pieces',
                        icon: 'ph:screwdriver-duotone',
                    },
                    {
                        label: 'Machines',
                        to: '/main/stocks/machines',
                        icon: 'ph:crane',
                    },
                    {
                        label: 'Order',
                        to: '/main/stocks/home',
                        icon: 'ph:shopping-cart',
                    },
                ],
            },
        ],
    },
]
export default sidebarNavigation
