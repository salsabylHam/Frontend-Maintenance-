<script setup lang="ts">
import { env, FILES } from '@/core/constants';
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import Button from '../ui/button/Button.vue';
import { cn } from '@/shared/lib/utils';


interface FilePreviewProps {
    name: string
    fileType?: string
}

const props = defineProps<FilePreviewProps>()
const hide = ref(true)
const metadata = computed(() => {
    var metadata = {
        name: props.name,
        type: props.fileType || '',
        icon: FILES.ICONS(props.fileType || ''),
        src: ''
    }
    if ((FILES.ALLOWED_PREVIEW_TYPES as any).includes(props.fileType)) {
        metadata.src = `${env.BACKEND_BASE_URL}${env.VERSION}/preview?file=${props.name}`
    }
    return metadata
})
</script>

<template>
    <div class="relative w-48 h-28 rounded-sm shadow-md z-0" @mouseover="() => hide = false" @mouseleave="() => hide = true">
        <div :class="cn('w-48 h-28', !hide && 'blur-sm')">
            <img v-if="metadata.src != ''" :src="metadata.src" class="w-48 h-28" alt="">
            <Icon v-else :icon="metadata.icon" class="m-auto w-40 h-24"></Icon>
        </div>
        <div v-show="!hide" class="absolute top-0 right-0 w-48 h-28 z-50 flex justify-between items-center">
            <div class="h-full w-full">
                <Button variant="outline" class="w-full h-full rounded-r-none">
                    <Icon icon="ph:trash" class="text-destructive"></Icon>
                </Button>
            </div>
            <div class="h-full w-full">
                <Button variant="outline" class="w-full h-full rounded-l-none">
                    <Icon icon="ph:eye" class="text-primary"></Icon>
                </Button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>