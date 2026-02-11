<template>
      <Layout>
        <div>
            <div class="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Gestión de Reservaciones</h1>
              <p class="text-gray-600 text-sm md:text-base">Administra todas las reservas</p>
            </div>
        </div>

        <!-- Filtros -->
        <div class="bg-white p-4 rounded shadow mb-6 flex flex-col md:flex-row gap-4">
          <input v-model="searchTerm" type="text" placeholder="Buscar por cliente o reserva..." class="border border-gray-300 rounded px-3 py-2 flex-1">
          <select v-model="statusFilter" class="border border-gray-300 rounded px-3 py-2 w-full md:w-56">
            <option value="">Todos los estados</option>
            <option value="CONFIRMADA">CONFIRMADA</option>
            <option value="PENDIENTE">PENDIENTE</option>
            <option value="COMPLETADA">COMPLETADA</option>
            <option value="CANCELADA">CANCELADA</option>
          </select>
        </div>

        <div v-if="loading" class="md:hidden">
            <div class="py-10">
                <Spinner />
            </div>
        </div>

        <div class="md:hidden space-y-4">
          <div
              v-for="res in filteredReservations"             
              :key="res.id"
              class="bg-white rounded-lg shadow p-4 space-y-3"
          >
            <div class="flex justify-between items-center">
              <span class="text-sm font-semibold text-blue-600">
                #{{ res.confirmacion }}
              </span>

              <span :class="getStatusColor(res.estado)" class="px-2 py-1 rounded text-xs font-semibold">
                {{ res.estado }}
              </span>
            </div>

            <div>
              <p class="text-xs text-gray-500">Cliente</p>
              <p class="font-medium text-gray-900">
                  {{ res.usuario?.nombre }}
              </p>
            </div>

            <div>
              <p class="text-xs text-gray-500">Auto</p>
              <p class="font-medium text-gray-900">
                {{ `${res.auto.marca} ${res.auto.modelo}`}}
              </p>
            </div>

            <div class="flex justify-between items-center pt-2 border-t">
              <span class="font-semibold text-gray-900">
                Total: ${{ res.total }}
              </span>

              <div class="flex gap-3">
                <button @click="verDetallesReserva(res.id)" class="text-blue-600 text-sm font-medium">
                  Ver
                </button>

                <button @click="cancelReservation(res.id)" class="text-red-600 text-sm font-medium">
                  Cancelar

                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabla -->
        <div class="hidden md:block bg-white rounded shadow overflow-x-auto">
          <table class="w-full min-w-[800px]">
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
              <tr v-if="loading">
                <td colspan="5", class="py-10">
                  <Spinner />
                </td>
              </tr>
              <tr v-else v-for="res in filteredReservations" :key="res.id" class="hover:bg-gray-50">
                <td class="px-6 py-3 text-sm font-semibold text-blue-600">#{{ res.confirmacion }}</td>
                <td class="px-6 py-3">{{ res.usuario?.nombre || '—' }}</td>
                <td class="px-6 py-3">{{ res.auto ? `${res.auto.marca} ${res.auto.modelo}` : '—' }}</td>
                <td class="px-6 py-3 text-sm">{{ formatDate(res.fechainicio) }} - {{ formatDate(res.fechafin) }}</td>
                <td class="px-6 py-3 font-semibold">${{ res.total }}</td>
                <td class="px-6 py-3">
                  <span :class="getStatusColor(res.estado)" class="px-2 py-1 rounded text-xs font-semibold">
                    {{ res.estado }}
                  </span>
                </td>
                <td class="px-6 py-3">
                  <button v-if="hasRole([1,3])" @click="verDetallesReserva(res.id)" class="text-blue-600 hover:underline text-sm mr-3">Ver</button>
                  <button v-if="hasRole([1,3])" @click="cancelReservation(res.id)" class="text-red-800 hover:underline text-sm">Cancelar</button>
                  <button v-if="hasRole([1])" class="text-red-600 hover:underline text-sm">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-6">
            <p class="text-sm text-gray-600 text-center md:text-left">
              Página {{ paginaActual }} de {{ totalPaginas }}
            </p>

            <div class="flex flex-wrap justify-center gap-1">
              <button
                @click="goToPagina(paginaActual - 1)"
                :disabled="paginaActual === 1"
                class="px-3 py-1 border rounded disabled:opacity-50"
                >
                Antenrior
              </button>

              <button
                v-for="res in totalPaginas"
                :key="res"
                @click="goToPagina(res)"
                :class="[
                  'px-3 py-1 border rounded',
                  car === paginaActual
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700'
                ]"
                >
                {{ res }}
              </button>

              <button
                  @click="goToPagina(paginaActual + 1)"
                  :disabled="paginaActual === totalPaginas"
                  class="px-3 py-1 border rounded disabled:opacity-50"
                  >
                  Siguiente
              </button>
            </div>
          </div>
        </div>
      </Layout>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue'
    import Layout from '../components/Layout.vue';
    import { ReservacionService } from '../services/reservacion.service';
    import { useNavigation } from '../composables/useNavigation';
    import { getUser } from '../utils/auth';
    import Spinner from '../components/Spinner.vue';
    
    const { goAdminReservationsDetail } = useNavigation()

    const searchTerm = ref('')
    const statusFilter = ref('')

    const reservaciones = ref([])

    const loading = ref(true)

    const paginaActual = ref(1)
    const tamañoPagina = ref(4)

    const paginadoAutos = computed(() => {
        const start = (paginaActual.value - 1) * tamañoPagina.value
        const end = start + tamañoPagina.value
        return filteredUsers.value.slice(start, end)
    })


    const totalPaginas = computed(() =>
        Math.ceil(filteredReservations.value.length / tamañoPagina.value)
    )

    const goToPagina = (page) => {
        if (page >= 1 && page <= totalPaginas.value) {
            paginaActual.value = page
        }
    }

    const filteredReservations = computed(() => {
      return reservaciones.value.filter(res => {
        const search = searchTerm.value.toLowerCase()

        const searchMatch =
          res.confirmacion?.toLowerCase().includes(search) ||
          res.usuario?.nombre?.toLowerCase().includes(search) ||
          res.auto?.marca?.toLowerCase().includes(search) ||
          res.auto?.modelo?.toLowerCase().includes(search)

        const statusMatch =
          !statusFilter.value ||
          res.estado?.toLowerCase() === statusFilter.value.toLowerCase()

        return searchMatch && statusMatch
      })
    })

    const getStatusColor = (status) => {
    const colors = {
        'CONFIRMADA': 'bg-green-100 text-green-800',
        'PENDIENTE': 'bg-blue-100 text-blue-800',
        'COMPLETADA': 'bg-gray-100 text-gray-800',
        'CANCELADA': 'bg-red-100 text-red-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('ex-MX')
    }

    const verDetallesReserva = (id) => {
      goAdminReservationsDetail(id)
    }

    const cancelReservation = (id) => {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
        const reservation = reservations.value.find(r => r.id === id)
        if (reservation) reservation.status = 'Cancelada'
    }
    }

    const RolUsuario = computed(() => getUser())

    const hasRole = (roles = []) => {
        if (!RolUsuario.value) return false
        return roles.includes(RolUsuario.value.roleId)
    }

    onMounted(async () => {
      try {
        const reservas = await ReservacionService.getAll()

        await new Promise(r => setTimeout(r, 500))

        reservaciones.value = reservas
      } finally {
        loading.value = false
      }
    })
</script>
