<template>
  <Layout>
    <div>
      <div class="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Gestión de Reservaciones</h1>
        <p class="text-gray-600 text-sm md:text-base">Administra todas las reservas</p>
      </div>
    </div>

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
            <td colspan="7" class="py-10">
              <Spinner />
            </td>
          </tr>
          <tr v-else v-for="res in filteredReservations" :key="res.id" class="hover:bg-gray-50">
            <td class="px-6 py-3 text-sm font-semibold text-blue-600">#{{ res.confirmacion }}</td>
            <td class="px-6 py-3">{{ res.usuario?.nombre || 'N/A' }}</td>
            <td class="px-6 py-3">{{ res.auto ? `${res.auto.marca} ${res.auto.modelo}` : 'N/A' }}</td>
            <td class="px-6 py-3 text-sm">{{ formatDate(res.fechainicio) }} - {{ formatDate(res.fechafin) }}</td>
            <td class="px-6 py-3 font-semibold">${{ res.total }}</td>
            <td class="px-6 py-3">
              <span :class="getStatusColor(res.estado)" class="px-2 py-1 rounded text-xs font-semibold">
                {{ res.estado }}
              </span>
            </td>
            <td class="px-6 py-3 flex gap-3">
              <button v-if="hasRole([1,3])" @click="verDetallesReserva(res.id)" class="text-blue-600 hover:underline text-sm">Ver</button>
              <button v-if="hasRole([1,3])" @click="cancelReservation(res.id)" class="text-red-800 hover:underline text-sm">Cancelar</button>
              <button v-if="hasRole([1])" @click="openInvoice(res)" class="text-green-600 hover:underline text-sm">Generar Factura</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <InvoiceModal v-if="showInvoice" :invoiceData="invoiceData" @close="showInvoice=false" />
  </Layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Layout from '../components/Layout.vue'
import { ReservacionService } from '../services/reservacion.service'
import { useNavigation } from '../composables/useNavigation'
import { getUser } from '../utils/auth'
import Spinner from '../components/Spinner.vue'
import InvoiceModal from '../components/InvoiceModal.vue'

const { goAdminReservationsDetail } = useNavigation()

const searchTerm = ref('')
const statusFilter = ref('')
const reservaciones = ref([])
const loading = ref(true)
const paginaActual = ref(1)
const tamañoPagina = ref(4)

const showInvoice = ref(false)
const invoiceData = ref(null)

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
  return new Date(date).toLocaleDateString('es-MX')
}

const verDetallesReserva = (id) => {
  goAdminReservationsDetail(id)
}

const cancelReservation = (id) => {
  if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
    const reservation = reservaciones.value.find(r => r.id === id)
    if (reservation) reservation.estado = 'CANCELADA'
  }
}

const openInvoice = async (res) => {
  const reservaCompleta = await ReservacionService.getReservacionById(res.id)

  const dias = Math.ceil(
    (new Date(reservaCompleta.fechafin) - new Date(reservaCompleta.fechainicio)) / (1000 * 60 * 60 * 24)
  )

  console.log('Reserva completa:', reservaCompleta)

  invoiceData.value = {
    confirmacion: reservaCompleta.confirmacion || 'N/A',
    usuario: {
      nombre: reservaCompleta.usuario?.nombre || 'N/A',
      correo: reservaCompleta.usuario?.correo || 'N/A',
      telefono: reservaCompleta.usuario?.telefono || 'N/A'
    },
    auto: {
      marca: reservaCompleta.auto?.marca || 'N/A',
      modelo: reservaCompleta.auto?.modelo || 'N/A',
      precioPorDia: reservaCompleta.auto?.precioPorDia || 'N/A'
    },
    fechainicio: reservaCompleta.fechainicio || 'N/A',
    fechafin: reservaCompleta.fechafin || 'N/A',
    dias,
    seguro: reservaCompleta.seguro ? (500 * dias) : 0,
    sillabebe: reservaCompleta.sillabebe ? 450 : 0,
    total: (reservaCompleta.auto?.precioPorDia * dias) +
           (reservaCompleta.seguro ? (500 * dias) : 0) +
           (reservaCompleta.sillabebe ? 450 : 0),
    fechaPago: new Date().toLocaleDateString('es-MX')
  }
  showInvoice.value = true
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