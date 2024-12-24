<script setup lang="ts">
import { Table } from '@tanstack/vue-table';
import { Client } from '../columns';
import { Icon } from '@iconify/vue'
import Button from '@components/ui/button/Button.vue'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@components/ui/tabs'
import { computed, onMounted, ref } from 'vue';
import { useVModel } from '@vueuse/core';

import { useClientStore, useEnterpriseStore, useFileUploadStore } from '@/core/stores';
import Avatar from '@components/ui/avatar/Avatar.vue';
import AvatarImage from '@components/ui/avatar/AvatarImage.vue';
import AvatarFallback from '@components/ui/avatar/AvatarFallback.vue';
import { env } from '@/core/constants';
import Label from '@components/ui/label/Label.vue';
import BadgeList from '@components/BadgeList/BadgeList.vue';
import Dragable from '../../Dragable/Dragable.vue';
import Files from './Files.vue';

interface DetailProps {
    table: Table<Client>
    open: Boolean
}

const props = defineProps<DetailProps>()
const emits = defineEmits(['update:open'])
const open = useVModel(props, 'open', emits, {
    passive: true,
});
const enterpriseStore = useEnterpriseStore()
const fileStore = useFileUploadStore()
const clientStore = useClientStore()
function uploadFiles(clientId: number) {
    return async (rawFiles: File[]) => {
        try {
            const clientDocuments = await fileStore.uploadFile(rawFiles);

            // Transform uploaded documents to metadata format
            const filesMetadata = clientDocuments.map((file: any) => ({
                type: file.mimetype,
                name: file.key,
                path: file.location,
                size: file.size,
            }));

            const client = clientStore.clients.find((cl) => cl.id === clientId);
            if (client) {
                clientStore.updateClient(clientId, {
                    files: [...(client.files || []), ...filesMetadata],
                });
            }
        } catch (error) {
            console.error('Failed to upload files:', error);
            // Handle error (e.g., show notification to user)
        }
    };
}

const currentSize = ref(0)

// Add event listeners on mount and clean up on unmount
onMounted(async () => {
    currentSize.value = ((await enterpriseStore.getFilesStatistics()).space / (1024 ** 3))

});

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

    <Dragable v-model:open="open">
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
                    <Files v-if="table.getSelectedRowModel().flatRows.length == 1"
                        @upload="uploadFiles(table.getSelectedRowModel().flatRows[0].original.id)"
                        :files="table.getSelectedRowModel().flatRows[0].original.files"></Files>
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
                                    <BadgeList :badge-list="detail.type.map((val: string) => ({
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

    </Dragable>
</template>

<style scoped></style>