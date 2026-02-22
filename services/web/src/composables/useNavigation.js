"use client"

import { useRouter } from "vue-router"

export function useNavigation() {
    const router = useRouter()

    const goLogin = () => router.push("/login")
    const goRegistro = () => router.push("/registro")
    const goHome = () => router.push("/")
    const goMisReservas = () => router.push("/MisReservas")
    const goContactanos = () => router.push("/contactanos")
    const goOficinas = () => router.push("/oficinas")
    const goCars = (filtros = {}) => { router.push({ path:"/cars", query: filtros}) }
    const goCarDetail = (id) => router.push(`/car-detail/${id}`)
    const goCotizar = (id) => router.push(`/cotizar/auto/${id}`)
    const goCheckout = (id) => router.push(`/checkout/${id}`)
    const goSuccess = (id) => router.push(`/success/${id}`)

    return {
        goLogin, goRegistro, goHome, goMisReservas, goContactanos, goOficinas, goCotizar, goCars, goCarDetail, goCheckout, goSuccess
    }
}