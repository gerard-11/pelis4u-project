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

// ---- Register ----

export function useRegister() {
    const { setAuth } = useAuthStore()

    return useMutation({
        mutationFn: registerApi,

        onSuccess: (data) => {
            // Igual que login — el backend registra y devuelve el token listo
            setAuth(data.accessToken, data.user)
        },
    })
}

export function useLogout() {
    const { clearAuth } = useAuthStore()

    return useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            // Limpiamos el store — el usuario ya no está autenticado
            clearAuth()

            // Limpiamos TODO el caché de TanStack Query.
            // Importante: datos como la watchlist o el perfil son privados.
            // Si no los limpiamos, el próximo usuario que inicie sesión
            // en el mismo navegador podría ver datos del anterior.
            queryClient.clear()
        },
    })
}