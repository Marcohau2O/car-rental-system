"use client"

import { useRouter } from "vue-router"

export function useNavigation() {
    const router = useRouter()

    const goAdminLogin = () => router.push("/admin/login")
    const goAdminDashboard = () => router.push("/admin/dashboard")
    const goAdminCars = () => router.push("/admin/cars")
    const goAdminCarsForm = (id) => {
        router.push(
            id ? `/admin/cars-form/${id}` : "/admin/cars-form"
        )
    }
    const goAdminUserForm = (id) => {
        router.push(
            id ? `/admin/user-form/${id}` : "/admin/user-form"
        )
    }
    const goAdminReservations = () => router.push("/admin/reservations")
    const goAdminUsers = () => router.push("/admin/users")
    const goAdminReservationsDetail = (id) => router.push(`/admin/reservations/${id}`)
    const goAdminCalendario = () => router.push("/admin/calendario")


    return {
        goAdminLogin,
        goAdminDashboard,
        goAdminCars,
        goAdminCarsForm,
        goAdminUserForm,
        goAdminReservations,
        goAdminUsers,
        goAdminReservationsDetail,
        goAdminCalendario
    }
}