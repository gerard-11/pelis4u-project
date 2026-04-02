import { create } from 'zustand'
import type { AuthUser } from '@/types'

interface AuthState {
    accessToken: string | null
    user: AuthUser | null
    isInitializing: boolean
    setAuth: (accessToken: string, user: AuthUser) => void
    clearAuth: () => void
    setIsInitializing: (value: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    user: null,
    isInitializing: true,
    
    setAuth: (accessToken, user) => set({
            accessToken,
            user,
            isInitializing: false,
        }),
    clearAuth: () =>
        set({
            accessToken: null,
            user: null,
            isInitializing: false,
        }),
    setIsInitializing: (value) => set({ isInitializing: value }),
}))