<script lang="ts" setup>
import Button from '@components/ui/button/Button.vue'
import { useField, useForm } from 'vee-validate'
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
import { AuthProviders } from '@/core/stores/user.store'
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

<template>
    <div class="flex col-span-3 md:col-span-1 flex-col px-12 py-12 w-full h-full bg-background font-['Inter']">
        <div class="flex flex-grow flex-col space-y-12">
            <div class="text-foreground hover:!text-primary w-fit cursor-pointer flex flex-row space-x-2 items-center">
                <RouterLink to="/">
                    <div class="border rounded-sm shadow-sm p-2 bg-background">
                        <Icon icon="ant-design:thunderbolt-filled" class="text-inherit h-4 w-4"></Icon>
                    </div>
                </RouterLink>
                <span class="text-sm tracking-wider text-inherit uppercase font-semibold flex items-center">
                    Factory Bliz
                </span>
            </div>
            <main class="flex flex-col space-y-6">
                <h1 class="font-semibold text-lg">Nice to see you again</h1>
                <form class="text-base" @submit="onSubmit">
                    <div :class="cn('space-y-4', step > 1 && 'hidden')" v-auto-animate>
                        <FormField v-slot="{ componentField }" name="code">
                            <FormItem v-auto-animate>
                                <FormLabel>Enterprise Code</FormLabel>
                                <FormControl>
                                    <Input type="string" placeholder="Datuim-sass" v-bind="componentField" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <Button class="w-full" @click="getAuthTypes" type="button" :disabled="loadingEnterpriseAuth">
                            <Icon
                                icon="ph:spinner-gap-light"
                                v-if="loadingEnterpriseAuth"
                                class="w-6 h-6 mr-2 animate-spin repeat-infinite ease-linear duration-700"
                            />
                            {{ loadingEnterpriseAuth ? 'Loading...' : 'Next' }}
                        </Button>
                    </div>
                    <div :class="cn('space-y-4', step <= 1 && 'hidden')" v-auto-animate>
                        <FormField v-slot="{ componentField }" name="email">
                            <FormItem v-auto-animate>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="example@example.com" v-bind="componentField" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="password">
                            <FormItem v-auto-animate>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="******" v-bind="componentField" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <div class="w-full justify-between flex space-x-4">
                            <div class="flex items-center space-x-2">
                                <Switch id="remember-me" />
                                <Label for="remember-me" class="text-xs font-normal">Remember me</Label>
                            </div>
                            <div>
                                <RouterLink to="/" class="text-xs text-primary hover:text-primary/60">
                                    Forgot password?
                                </RouterLink>
                            </div>
                        </div>

                        <div class="w-full py-4 justify-center flex space-x-4">
                            <Button
                                variant="secondary"
                                class="w-full"
                                @click="
                                    () => {
                                        step--
                                    }
                                "
                                type="button"
                            >
                                Previews
                            </Button>

                            <Button type="submit" class="w-full"> Login </Button>
                        </div>
                    </div>
                </form>
                <Separator />

                <span class="text-xs">
                    Do you have an account?
                    <RouterLink to="/" class="text-primary hover:text-primary/60"> Sign up now </RouterLink>
                </span>
                <div class="flex-grow w-full flex flex-col">
                    <Button
                        variant="outline"
                        v-for="provider in providers"
                        @click="userStore.loginWithProvider(provider.id, provider.provider)"
                    >
                        Or login with {{ provider.name }}
                    </Button>
                </div>
            </main>
        </div>

        <div class="flex justify-between items-center w-full">
            <RouterLink to="/" class="flex space-x-1 items-center text-xs my-auto">
                <img class="h-4 w-5" src="@/assets/img/DATIUM-02.png" />
                <span> Datuim-sass </span>
            </RouterLink>
            <span class="text-xs">© Datuim-sass 2021</span>
        </div>
    </div>
</template>

<style scoped>
.trapez {
    transform: skewX(-20deg);
}
.trapez-content {
    transform: skewX(20deg);
}
</style>
