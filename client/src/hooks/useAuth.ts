import { useMutation } from '@tanstack/react-query'
import { loginApi, registerApi, logoutApi } from '@/api/auth'
import { useAuthStore } from '@/store/authStore'
import { queryClient } from '@/lib/queryClient'

export function useLogin() {
    const { setAuth } = useAuthStore()

    return useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            setAuth(data.accessToken, data.user)
        },
    })
}

export function useRegister() {
    const { setAuth } = useAuthStore()

    return useMutation({
        mutationFn: registerApi,

        onSuccess: (data) => {
            setAuth(data.accessToken, data.user)
        },
    })
}

export function useLogout() {
    const { clearAuth } = useAuthStore()

    return useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {


            clearAuth()

          
            clearAuth()
            queryClient.clear()
        },
    })
}