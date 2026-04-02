import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            retry: (failureCount, error: unknown) => {
                if (
                    error &&
                    typeof error === 'object' &&
                    'response' in error &&
                    error.response &&
                    typeof error.response === 'object' &&
                    'status' in error.response
                ) {
                    const status = error.response.status as number
                    if (status >= 400 && status < 500) return false
                }
                return failureCount < 1
            },
        },
        mutations: {
            retry: false,
        },
    },
})