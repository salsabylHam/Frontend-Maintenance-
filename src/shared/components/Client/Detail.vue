<script setup lang="ts">
import { Table } from '@tanstack/vue-table';
import { Client } from './columns';
import { Icon } from '@iconify/vue'
import Button from '../ui/button/Button.vue'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@components/ui/tabs'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { cn } from '@/shared/lib/utils';
import { useVModel } from '@vueuse/core';
import FilePreview from '../FilePreview/FilePreview.vue';
import { ScrollArea } from '@components/ui/scroll-area'
import { Progress } from '@components/ui/progress'
import { useEnterpriseStore } from '@/core/stores';
import Avatar from '../ui/avatar/Avatar.vue';
import AvatarImage from '../ui/avatar/AvatarImage.vue';
import AvatarFallback from '../ui/avatar/AvatarFallback.vue';
import { env } from '@/core/constants';
import Label from '../ui/label/Label.vue';
import BadgeList from '../BadgeList/BadgeList.vue';

interface DetailProps {
    table: Table<Client>
    open: Boolean
}

const props = defineProps<DetailProps>()
const emits = defineEmits(['update:open'])
const open = useVModel(props, 'open', emits, {
    passive: true,
});
const height = ref(384)
const isResized = ref(false)
const enterpriseStore = useEnterpriseStore()

const handleMouseMove = (e: MouseEvent) => {
    if (!isResized.value) return;
    var newHeight = height.value - e.movementY;
    if (newHeight > 384) {
        height.value = 384
        return
    }
    if (newHeight < 50) {
        emits('update:open', false)
        height.value = 384
        return
    }
    height.value -= e.movementY;
};

// Function to handle mouseup to stop resizing
const handleMouseUp = () => {
    isResized.value = false;
};
const currentSize = ref(0)

// Add event listeners on mount and clean up on unmount
onMounted(async () => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    currentSize.value = ((await enterpriseStore.getFilesStatistics()).space / (1024 ** 3))

});

onBeforeUnmount(() => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
});
// Method to start resizing
const startResize = () => {
    isResized.value = true;
};
const detail = computed(() => {
    if (props.table.getSelectedRowModel().flatRows.length != 1) {
        return undefined    
    }
    const client = props.table.getSelectedRowModel().flatRows[0].original
    const logoFileId = client.logo
    const files = client.files
    const logoFile = (files as any[] || []).find((file) => file.id == logoFileId)
    return {
        ...client,
        logo: {
            src: `${env.BACKEND_BASE_URL}${env.VERSION}/preview?file=${logoFile.name}`,
            fallback: props.table.getSelectedRowModel().flatRows[0].original.name.slice(0, 2)
        }
    }
})
</script>


<template>
    <div v-if="open" :class="cn('bg-background flex flex-col overflow-hidden w-full z-10 absolute left-0 bottom-0')"
        :style="{
            height: `${height / 16}rem`
        }">
        <div class="cursor-row-resize h-3 py-1 bg-border flex flex-col items-center justify-center"
            @mousedown="startResize">
            <div class="w-4 border mb-1 border-black">
            </div>
            <div class="w-4 border border-black">
            </div>
        </div>
        <div class="flex h-full w-full container py-4">
            <Tabs default-value="files" class="w-full h-fit">
                <div class="flex h-fit w-full">
                    <TabsList class="grid w-full bg-muted h-fit grid-cols-3">
                        <TabsTrigger value="files"
                            class="text-muted-foreground bg-muted data-[state=active]:text-primary-foreground data-[state=active]:shadow-none data-[state=active]:bg-primary">
                            <Icon icon="ph:folder-open-duotone" class="mr-2"></Icon>
                            Files
                        </TabsTrigger>
                        <TabsTrigger value="details"
                            class="text-muted-foreground bg-muted data-[state=active]:text-primary-foreground data-[state=active]:shadow-none data-[state=active]:bg-primary">
                            <Icon class="mr-2" icon="ph:info-fill"></Icon>
                            Details
                        </TabsTrigger>
                        <TabsTrigger value="contract"
                            class="text-muted-foreground bg-muted data-[state=active]:text-primary-foreground data-[state=active]:shadow-none data-[state=active]:bg-primary">
                            <Icon class="mr-2" icon="ph:suitcase-simple-duotone"></Icon>
                            Contract
                        </TabsTrigger>
                    </TabsList>
                    <div class="flex-grow h-fit w-full flex flex-row-reverse">
                        <Button variant="ghost" size="sm" class="hover:bg-transparent" @click="() => open = false">
                            <Icon icon="ph:arrow-square-out-duotone"></Icon>
                        </Button>
                    </div>
                </div>
                <TabsContent value="files">
                    <div class="flex flex-col space-y-4">
                        <div class="flex justify-end items-center gap-4 ">
                            <div class="flex">
                                <h1 class="text-base font-normal text-muted-foreground">
                                    Size :
                                </h1>
                            </div>
                            <div>
                                <Progress class="w-80" :model-value="currentSize" />
                            </div>
                            <div>
                                <span class="text-sm text-muted-foreground">
                                    {{ currentSize.toFixed(3) }} / 100 Gb
                                </span>
                            </div>
                        </div>
                        <div class="flex space-x-4">
                            <ScrollArea class="border shadow-inner flex-grow h-56"
                                v-if="table.getSelectedRowModel().flatRows.length == 1">
                                <div class="flex flex-row gap-4 flex-wrap my-4 container">
                                    <FilePreview v-for="file in table.getSelectedRowModel().flatRows[0].original.files"
                                        :name="file.name" :fileType="file.type">
                                    </FilePreview>
                                </div>
                            </ScrollArea>
                            <div>
                                <form @submit.prevent="(e)=>{}">
                                    <Button>
                                        Upload
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent class="h-full" value="details">
                    <div class="flex h-48 space-x-8 flex-row my-8" v-if="detail">
                        <div class="flex items-center justify-center flex-col h-full space-y-2">
                            <Avatar size="base" class="border">
                                <AvatarImage :src="detail.logo.src || ''" />
                                <AvatarFallback>
                                    {{ detail.logo.fallback }}
                                </AvatarFallback>
                            </Avatar>
                            <Label class="text-ellipsis overflow-hidden text-nowrap max-w-24" as="h1">
                                {{ detail.name }} aaaaa
                            </Label>
                        </div>
                        <div class="grid grid-cols-3 w-full">
                            <div>
                                <p>
                                    <Label>
                                        Descitption :
                                    </Label>
                                    {{
                                        detail.description
                                    }}
                                </p>
                            </div>
                            <div>
                                <p>
                                    <Label>
                                        Contact :
                                    </Label>
                                    {{
                                        detail.contact
                                    }}
                                </p>
                            </div>
                            <div>
                                <p>
                                    <Label>
                                        Location :
                                    </Label>
                                    {{
                                        detail.location
                                    }}
                                </p>
                            </div>
                            <div>
                                <p>
                                    <Label>
                                        Contact point :
                                    </Label>
                                    {{
                                        detail.personnel
                                    }}
                                </p>
                            </div>
                            <div>
                                <p>
                                    <Label>
                                        Type :
                                    </Label>
                                    <BadgeList :badge-list="detail.type.map((val) => ({
                                        name: val
                                    }))">
                                    </BadgeList>
                                </p>
                            </div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="contract">

                </TabsContent>
            </Tabs>
        </div>
    </div>
</template>

<style scoped></style>