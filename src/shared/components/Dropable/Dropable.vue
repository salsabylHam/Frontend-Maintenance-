<script setup lang="ts">
import { cn } from '@/shared/lib/utils';
import { HTMLAttributes, onMounted, onUnmounted, ref } from 'vue';

export type FileUploadProps = {
    class?: HTMLAttributes['class']
};
const props = defineProps<FileUploadProps>()
const emits = defineEmits<{
    (e: 'onDrop', event: DragEvent): void;
}>();
const events = ['dragenter', 'dragover', 'dragleave', 'drop'];

let active = ref(false);

let inActiveTimeout: any = null; // add a variable to hold the timeout key

function onDrop(e: DragEvent) {
    emits('onDrop', e)
    setInactive()
}
function preventDefaults(e: any) {
    e.preventDefault();
}
onMounted(() => {
    events.forEach((eventName) => {
        document.body.addEventListener(eventName, preventDefaults);
    });
});

onUnmounted(() => {
    events.forEach((eventName) => {
        document.body.removeEventListener(eventName, preventDefaults);
    });
});

function setActive() {
    active.value = true;
    clearTimeout(inActiveTimeout); // clear the timeout
}

function setInactive() {
    // wrap it in a `setTimeout`
    inActiveTimeout = setTimeout(() => {
        active.value = false;
    }, 50);
}

</script>

<template>
    <div :data-active="active"
        :class="cn('data-[active=true]:blur-md data-[active=false]:blur-0',props.class)"
        @drop.prevent="onDrop" @dragenter.prevent="setActive" @dragover.prevent="setActive"
        @dragleave.prevent="setInactive">
        <slot></slot>
    </div>
</template>