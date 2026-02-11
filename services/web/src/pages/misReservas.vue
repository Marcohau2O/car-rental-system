<template>
    <div class="min-h-screen bg-gray-50">
        <Navbar/>

        <div class="container mx-auto px-4 py-8 pt-24">
            <h1 class="text-3xl font-bold mb-6">Mis Reservas</h1>
        </div>

        <div v-if="loading" class="text-gray-500">
            Cargando reservaciones...
        </div>

        <div v-else-if="reservas.length === 0" class="bg-white p-6 rounded-lg shadow">
            <p class="text-gray-600">No tienes reservaciones resgistradas.</p>
        </div>

        <div v-else class="space-y-4">
            <div
            v-for="reserva in reservas"
            :key="reserva.id"
            class="bg-white rounded-lg shadow p-6 grid md:grid-cols-4 gap-4"
            >
            <div class="md:col-span-1">
                <img :src="`${API_PUBLIC_URL}${reserva.auto.imagen}`" alt="Auto" class="w-full h-36 object-cover rounded">
            </div>

            <div class="md:col-span-2">
                <h3 class="text-xl font-semibold">
                    {{ reserva.auto.marca }} {{ reserva.auto.modelo }}
                </h3>
                <p class="text-sm text-gray-600">
                    Confirmación: <strong>{{ reserva.confirmacion }}</strong>
                </p>

                <p class="text-sm text-gray-600">
                    Fechas:
                    {{ formatDate(reserva.fechainicio) }}
                    →
                    {{ formatDate(reserva.fechafin) }}
                </p>

                <p class="text-sm text-gray-600">
                    Horas:
                    {{ reserva.horainicio }}
                    →
                    {{ reserva.horafin }}
                </p>

                <p class="text-sm text-gray-600">
                    Seguro:
                    <span :class="reserva.seguro ? 'text-green-600' : 'text-red-600'">
                        {{ reserva.seguro ? 'Incluido' : 'No Incluido' }}
                    </span>
                </p>

                <p class="text-sm text-gray-600">
                    Silla Bebé:
                    <span :class="reserva.sillabebe ? 'text-green-600' : 'text-red-600'">
                        {{ reserva.sillabebe ? 'Sí' : 'No' }}
                    </span>
                </p>
            </div>

            <div class="md:col-span-1 flex flex-col justify-between">
                <span
                    class="inline-block px-3 py-1 rounded-full text-sm font-semibold w-fit"
                    :class="estadoColor(reserva.estado)"
                >
                {{ reserva.estado }}
                </span>

                <div class="text-right">
                    <p class="text-sm text-gray-500">
                        Total
                    </p>
                    <p class="text-xl font-bold">
                        ${{ reserva.total }}
                    </p>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue"
    import Navbar from '../components/Navbar.vue'
    import { ReservacionService } from "../services/reservacion.service";
    import { API_PUBLIC_URL } from "../config/endpointPublic";

    const reservas = ref([])
    const loading = ref(true)

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('es-MX')
    }

    const estadoColor = (estado) => {
        switch (estado) {
            case 'PENDIENTE':
                return 'bg-yellow-100 text-yellow-700'
            case 'CONFIRMADA':
                return 'bg-green-100 text-green-700'
            case 'CANCELADA':
                return 'bg-red-100 text-red-700'
            default:
                return 'bg-gray-100 text-gray-700'
        }
    }

    onMounted(async () => {
        try {
            reservas.value = await ReservacionService.getById()
        } catch (error) {
            console.error(error)
            alert('Error al cargar las reservaciones')
        } finally {
            loading.value = false
        }
    })
</script>