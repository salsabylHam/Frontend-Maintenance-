import { useCookies } from 'vue3-cookies'
import router from '@routers'
import { env } from '@constants'
// import { Alert } from '@/shared/classes/Alert'
import { useToast } from '@components/ui/toast'
import { h } from 'vue'
import { AxiosError } from 'axios'

type ErrorMessageFormat = {
    error: string
    message: string | string[]
    status: number
}

function useAxios(axios: any) {
    const { cookies } = useCookies()
    // const notificationStore = useNotificationStore()
    const { toast } = useToast()
    axios.interceptors.request.use((request: any) => {
        const token = cookies.get(env.TOKEN_KEY.toString())
        const isApiUrl = request.url.startsWith(env.BACKEND_BASE_URL.toString())
        if (token && isApiUrl) {
            request.headers.Authorization = `Bearer ${token}`
        }

        return request
    })

    axios.interceptors.response.use(
        (res: any) => {
            // this is wierd

            // const filename = res.headers?.get('Content-Disposition')?.split('filename=')[1]

            // if (filename) {
            //     return res
            // }

            return res.data
        },
        (error: AxiosError) => {
            // notificationStore.$patch({
            //     alert: {
            //         title: 'Error !',
            //         message: error.response?.data.message ?? error.message,
            //         alertContent: new Alert('error', 'primary'),
            //     } as any,
            // })

            const errorMessages = [
                ...(error.response
                    ? typeof (error.response.data as ErrorMessageFormat).message == 'string'
                        ? [(error.response.data as ErrorMessageFormat).message]
                        : (error.response.data as ErrorMessageFormat).message
                    : [error.message]),
            ]
            toast({
                title: 'Uh oh! Something went wrong.',
                description: h('ul', [
                    errorMessages.map((message, index) => h('li', { key: index, class: 'list-disc' }, message)),
                ]),
                variant: 'destructive',
            })
            if (error.response?.status == 401) {
                cookies.remove(env.TOKEN_KEY)
                router.push('/sign-in')
            }
            throw error
        },
    )
    return axios
}
export default useAxios
