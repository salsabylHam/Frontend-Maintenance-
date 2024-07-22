import { type VariantProps, cva } from 'class-variance-authority'

export { default as DisplayCard } from './DisplayCard.vue'

export const displayCardVariants = cva('font-sans shadow-none', {
    variants: {
        size: {
            default: 'md:w-64 md:h-36 w-60 h-32',
            xs:'w-52 h-32'
        },
        variant: {
            default: 'bg-secondary',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
})

export type DisplayCardVariants = VariantProps<typeof displayCardVariants>
