<template>
    <div class="flex h-screen bg-gray-100">
        <Sidebar />
        
        <div class="flex-1 flex flex-col">
            <TopBar />

            <main class="flex-1 overflow-auto p-8">
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p class="text-gray-600">Bienvenido al panel de administración</p>
                </div>

                <div class="grid md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white p-6 rounded-lg shadow">
                        <p class="text-gray-600 text-sm">Total de Autos</p>
                        <p class="text-3xl font-bold text-gray-900">{{ stats.totalCars }}</p>
                        <p class="text-green-600 text-sm mt-2">+5 este mes</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow">
                        <p class="text-gray-600 text-sm">Reservas Activas</p>
                        <p class="text-3xl font-bold text-gray-900">{{ stats.activeReservations }}</p>
                        <p class="text-green-600 text-sm mt-2">+12 esta semana</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow">
                        <p class="text-gray-600 text-sm">Ingresos Totales</p>
                        <p class="text-3xl font-bold text-gray-900">${{ stats.totalRevenue }}</p>
                        <p class="text-green-600 text-sm mt-2">+8.5% vs mes anterior</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow">
                        <p class="text-gray-600 text-sm">Usuarios Registrados</p>
                        <p class="text-3xl font-bold text-gray-900">{{ stats.totalUsers }}</p>
                        <p class="text-green-600 text-sm mt-2">+22 nuevos usuarios</p>
                    </div>
                </div>

                <div class="grid md:grid-cols-3 gap-6">
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-lg font-semibold mb-4">Acciones Rápidas</h3>
                    <div class="space-y-2">
                    <button @click="goAdminCarsForm" class="block bg-blue-600 text-white p-2 rounded text-center hover:bg-blue-700">
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
                        <tr v-for="reservation in recentReservations" :key="reservation.id" class="border-b hover:bg-gray-50">
                            <td class="py-2">{{ reservation.clientName }}</td>
                            <td class="py-2">{{ reservation.car }}</td>
                            <td class="py-2">{{ reservation.date }}</td>
                            <td class="py-2">
                            <span :class="getStatusColor(reservation.status)" class="px-2 py-1 rounded text-xs font-semibold">
                                {{ reservation.status }}
                            </span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import Sidebar from '../components/Sidebar.vue';
    import TopBar from '../components/TopBar.vue';
    import { useNavigation } from '../composables/useNavigation';

    const { goAdminCarsForm, goAdminReservations } = useNavigation()

    const stats = ref({
        totalCars: 42,
        activeReservations: 15,
        totalRevenue: 8450,
        totalUsers: 128,
    })

    const recentReservations = ref([
    { id: 1, clientName: 'Juan García', car: 'Toyota Corolla', date: '15 Dic 2024', status: 'Confirmada' },
    { id: 2, clientName: 'María López', car: 'Honda Civic', date: '16 Dic 2024', status: 'En Progreso' },
    { id: 3, clientName: 'Carlos Martín', car: 'BMW Series 3', date: '17 Dic 2024', status: 'Confirmada' },
    ])

    const getStatusColor = (status) => {
    const colors = {
        'Confirmada': 'bg-green-100 text-green-800',
        'En Progreso': 'bg-blue-100 text-blue-800',
        'Cancelada': 'bg-red-100 text-red-800',
    }
        return colors[status] || 'bg-gray-100 text-gray-800'
    }

</script>