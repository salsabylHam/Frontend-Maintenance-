<script lang="ts" setup>
import { Button } from '@components/ui/button'
import { Icon } from '@iconify/vue'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@components/ui/dialog'
import { Input } from '@components/ui/input'
import { FormField, FormControl, FormLabel, FormItem } from '@components/ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import NumberFieldContent from '@components/ui/number-field/NumberFieldContent.vue'
import NumberFieldDecrement from '@components/ui/number-field/NumberFieldDecrement.vue'
import NumberFieldInput from '@components/ui/number-field/NumberFieldInput.vue'
import NumberFieldIncrement from '@components/ui/number-field/NumberFieldIncrement.vue'
import NumberField from '@components/ui/number-field/NumberField.vue'
import FormMessage from '@components/ui/form/FormMessage.vue'
import { usePiecesStore } from '@/core/stores/piece.store'

const pieceStore = usePiecesStore()

const formSchema = toTypedSchema(
    z.object({
        code: z.string({ message: 'Code can not be empty.' }).min(3),
        discription: z.string({ message: 'Discription can not be empty' }),
        quantity: z.number().min(1),
        price: z.number(),
    }),
)

const { handleSubmit, setFieldValue, values } = useForm({
    validationSchema: formSchema,
    initialValues: {
        price: 0,
        quantity: 1,
    },
})
const onSubmit = handleSubmit(async (values) => {
    const piece = await pieceStore.createPiece(values)
    console.log(piece)
})
</script>
<template>
    <Dialog>
        <DialogTrigger as-child>
            <Button variant="ghost" size="icon" @click="">
                <Icon icon="ph:plus" />
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <form @submit="onSubmit">
                <DialogHeader>
                    <DialogTitle>Create piece</DialogTitle>
                    <DialogDescription> Fill here to create a piece. Click create when you're done.</DialogDescription>
                </DialogHeader>
                <div class="grid gap-4 py-4">
                    <FormField v-slot="{ componentField }" name="code">
                        <FormItem v-auto-animate>
                            <FormLabel>Code</FormLabel>
                            <FormControl>
                                <Input v-bind="componentField" type="text" placeholder="XYZ-123" class="col-span-3" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="discription">
                        <FormItem v-auto-animate>
                            <FormLabel> Discription </FormLabel>
                            <FormControl>
                                <Input v-bind="componentField" type="text" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField name="price">
                        <FormItem v-auto-animate>
                            <FormLabel> price </FormLabel>
                            <NumberField
                                class="gap-2"
                                :min="0"
                                :format-options="{
                                    style: 'currency',
                                    currency: 'EUR',
                                    currencyDisplay: 'code',
                                    currencySign: 'accounting',
                                }"
                                @update:model-value="
                                    (v) => {
                                        if (v) {
                                            setFieldValue('price', v)
                                        } else {
                                            setFieldValue('price', undefined)
                                        }
                                    }
                                "
                            >
                                <NumberFieldContent>
                                    <NumberFieldDecrement />
                                    <FormControl>
                                        <NumberFieldInput />
                                    </FormControl>
                                    <NumberFieldIncrement />
                                </NumberFieldContent>
                            </NumberField>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField name="quantity" v-slot="{ componentField }">
                        <FormItem v-auto-animate>
                            <FormLabel> quantity </FormLabel>
                            <NumberField
                                class="gap-2"
                                :min="1"
                                @update:model-value="
                                    (v) => {
                                        if (v) {
                                            setFieldValue('quantity', v)
                                        } else {
                                            setFieldValue('quantity', undefined)
                                        }
                                    }
                                "
                            >
                                <NumberFieldContent>
                                    <NumberFieldDecrement />
                                    <FormControl>
                                        <NumberFieldInput v-bind="componentField" />
                                    </FormControl>
                                    <NumberFieldIncrement />
                                </NumberFieldContent>
                            </NumberField>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </div>
                <div class="flex py-5" v-if="values.price && values.quantity">
                    <h1 class="flex-grow">Totale:</h1>
                    <div class="min-w-10">{{ values.price * values.quantity }}$</div>
                </div>
                <DialogFooter>
                    <Button type="submit"> Create piece </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>
