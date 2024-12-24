<script lang="ts" setup>
import Button from '@components/ui/button/Button.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form'
import Input from '@/shared/components/ui/input/Input.vue'
import { ref } from 'vue'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { cn } from '@/shared/lib/utils'
import Switch from '@/shared/components/ui/switch/Switch.vue'
import Label from '@/shared/components/ui/label/Label.vue'
import Separator from '@/shared/components/ui/separator/Separator.vue'
import { Icon } from '@iconify/vue'
import { useUserStore } from '@stores'
import {type  AuthProviders } from '@/core/stores/user.store'
const formSchema = toTypedSchema(
    z.object({
        code: z.string({ message: 'Code can not be empty.' }).min(3),
        email: z.string().email({ message: 'Email can not be empty!' }),
        password: z.string().min(8, { message: 'Password is too short' }).max(20, { message: 'Password is too long' }),
    }),
)
const userStore = useUserStore()
const loadingEnterpriseAuth = ref<Boolean>(false)
const step = ref<number>(1)
const providers = ref<AuthProviders[]>([])
const form = useForm({
    validationSchema: formSchema,
})

const getAuthTypes = async () => {
    loadingEnterpriseAuth.value = true

    const validation = await form.validate({ mode: 'silent' })
    if ('code' in validation.errors) {
        form.validateField('code')
        return
    }
    const code = form.values.code as string
    userStore
        .getAuthProviders(code)
        .then((data) => {
            providers.value = data
            loadingEnterpriseAuth.value = false
            step.value++
        })
        .catch((e) => {
            console.error('Error')
        })
}

const onSubmit = form.handleSubmit(async (values) => {
    userStore.login({
        enterpriseCode: values.code,
        email: values.email,
        password: values.password,
    })
})
</script>

<template src="./Login.html">
    
</template>

<style scoped>
.trapez {
    transform: skewX(-20deg);
}
.trapez-content {
    transform: skewX(20deg);
}
</style>
