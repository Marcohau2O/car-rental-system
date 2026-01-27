"use client"

import { useRouter } from "vue-router"

export function useNavigation() {
    const router = useRouter()

    const goLogin = () => router.push("/login")
    const goRegistro = () => router.push("/registro")
    const goHome = () => router.push("/")
    const goCars = () => router.push("/cars")
    const goCarDetail = (id) => router.push(`/car-detail/${id}`)
    const goCheckout = (id) => router.push(`/checkout/${id}`)
    const goSuccess = () => router.push("/success")

    return {
        goLogin, goRegistro, goHome, goCars, goCarDetail, goCheckout, goSuccess
    }
}