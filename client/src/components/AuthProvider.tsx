import {useAuthStore} from "@/store/authStore.ts";
import * as React from "react";
import {useEffect} from "react";
import {refreshApi} from "@/api/auth"


interface AuthProviderProps {
    children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const {setAuth, clearAuth, isInitializing} = useAuthStore()

    useEffect(() => {
        async function initializedAuth(){
            try{
                const {accessToken, user}= await refreshApi()
                setAuth(accessToken,user)
            }catch{
                clearAuth()
            }
        }
        initializedAuth()
    },[setAuth, clearAuth])

if(isInitializing){
    return(
        <div className="flex h-screen items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
        )
    }
    return <>{children}</>
}