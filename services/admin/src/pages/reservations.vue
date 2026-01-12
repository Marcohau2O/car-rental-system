<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    
    <div class="flex-1 flex flex-col">
      <TopBar />
      
      <main class="flex-1 overflow-auto p-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Gestión de Reservaciones</h1>
          <p class="text-gray-600">Administra todas las reservas</p>
        </div>

        <!-- Filtros -->
        <div class="bg-white p-4 rounded shadow mb-6 flex gap-4 flex-wrap">
          <input v-model="searchTerm" type="text" placeholder="Buscar por cliente o reserva..." class="border border-gray-300 rounded px-3 py-2 flex-1 min-w-48">
          <select v-model="statusFilter" class="border border-gray-300 rounded px-3 py-2">
            <option value="">Todos los estados</option>
            <option value="confirmed">Confirmada</option>
            <option value="inprogress">En Progreso</option>
            <option value="completed">Completada</option>
            <option value="cancelled">Cancelada</option>
          </select>
        </div>

        <!-- Tabla -->
        <div class="bg-white rounded shadow overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-50 border-b">
              <tr>
                <th class="text-left px-6 py-3 font-semibold">Confirmación</th>
                <th class="text-left px-6 py-3 font-semibold">Cliente</th>
                <th class="text-left px-6 py-3 font-semibold">Auto</th>
                <th class="text-left px-6 py-3 font-semibold">Fechas</th>
                <th class="text-left px-6 py-3 font-semibold">Total</th>
                <th class="text-left px-6 py-3 font-semibold">Estado</th>
                <th class="text-left px-6 py-3 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <tr v-for="res in filteredReservations" :key="res.id" class="hover:bg-gray-50">
                <td class="px-6 py-3 text-sm font-semibold text-blue-600">#{{ res.confirmationNumber }}</td>
                <td class="px-6 py-3">{{ res.clientName }}</td>
                <td class="px-6 py-3">{{ res.car }}</td>
                <td class="px-6 py-3 text-sm">{{ res.startDate }} - {{ res.endDate }}</td>
                <td class="px-6 py-3 font-semibold">${{ res.total }}</td>
                <td class="px-6 py-3">
                  <span :class="getStatusColor(res.status)" class="px-2 py-1 rounded text-xs font-semibold">
                    {{ res.status }}
                  </span>
                </td>
                <td class="px-6 py-3">
                  <button @click="viewDetails(res.id)" class="text-blue-600 hover:underline text-sm mr-3">Ver</button>
                  <button @click="cancelReservation(res.id)" class="text-red-600 hover:underline text-sm">Cancelar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
    import { ref, computed } from 'vue'
    import Sidebar from '../components/Sidebar.vue';
    import TopBar from '../components/TopBar.vue';

    const searchTerm = ref('')
    const statusFilter = ref('')

    const reservations = ref([
    { id: 1, confirmationNumber: 'RES2024001', clientName: 'Juan García', car: 'Toyota Corolla', startDate: '15 Dic', endDate: '18 Dic', total: 240, status: 'Confirmada' },
    { id: 2, confirmationNumber: 'RES2024002', clientName: 'María López', car: 'Honda Civic', startDate: '16 Dic', endDate: '20 Dic', total: 320, status: 'En Progreso' },
    { id: 3, confirmationNumber: 'RES2024003', clientName: 'Carlos Martín', car: 'BMW Series 3', startDate: '17 Dic', endDate: '21 Dic', total: 600, status: 'Confirmada' },
    ])

    const filteredReservations = computed(() => {
    return reservations.value.filter(res => {
        const searchMatch = res.clientName.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                        res.confirmationNumber.toLowerCase().includes(searchTerm.value.toLowerCase())
        const statusMatch = !statusFilter.value || res.status.toLowerCase().includes(statusFilter.value.toLowerCase())
        return searchMatch && statusMatch
    })
    })

    const getStatusColor = (status) => {
    const colors = {
        'Confirmada': 'bg-green-100 text-green-800',
        'En Progreso': 'bg-blue-100 text-blue-800',
        'Completada': 'bg-gray-100 text-gray-800',
        'Cancelada': 'bg-red-100 text-red-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
    }

    const viewDetails = (id) => {
    console.log('Ver detalles:', id)
    }

    const cancelReservation = (id) => {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
        const reservation = reservations.value.find(r => r.id === id)
        if (reservation) reservation.status = 'Cancelada'
    }
    }
</script>
