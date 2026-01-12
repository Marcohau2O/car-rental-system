"use client"

import { useRouter } from "vue-router"

export function useNavigation() {
    const router = useRouter()

    const goHome = () => router.push("/")
    const goCars = () => router.push("/cars")
    const goCarDetail = (id) => router.push(`/car-detail/${id}`)
    const goCheckout = () => router.push("/checkout")
    const goSuccess = () => router.push("/success")

    return {
        goHome, goCars, goCarDetail, goCheckout, goSuccess
    }
}