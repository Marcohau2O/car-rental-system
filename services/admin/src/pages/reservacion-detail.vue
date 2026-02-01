<template>
  <Layout>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
        Detalles de la Reservación
      </h1>
      <p class="text-gray-600 text-sm md:text-base">
        Datos de la reservación del usuario
      </p>
    </div>

    <div class="px-2 md:px-0">
      <div
        v-if="reserva"
        class="max-w-4xl mx-auto bg-white rounded-lg shadow p-4 md:p-6 space-y-6"
      >
        <!-- Título -->
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <h2 class="text-xl md:text-2xl font-bold">
            Reserva #{{ reserva.confirmacion }}
          </h2>

          <span
            :class="estadoColor(reserva.estado)"
            class="px-3 py-1 rounded text-sm font-semibold w-fit"
          >
            {{ reserva.estado }}
          </span>
        </div>

        <!-- Cliente -->
        <section>
          <h3 class="text-lg font-semibold mb-2">Cliente</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <p><strong>Nombre:</strong> {{ reserva.usuario?.nombre }}</p>
            <p><strong>Email:</strong> {{ reserva.usuario?.correo }}</p>
          </div>
        </section>

        <!-- Vehículo -->
        <section>
          <h3 class="text-lg font-semibold mb-2">Vehículo</h3>

          <div class="flex flex-col md:flex-row gap-4">
            <img
              :src="API_BASE_URL + reserva.auto?.imagen"
              alt="Auto"
              class="w-full md:w-48 h-40 object-cover rounded"
            />

            <div class="text-sm space-y-1">
              <p><strong>Marca:</strong> {{ reserva.auto?.marca }}</p>
              <p><strong>Modelo:</strong> {{ reserva.auto?.modelo }}</p>
              <p>
                <strong>Precio / día:</strong>
                ${{ reserva.auto?.precioPorDia }}
              </p>
            </div>
          </div>
        </section>

        <!-- Fechas -->
        <section>
          <h3 class="text-lg font-semibold mb-2">Fechas</h3>
          <p class="text-sm">
            {{ formatDate(reserva.fechainicio) }}
            →
            {{ formatDate(reserva.fechafin) }}
          </p>
        </section>

        <!-- Servicios -->
        <section>
          <h3 class="text-lg font-semibold mb-2">Servicios</h3>
          <ul class="text-sm list-disc ml-5 space-y-1">
            <li>Seguro: {{ reserva.seguro ? 'Sí' : 'No' }}</li>
            <li>Silla bebé: {{ reserva.sillabebe ? 'Sí' : 'No' }}</li>
          </ul>
        </section>

        <!-- Licencia -->
        <section v-if="reserva.licencia">
          <h3 class="text-lg font-semibold mb-2">Licencia</h3>
          <img
            :src="API_BASE_URL + reserva.licencia"
            alt="Licencia"
            class="w-full max-w-md rounded border"
          />
        </section>

        <!-- Total -->
        <div class="border-t pt-4 flex justify-between items-center">
          <span class="text-gray-600 text-sm">Total</span>
          <span class="text-xl font-bold">
            ${{ reserva.total }}
          </span>
        </div>
      </div>

      <!-- Loading -->
      <div v-else class="text-center text-gray-500 py-10">
        Cargando reservación...
      </div>
    </div>
  </Layout>
</template>


<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router';
    import Sidebar from '../components/Sidebar.vue';
    import TopBar from '../components/TopBar.vue';
    import Layout from '../components/Layout.vue';
    import { ReservacionService } from '../services/reservacion.service';
    import { API_BASE_URL } from '../config/endpoint';

    const route = useRoute()
    const reserva = ref([])

    const formatDate = (date) =>
        new Date(date).toLocaleDateString('es-MX')

    const estadoColor = (estado) => {
        switch (estado) {
            case 'PENDIENTE': return 'bg-yellow-100 text-yellow-800'
            case 'CONFIRMADA': return 'bg-green-100 text-green-800'
            case 'CANCELADA': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    onMounted(async () => {
        const id = route.params.id
        reserva.value = await ReservacionService.getReservacionById(id)
    })

</script>