import { axiosClient } from '@/lib/axiosClient'
import type { AuthResponse, LoginCredentials, RegisterCredentials } from '@/types'

export async function loginApi(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await axiosClient.post<AuthResponse>('/api/auth/login', credentials)
    return data
}

export async function registerApi(credentials: RegisterCredentials): Promise<AuthResponse> {
    const { data } = await axiosClient.post<AuthResponse>('/api/auth/register', credentials)
    return data
}

export async function logoutApi(): Promise<void> {
    await axiosClient.post('/api/auth/logout')
}

export async function refreshApi(): Promise<AuthResponse> {
    const { data } = await axiosClient.post<AuthResponse>('/api/auth/refresh')
    return data
}