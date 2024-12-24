<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { cn } from '@/shared/lib/utils';
import { useVModel } from '@vueuse/core';

interface DetailProps {
    open: Boolean
}

const props = defineProps<DetailProps>()
const emits = defineEmits(['update:open'])
const open = useVModel(props, 'open', emits, {
    passive: true,
});
const height = ref(384)
const isResized = ref(false)

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
// Add event listeners on mount and clean up on unmount
onMounted(async () => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
});

onBeforeUnmount(() => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
});
// Method to start resizing
const startResize = () => {
    isResized.value = true;
};

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
            <slot>

            </slot>
        </div>
    </div>
</template>

<style scoped></style>