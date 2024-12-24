<script lang="ts" setup>
import { Button } from '@components/ui/button'
import { Icon } from '@iconify/vue'
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@components/ui/drawer'
import { Input } from '@components/ui/input'
import { FormField, FormControl, FormLabel, FormItem } from '@components/ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'

import FormMessage from '@components/ui/form/FormMessage.vue'
import { useClientStore, useFileUploadStore } from '@/core/stores'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { ref } from 'vue'
import FormDescription from '@components/ui/form/FormDescription.vue'
import Upload from '@components/Upload/Upload.vue'
import { ScrollArea } from '@components/ui/scroll-area'
import Textarea from '@components/ui/textarea/Textarea.vue'
import TagsInputInput from '../../ui/tags-input/TagsInputInput.vue'
import TagsInputItemDelete from '../../ui/tags-input/TagsInputItemDelete.vue'
import TagsInputItemText from '../../ui/tags-input/TagsInputItemText.vue'
import TagsInputItem from '../../ui/tags-input/TagsInputItem.vue'
import TagsInput from '../../ui/tags-input/TagsInput.vue'
import FilePreview from '../../Upload/FilePreview.vue'

const clientStore = useClientStore()
const fileStore = useFileUploadStore()
const open = ref(false)
const formSchema = toTypedSchema(
    z.object({
        client: z.number({ message: 'please choose a client.' }),
        payment: z.number({ message: 'payment can not be empty.' }),
        terminationClause: z.string({ message: 'clause is required!' }),
        dateRange: z.object(
            {
                from: z.date(),
                to: z.date(),
            },
            {
                required_error: "Please select a date range",
            }
        ).refine((data) => data.from < data.to, {
            path: ["dateRange"],
            message: "From date must be before to date",
        }),
        scope: z.string({ message: 'scope is required!' }),
        files: z.array(
            z
                .instanceof(File)
        )
            .min(1, 'At least 1 file is required')
            .superRefine(
                (files, ctx) => {
                    files.forEach((file) => {
                        if (file.size > 2 * 1024 * 1024)
                            ctx.addIssue({
                                code: z.ZodIssueCode.custom,
                                message: `${file.name}: File size must be less than 2MB`
                            })

                    })

                },
            ).optional()
    }),
)

const { handleSubmit } = useForm({
    validationSchema: formSchema,
    initialValues: {
        type: []
    }
})

const onSubmit = handleSubmit(async (values) => {
    const { logo, files, ...clientDetail } = values
    const [logoFile, cilentDocuments] = await Promise.all([
        fileStore.uploadFile(logo),
        fileStore.uploadFile(files)
    ])
    console.log(logo, cilentDocuments)
    let newFiles: any[] = []
    cilentDocuments.map((file: any) => { newFiles.push({ name: file.key, path: file.location }) })
    await clientStore.createClient({
        ...clientDetail,
        logo: {
            name: logoFile[0].key,
            path: logoFile[0].location
        },
        files: newFiles
    })
    open.value = false
})

</script>
<template>
    <Drawer v-model:open="open">
        <DrawerTrigger as-child>
            <Button variant="ghost" size="icon">
                <Icon icon="ph:plus" />
            </Button>
        </DrawerTrigger>
        <DrawerContent>

            <div class="mx-auto w-full max-w-[90vw]">
                <form @submit="onSubmit">
                    <ScrollArea class="w-full h-screen">
                        <DrawerHeader>
                            <DrawerTitle>Add Client</DrawerTitle>
                            <DrawerDescription>
                                Fill here to add new client. Click add when you are done.</DrawerDescription>
                        </DrawerHeader>
                        <div class="grid grid-cols-2 !z-[53] gap-4 py-4 mx-4">
                            <FormField v-slot="{ componentField }" name="name">
                                <FormItem v-auto-animate>
                                    <FormLabel>Name</FormLabel>
                                    <FormDescription>
                                        Enter Business Name.
                                    </FormDescription>
                                    <FormControl>
                                        <Input v-bind="componentField" type="text" placeholder="Datuim"
                                            class="col-span-3" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                            <FormField v-slot="{ componentField }" name="personnel">
                                <FormItem v-auto-animate>
                                    <FormLabel> Personnel </FormLabel>
                                    <FormDescription>
                                        Enter the name of client.
                                    </FormDescription>
                                    <FormControl>
                                        <Input v-bind="componentField" type="text" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                            <FormField v-slot="{ componentField }" name="description">
                                <FormItem v-auto-animate>
                                    <FormLabel> Business Description </FormLabel>
                                    <FormDescription>
                                        Enter Business Description.
                                    </FormDescription>
                                    <FormControl>
                                        <Textarea
                                            placeholder="A Start-up with diverse offers such as Devops consulting..."
                                            class="resize-none h-28" v-bind="componentField" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                            <FormField v-slot="{ value, setValue, setErrors }" name="logo">
                                <FormItem v-auto-animate>
                                    <FormLabel>Business Logo</FormLabel>
                                    <FormDescription>
                                        Enter Business Logo.
                                    </FormDescription>
                                    <FormControl>
                                        <Upload size="sm" :model-value="value" @update:model-value="(val) => {
                                            setValue(val, true)
                                        }" @set-errors="setErrors">
                                            <template #default>
                                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg aria-hidden="true" class="w-8 h-8 mb-3 text-gray-400"
                                                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                                                        </path>
                                                    </svg>
                                                    <p class="mb-2 text-sm text-gray-500 "><span
                                                            class="font-semibold">Click
                                                            to upload</span>
                                                        or drag and drop</p>
                                                    <p class="text-xs text-gray-500 ">SVG, PNG, JPG or GIF (MAX.
                                                        800x400px)
                                                    </p>
                                                </div>
                                            </template>
                                            <template #FilePreview="{ fileList, onDeleteFile }">
                                                <FilePreview :file-list="fileList" @delete="onDeleteFile">
                                                </FilePreview>
                                            </template>
                                        </Upload>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                            <FormField v-slot="{ value, setValue }" name="type">
                                <FormItem v-auto-animate>
                                    <FormLabel> Business Type </FormLabel>
                                    <FormDescription>
                                        Enter Business Type.
                                    </FormDescription>
                                    <FormControl>
                                        <TagsInput :model-value="value"
                                            @update:model-value="(val) => { setValue(val) }">
                                            <TagsInputItem v-for="item in value" :key="item" :value="item">
                                                <TagsInputItemText />
                                                <TagsInputItemDelete />
                                            </TagsInputItem>
                                            <TagsInputInput placeholder="type..." />
                                        </TagsInput>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                            <FormField v-slot="{ componentField }" name="contact">
                                <FormItem v-auto-animate>
                                    <FormLabel> Contact</FormLabel>
                                    <FormDescription>
                                        Enter Contact Information.
                                    </FormDescription>
                                    <FormControl>
                                        <Input v-bind="componentField" type="text" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                            <FormField v-slot="{ componentField }" name="location">
                                <FormItem v-auto-animate>
                                    <FormLabel> Location </FormLabel>
                                    <FormDescription>
                                        Enter your Location.
                                    </FormDescription>
                                    <FormControl>
                                        <Input v-bind="componentField" type="text" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                            <FormField v-slot="{ value, setValue, setErrors }" name="files">
                                <FormItem v-auto-animate>
                                    <FormLabel> Files </FormLabel>
                                    <FormDescription>
                                        Upload your files.
                                    </FormDescription>
                                    <FormControl>
                                        <Upload size="base" multiple :model-value="value" @update:model-value="(val) => {
                                            setValue(val, true)

                                        }" @set-errors="setErrors">
                                            <template #default>
                                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400"
                                                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                                                        </path>
                                                    </svg>
                                                    <p class="mb-2 text-sm text-gray-500 "><span
                                                            class="font-semibold">Click
                                                            to upload</span>
                                                        or drag and drop</p>
                                                    <p class="text-xs text-gray-500 ">SVG, PNG, JPG or GIF (MAX.
                                                        800x400px)
                                                    </p>
                                                </div>
                                            </template>
                                            <template #FilePreview="{ fileList, onDeleteFile }">
                                                <FilePreview :file-list="fileList" @delete="onDeleteFile">
                                                </FilePreview>
                                            </template>
                                        </Upload>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                        </div>
                        <DrawerFooter>
                            <Button type="submit"> Add Client </Button>
                        </DrawerFooter>
                    </ScrollArea>
                </form>
            </div>

        </DrawerContent>
    </Drawer>
</template>
