import axios from 'axios'
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/store/authStore'

export const axiosClient = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accessToken = useAuthStore.getState().accessToken

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => Promise.reject(error)
)


let refreshPromise: Promise<string> | null = null

async function refreshAccessToken(): Promise<string> {
    try {
        const response = await axios.post<{ accessToken: string }>(
            'http://localhost:5000/api/auth/refresh',
            null,
            {
                withCredentials: true
            }
        )

        const { accessToken } = response.data

        const currentUser = useAuthStore.getState().user
        if (currentUser) {
            useAuthStore.getState().setAuth(accessToken, currentUser)
        }

        return accessToken
    } finally {
        refreshPromise = null
    }
}

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as AxiosRequestConfig & {
            _retry?: boolean
        } //es la config inicial de mi axiosClient se le dice a ts que confie en que es una config de axios y que puede tenr un valor _retru opcional

        const is401 = error.response?.status === 401// verifico si es 401 unAuthorized
        const isRefreshEndpoint = originalRequest.url?.includes('/auth/refresh')// verifico si es un reeqeust de refresh
        const alreadyRetried = originalRequest._retry// controla que no haya loops infinitos

        if (is401 && !isRefreshEndpoint && !alreadyRetried) { // le damos true a _retry para validar si ya se intento hacer un request, uan vez pasando por aqui este if ya no se cumple una 2da vez entoces ee va al  return Promise.reject(error) final
            originalRequest._retry = true
            try {
                if (!refreshPromise) {
                    refreshPromise =  refreshAccessToken()
                }

                const newToken = await refreshPromise

                if (originalRequest.headers) {
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`
                }

                return axiosClient(originalRequest)
            } catch {
                useAuthStore.getState().clearAuth()
                return Promise.reject(error)
            }
        }

        return Promise.reject(error)
    }
)