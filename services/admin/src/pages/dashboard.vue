<template>
    <Layout>
        <div class="mb-8">
           <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p class="text-gray-600">Bienvenido al panel de administración</p>
        </div>

        <div class="grid md:grid-cols-4 gap-6 mb-8">
            <div v-if="hasRole([1,3])" class="bg-white p-6 rounded-lg shadow">
                <Spinner v-if="loading"/>
                <div v-else>
                    <p class="text-gray-600 text-sm">Total de Autos</p>
                    <p class="text-3xl font-bold text-gray-900">{{ stats.totalCaros }}</p>
                    <p class="text-green-600 text-sm mt-2">+5 este mes</p>
                </div>
            </div>
            <div v-if="hasRole([1,3])" class="bg-white p-6 rounded-lg shadow">
                <Spinner v-if="loading" />
                <div v-else>
                    <p class="text-gray-600 text-sm">Reservas Activas</p>
                    <p class="text-3xl font-bold text-gray-900">{{ stats.reservasActivas }}</p>
                    <p class="text-green-600 text-sm mt-2">+12 esta semana</p>
                </div>
            </div>
            <div v-if="hasRole([1])" class="bg-white p-6 rounded-lg shadow">
                <Spinner v-if="loading" />
                <div v-else>
                    <p class="text-gray-600 text-sm">Ingresos Totales</p>
                    <p class="text-3xl font-bold text-gray-900">${{ stats.totalIngresos }}</p>
                    <p class="text-green-600 text-sm mt-2">+8.5% vs mes anterior</p>
                </div>
            </div>
            <div v-if="hasRole([1])" class="bg-white p-6 rounded-lg shadow">
                <Spinner v-if="loading" />
                <div v-else>
                    <p class="text-gray-600 text-sm">Usuarios Registrados</p>
                    <p class="text-3xl font-bold text-gray-900">{{ stats.totalUsuarios }}</p>
                    <p class="text-green-600 text-sm mt-2">+22 nuevos usuarios</p>
                </div>
            </div>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-lg font-semibold mb-4">Acciones Rápidas</h3>
                <div class="space-y-2">
                        <button v-if="hasRole([1])" @click="goAdminCarsForm" class="block bg-blue-600 text-white p-2 rounded text-center hover:bg-blue-700">
                            Añadir Nuevo Auto
                        </button>
                        <button @click="goAdminReservations" class="block bg-green-600 text-white p-2 rounded text-center hover:bg-green-700">
                            Ver Reservas
                        </button>
                </div>
            </div>

            <div class="md:col-span-2 bg-white p-6 rounded-lg shadow">
                <h3 class="text-lg font-semibold mb-4">Reservas Recientes</h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead class="border-b">
                            <tr>
                                <th class="text-left py-2">Cliente</th>
                                <th class="text-left py-2">Auto</th>
                                <th class="text-left py-2">Fecha</th>
                                <th class="text-left py-2">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="loading">
                                <td colspan="5", class="py-10">
                                    <Spinner />
                                </td>
                            </tr>
                            <tr v-else v-for="reservation in recentReservations" :key="reservation.id" class="border-b hover:bg-gray-50">
                                <td class="py-2">{{ reservation.cliente }}</td>
                                <td class="py-2">{{ reservation.auto }}</td>
                                <td class="py-2">{{ reservation.dia }}</td>
                                <td class="py-2">
                                    <span :class="getStatusColor(reservation.estado)" class="px-2 py-1 rounded text-xs font-semibold">
                                    {{ reservation.estado }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue'
    import Layout from '../components/Layout.vue';
    import { useNavigation } from '../composables/useNavigation';
    import { DashboardService } from '../services/dashboard.service';
    import { getUser } from '../utils/auth';
    import Spinner from '../components/Spinner.vue';

    const { goAdminCarsForm, goAdminReservations } = useNavigation()

    const loading = ref(true)

    const stats = ref({
        totalCaros: 0,
        reservasActivas: 0,
        totalIngresos: 0,
        totalUsuarios: 0,
    })

    const recentReservations = ref([])

    const RolUsuario = computed(() => getUser())

    const hasRole = (roles = []) => {
        if (!RolUsuario.value) return false
        return roles.includes(RolUsuario.value.roleId)
    }

    onMounted(async () => {
        try {
            const [data] = await Promise.all([
                DashboardService.getDatadashboard(),
                new Promise(r => setTimeout(r, 500))
            ])

            stats.value = data.stats;
            recentReservations.value = data.reservasRecientes;
        } finally {
            loading.value = false
        }
    })

    const getStatusColor = (status) => {
    const colors = {
        'CONFIRMADO': 'bg-green-100 text-green-800',
        'PENDIENTE': 'bg-blue-100 text-blue-800',
        'CANCELADA': 'bg-red-100 text-red-800',
    }
        return colors[status] || 'bg-gray-100 text-gray-800'
    }

</script>