"use client"

import { useRouter } from "vue-router"

export function useNavigation() {
    const router = useRouter()

    const goLogin = () => router.push("/login")
    const goRegistro = () => router.push("/registro")
    const goHome = () => router.push("/")
    const goMisReservas = () => router.push("/MisReservas")
    const goCars = (filtros = {}) => { router.push({ path:"/cars", query: filtros}) }
    const goCarDetail = (id) => router.push(`/car-detail/${id}`)
    const goCheckout = (id) => router.push(`/checkout/${id}`)
    const goSuccess = () => router.push("/success")

    return {
        goLogin, goRegistro, goHome, goMisReservas, goCars, goCarDetail, goCheckout, goSuccess
    }
}