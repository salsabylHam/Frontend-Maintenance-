import { onMounted, onUnmounted, ref } from 'vue'

function useClickOutside(targetRef: any, callback: () => void) {
    console.log(targetRef.value)
    const listener = (event: MouseEvent) => {
        if (!targetRef.value || targetRef.value.contains(event.target)) {
            return
        }
        callback()
    }

    onMounted(() => {
        document.addEventListener('click', listener)
    })

    onUnmounted(() => {
        document.removeEventListener('click', listener)
    })
}

export default useClickOutside