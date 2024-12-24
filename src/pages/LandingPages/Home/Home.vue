<script setup lang="ts">
import Button from '@components/ui/button/Button.vue'
import { Icon } from '@iconify/vue'
import ToggleDarkModeButton from '@components/Buttons/ToggleDarkModeButton.vue';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@components/ui/card"
import Switch from '@components/ui/switch/Switch.vue';
import Separator from '@components/ui/separator/Separator.vue';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@components/ui/sheet'
import { ref } from 'vue';


const mouseButtnHovered = ref(false)

let inActiveTimeout: any = null;
const mouseOver = (event: MouseEvent) => {
    mouseButtnHovered.value = true
    clearTimeout(inActiveTimeout); // clear the timeout
}
const mouseLeave = (event: MouseEvent) => {
    inActiveTimeout = setTimeout(() => {
        mouseButtnHovered.value = false
    }, 80);
}
</script>

<template>
    <div class="relative bg-background z-10 h-screen font-['Inter'] text-foreground !m-0 !p-0">
        <div
            class="absolute -z-10 bottom-0 left-0 right-0 top-0 dark:bg-[linear-gradient(to_right,#2a2a2a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a_1px,transparent_1px)] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]">
        </div>
        <header class="h-24 z-10 flex justify-between items-center p-4 mx-8">
            <div class="flex-1 md:flex-none">
                <div
                    class=" text-foreground hover:!text-primary w-fit cursor-pointer flex flex-row space-x-2 items-center">
                    <RouterLink to="/" class="flex space-x-2">
                        <div class="border rounded-sm shadow-sm p-2 bg-background">
                            <Icon icon="ant-design:thunderbolt-filled" class="text-inherit h-4 w-4"></Icon>
                        </div>
                        <span class=" text-sm tracking-wider text-inherit uppercase font-semibold flex items-center">
                            Factory Bliz
                        </span>
                    </RouterLink>
                </div>
            </div>
            <ul class="hidden md:flex space-x-4 font-medium">
                <li>
                    <RouterLink to="" class="cursor-pointer">
                        Features
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="#pricing" class="cursor-pointer">
                        Pricing
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/" class="cursor-pointer">
                        FAQs
                    </RouterLink>
                </li>
            </ul>
            <div class="flex space-x-2 relative">
                <div class="hidden md:flex space-x-2">
                    <Button variant="outline">
                        <RouterLink :to="{ name: 'login' }">
                            Login
                        </RouterLink>
                    </Button>
                    <Button>
                        <RouterLink to="signup">
                            Sign-up
                        </RouterLink>
                    </Button>
                </div>
                <div class="flex space-x-2">
                    <ToggleDarkModeButton></ToggleDarkModeButton>
                </div>
                <div class="flex lg:hidden">
                    <Sheet>
                        <SheetTrigger as-child>
                            <Button variant="outline">
                                <Icon icon="ph:square-half-fill">

                                </Icon>
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Menue</SheetTitle>
                                <SheetDescription>
                                    Make changes to your profile here. Click save when you're done.
                                </SheetDescription>
                            </SheetHeader>

                            <SheetFooter>
                                <SheetClose as-child>

                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

        </header>

        <section class="h-[calc(100vh-96px)] relative">
            <Button @mouseover="mouseOver" @mouseleave="mouseLeave" :data-active="mouseButtnHovered" variant="ghost"
                class="absolute hover:bg-transparent left-[calc(50%-24px)] data-[active=true]:bottom-16 bottom-12  transform ease-in-out duration-75">
                <RouterLink to="#pricing">

                    <Icon icon="ph:mouse-simple-bold" class="text-5xl">
                    </Icon>
                </RouterLink>
            </Button>
            <div class="absolute z-30 astronate">
            </div>
            <div class="container pt-36 flex flex-col">
                <div class="flex md:ml-36">
                    <h1 class="text-5xl md:text-7xl font-extrabold">
                        <span class="text-6xl md:text-8xl text-primary">
                            Increase
                        </span>
                        productivity
                    </h1>
                </div>
                <h1 class="text-6xl md:text-8xl font-extrabold text-center md:ml-36">
                    <span class="text-5xl md:text-7xl">
                        reduce
                    </span>
                    <span class="text-rose-500">
                        ambiguity.
                    </span>
                </h1>
            </div>


        </section>
        <section class="relative h-fit pb-12 justify-center flex mx-auto flex-col z-10 pt-36">
            <div id="pricing" class="container">
                <h1 class="text-5xl text-white">
                    Pricing
                </h1>
            </div>
            <div class="flex m-12">
                <div class="relative flex space-x-2 text-primary items-center font-semibold justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" class="absolute -left-12 -top-4  rotate-90" width="35"
                        height="70">
                        <g fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                            stroke-miterlimit="10">
                            <path
                                d="M9.22 7.263c-11.097 23.205-5.71 57.354 24 61M1.78 9.232c4.16-1.394 5.768-5.407 9.408-7.495.312 3.188 1.234 9.623 3.367 12.234" />
                        </g>
                    </svg>
                    <Switch class="">
                    </Switch>
                    <span>
                        Monthly / Yearly
                    </span>
                </div>
            </div>
            <div
                class="absolute top-0 z-[-2] h-full w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
            </div>
            <div class="relative container grid grid-cols-3 gap-3">
                <Card class="h-fit shadow-lg w-96">
                    <CardHeader>
                        <CardTitle class="font-bold">Basic plan</CardTitle>
                        <CardDescription>
                            For small teams with essential needs (inventory, scheduling, and basic reports)
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-6">
                        <div class="flex space-x-2">
                            <h1 class="text-6xl font-semibold">
                                $10
                            </h1>
                            <div class="mt-1">
                                <p class="mt-2">
                                    Per user
                                </p>
                                <p>
                                    Per Mounth
                                </p>
                            </div>
                        </div>
                        <Separator></Separator>
                        <div class="flex flex-col space-y-4">
                            <Button class="font-bold">
                                Get Started
                            </Button>
                            <Button variant="outline" class="font-bold">
                                Contact Sales
                            </Button>
                        </div>
                    </CardContent>
                    <CardFooter class="flex-col items-start space-y-3 pb-12">
                        <header class="text-base font-bold">
                            Features:
                        </header>
                        <ul class="text-sm list-disc font-medium container">
                            <li>Access to Inventory Management (basic view and updates)
                            </li>
                            <li>
                                Limited Data Storage (up to 5 GB)
                            </li>
                            <li>
                                Scheduling Maintenance Tasks
                            </li>
                            <li>
                                Basic Reporting (standard templates)
                            </li>
                            <li>
                                Capture and Upload Screenshots
                            </li>
                            <li>
                                Task Assignment and Tracking
                            </li>
                            <li>
                                Basic User Roles and Permissions (limited to 3 roles)
                            </li>
                        </ul>
                    </CardFooter>
                </Card>
                <Card class="h-fit bg-background text-background-foreground border-0 w-96">
                    <CardHeader>
                        <CardTitle class="font-bold text-primary">Busness plan</CardTitle>
                        <CardDescription>
                            For medium-sized teams needing more customization, advanced features, and integrations.
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-6">
                        <div class="flex space-x-2">
                            <h1 class="text-6xl font-semibold">
                                $20
                            </h1>
                            <div class="mt-1">
                                <p class="mt-2">
                                    Per user
                                </p>
                                <p>
                                    Per Mounth
                                </p>
                            </div>
                        </div>
                        <Separator></Separator>
                        <div class="flex flex-col space-y-4">
                            <Button class="font-bold">
                                Get Started
                            </Button>
                            <Button variant="outline" class="font-bold">
                                Contact Sales
                            </Button>
                        </div>
                    </CardContent>
                    <CardFooter class="flex-col items-start space-y-3 pb-12">
                        <header class="text-base font-bold">
                            All Basic Plan Features, plus:
                        </header>
                        <ul class="text-sm list-disc container font-medium">
                            <li>
                                Advanced Inventory Management (search, filter, low-stock alerts)
                            </li>
                            <li>
                                Recurring Maintenance Scheduling
                            </li>
                            <li>
                                Customizable Reporting (custom templates and exports)
                            </li>
                            <li>
                                Unlimited User Roles and Permissions
                            </li>
                            <li>
                                Real-time Notifications (email and in-app)
                            </li>
                            <li>
                                Integration with Third-party Tools (e.g., Google Calendar, Slack)
                            </li>
                            <li>
                                Analytics Dashboard (usage stats, performance metrics)
                            </li>
                        </ul>
                    </CardFooter>
                </Card>
                <Card class="h-fit shadow-lg w-96">
                    <CardHeader>
                        <CardTitle class="font-bold">Enterprise Plan</CardTitle>
                        <CardDescription>
                            For small teams with essential needs (inventory, scheduling, and basic reports)
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-6">
                        <div class="flex space-x-2">
                            <h1 class="text-xl font-semibold">
                                Custom Pricing (depending on team size and requirements)
                            </h1>

                        </div>
                        <Separator></Separator>
                        <div class="flex flex-col space-y-4">
                            <Button class="font-bold">
                                Get Started
                            </Button>
                            <Button variant="outline" class="font-bold">
                                Contact Sales
                            </Button>
                        </div>
                    </CardContent>
                    <CardFooter class="flex-col items-start space-y-3 pb-12">
                        <header class="text-base font-bold">
                            All Professional Plan Features, plus:
                        </header>
                        <ul class="text-sm list-disc font-medium container">
                            <li>Access to Inventory Management (basic view and updates)
                            </li>
                            <li>
                                Limited Data Storage (up to 5 GB)
                            </li>
                            <li>
                                Scheduling Maintenance Tasks
                            </li>
                            <li>
                                Basic Reporting (standard templates)
                            </li>
                            <li>
                                Capture and Upload Screenshots
                            </li>
                            <li>
                                Task Assignment and Tracking
                            </li>
                            <li>
                                Basic User Roles and Permissions (limited to 3 roles)
                            </li>
                        </ul>
                    </CardFooter>
                </Card>
            </div>
        </section>
    </div>
</template>

<style scoped>
.astronate {
    @apply w-[300px] h-[250px] bg-foreground dark:bg-background -z-20 transition-all ease-out duration-300;
    background-image: url('@/assets/img/1_Lloy0YTBSLoN8a3BbcbTig-removebg-preview.png');
    /* Replace 'your-image-path.jpg' with the path to your image */
    background-size: cover;
    /* Make sure the image covers the entire div */
    background-position: center;
    /* Center the image */
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    animation: morph 8s ease-in-out infinite;
}

@keyframes morph {
    0% {
        @apply bottom-24 md:bottom-10 right-10
    }

    50% {
        border-radius: 30% 60% 70% 40% / 70% 40% 30% 50%;
        @apply bottom-28 md:bottom-14 right-24
    }

    100% {
        border-radius: 60% 40% 30% 70% / 70% 30% 70% 40%;
        @apply bottom-24 md:bottom-10 right-10
    }
}
</style>