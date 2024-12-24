<script setup lang="ts">
import { computed } from 'vue';
import ScrollArea from '../../ui/scroll-area/ScrollArea.vue';
import FilePreview from '../../FilePreview/FilePreview.vue';
import Button from '../../ui/button/Button.vue';
import Dropable from '../../Dropable/Dropable.vue';
import Input from '../../ui/input/Input.vue';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import FormMessage from '../../ui/form/FormMessage.vue';
import FormControl from '../../ui/form/FormControl.vue';
import FormItem from '../../ui/form/FormItem.vue';
import { FormField } from '../../ui/form';
import { vAutoAnimate } from '@formkit/auto-animate/vue'

interface FilesProps {
    files: any
}

const props = defineProps<FilesProps>()

const emits = defineEmits<{
    upload: [File[]]
}>()

const formSchema = toTypedSchema(
    z.object({
        files: z.array(
            z
                .instanceof(File), { message: 'At least 1 file is required' }
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
            )
    }),
)

const { handleSubmit } = useForm({
    validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (value) => {
    emits('upload', value.files)
})

function formatBytes(bytes: number) {
    var marker = 1024; // Change to 1000 if required
    var decimal = 3; // Change as required
    var kiloBytes = marker; // One Kilobyte is 1024 bytes
    var megaBytes = marker * marker; // One MB is 1024 KB
    var gigaBytes = marker * marker * marker; // One GB is 1024 MB

    // return bytes if less than a KB
    if (bytes < kiloBytes) return bytes + " Bytes";
    // return KB if less than a MB
    else if (bytes < megaBytes) return (bytes / kiloBytes).toFixed(decimal) + " KB";
    // return MB if less than a GB
    else if (bytes < gigaBytes) return (bytes / megaBytes).toFixed(decimal) + " MB";
    // return GB if less than a TB
    else return (bytes / gigaBytes).toFixed(decimal) + " GB";
}

const fileSize = computed(() => {
    let size = 0;
    (props.files || []).forEach((file: any) => {
        size += file.size
    });
    return formatBytes(size)
})
async function onDrop(e: DragEvent) {
    const rawFiles = e.dataTransfer != null ? e.dataTransfer.files : [];
    const filesArray = Array.from(rawFiles);
    emits('upload', filesArray)
}
</script>

<template>
    <div class="flex flex-col space-y-4">
        <div class="flex justify-end items-center gap-4 ">
            <div class="flex">
                <h1 class="text-base font-normal text-muted-foreground">
                    Size :
                </h1>
            </div>
            <div>
                <span class="text-sm text-muted-foreground">
                    {{ fileSize }}
                </span>
            </div>
        </div>
        <div class="flex space-x-4">
            <ScrollArea class="relative border shadow-inner flex-grow h-56">
                <Dropable class="w-full min-h-56 h-full" @on-drop="onDrop">
                    <div class="flex flex-row gap-4 flex-wrap py-4 container">
                        <FilePreview v-for="file in files" :name="file.name" :fileType="file.type">
                        </FilePreview>
                    </div>
                </Dropable>
            </ScrollArea>
            <div>
                <form @submit.prevent="onSubmit">
                    <Button type="submit" @click="() => {
                        $refs.files?.$el.click()
                    }">
                        Upload
                    </Button>
                    <FormField v-slot="{ handleChange }" name="files">
                        <FormItem v-auto-animate>
                            <FormControl>
                                <Input ref="files" @change="handleChange" multiple type="file" class="hidden" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </form>
            </div>
        </div>
    </div>
</template>