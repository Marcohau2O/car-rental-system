<template>
  <div class="min-h-screen bg-[#f4f6f8]">
    <Navbar />

    <section class="relative mx-auto max-w-7xl px-4 py-16 md:py-24">

      <h1 class="text-4xl font-extrabold tracking-tight mb-2">
        Cotiza tu vehículo
      </h1>
      <p class="text-gray-600 mb-12 text-lg">
        Calcula el costo en segundos
      </p>

      <!-- GRID PRINCIPAL -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">

        <!-- CARD FORMULARIO -->
        <div class="md:col-span-2 bg-white rounded-2xl shadow-xl p-8 h-fit">
          <h2 class="text-xl font-bold mb-6 text-[#e5be01]">
            Datos de renta
          </h2>

          <div v-if="loading" class="text-center py-10">
            Cargando auto...
          </div>

          <div v-if="auto" class="space-y-4">

            <div v-if="auto.imagen" class="relative mb-4">
              <img
                :src="API_PUBLIC_URL + auto.imagen"
                class="w-full h-52 object-cover rounded-2xl"
              />
              <div class="badge-disponible">
                Disponible
              </div>
            </div>

            <p class="font-bold text-lg">
              {{ auto.marca }} {{ auto.modelo }}
            </p>

            <div class="input-group">
              <label>Fecha inicio</label>
              <input type="date" v-model="form.fechaInicio" />
            </div>

            <div class="input-group">
              <label>Fecha fin</label>
              <input type="date" v-model="form.fechaFin" />
            </div>

            <div class="input-group">
              <label>Entrega</label>
              <select v-model="form.entrega" @change="calcularExtras">
                <option disabled value="">Selecciona un lugar</option>
                <option
                  v-for="loc in locaciones"
                  :key="loc.value"
                  :value="loc.value"
                >
                  {{ loc.label }}
                </option>
              </select>
            </div>

            <div class="input-group">
              <label>Devolución</label>
              <select v-model="form.devolucion" @change="calcularExtras">
                <option disabled value="">Selecciona un lugar</option>
                <option
                  v-for="loc in locaciones"
                  :key="loc.value"
                  :value="loc.value"
                >
                  {{ loc.label }}
                </option>
              </select>
            </div>

            <div>
              <label class="check-row">
                <input v-model="form.seguro" type="checkbox" />
                Seguro completo (+$500/día)
              </label>

              <label class="check-row">
                <input v-model="form.sillaBebe" type="checkbox" />
                Kit para bebé (+$450)
              </label>
            </div>

            <button @click="cotizar" class="w-full btn-button">
              Cotizar ahora
            </button>
          </div>
        </div>

        <!-- COLUMNA DERECHA -->
        <div class="md:col-span-3 flex flex-col gap-6">

          <!-- INFO VEHÍCULO -->
          <div
            class="bg-gradient-to-r from-black via-[#111] to-[#e5be01] 
                   text-white rounded-2xl shadow-xl p-8"
          >
            <h2 class="text-2xl font-bold mb-6">
              Información del vehículo
            </h2>

            <div v-if="auto">
              <p class="text-2xl font-bold">
                {{ auto.marca }} {{ auto.modelo }}
              </p>
              <p class="opacity-90">Tipo: {{ auto.tipoVehiculo }}</p>
              <p class="opacity-90">Año: {{ auto.anio }}</p>

              <p class="mt-4 text-lg">
                Precio por día:
                <span class="text-3xl font-bold">
                  $ {{ precioDia }}
                </span>
              </p>
            </div>

            <div v-else class="opacity-70">
              Selecciona fechas para cotizar
            </div>
          </div>

          <!-- RESULTADO -->
          <div class="bg-white rounded-2xl shadow-xl p-8 h-fit">
            <h2 class="text-xl font-bold mb-6 text-green-700">
              Resultado de cotización
            </h2>

            <div v-if="total > 0">
              <p class="text-gray-600">Días de renta:</p>
              <p class="text-2xl font-bold">{{ dias }} días</p>

              <p class="mt-4 text-gray-600">Precio por día:</p>
              <p class="text-xl font-semibold">$ {{ precioDia }}</p>

              <div
                v-if="form.extraEntrega > 0"
                class="text-sm text-gray-600"
              >
                Entrega a domicilio: ${{ form.extraEntrega }}
              </div>

              <div
                v-if="form.extraDevolucion > 0"
                class="text-sm text-gray-600"
              >
                Devolución a domicilio: ${{ form.extraDevolucion }}
              </div>

              <div
                v-if="form.seguro"
                class="text-sm text-gray-600"
              >
                Seguro: ${{ 500 * dias }}
              </div>

              <div
                v-if="form.sillaBebe"
                class="text-sm text-gray-600"
              >
                Kit bebé: $450
              </div>

              <p class="mt-6 text-gray-600">
                Total estimado:
              </p>

              <p class="text-5xl font-bold text-green-600">
                $ {{ total }} MXN
              </p>

              <button
                @click="isReservas"
                class="mt-6 w-full btn-button"
              >
                Reservar ahora
              </button>
            </div>

            <div v-else class="text-gray-400 text-center mt-10">
              Aún no hay cotización
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import Navbar from '../components/Navbar.vue';
    import { useRouter, useRoute } from 'vue-router';
    import { AutoServicePublic } from '../services/autoP.service';
    import { API_PUBLIC_URL } from '../config/endpointPublic';

    const router = useRouter()
    const route = useRoute()


    const auto = ref(null)
    const loading = ref(true)

    const precioDia = ref(0)
    const dias = ref(0)
    const total = ref(0)

    const form = ref({
        fechaInicio: '',
        fechaFin: '',
        entrega: 'Oficinas',
        devolucion: 'Oficinas',
        extraEntrega: 0,
        extraDevolucion: 0,
        seguro: false,
        sillabebe: false 
    })

    const locaciones = [
        { value: 'Oficinas', label: 'Oficinas' },
        { value: 'Cancun-Centro', label: 'Cancun-Centro' },
        { value: 'Cancun-Aeropuero', label: 'Cancun-Aeropuero' },
        { value: 'Playa del Carmen', label: 'Playa del Carmen' },
    ]

    const costoEntrega = 150
    const costoDevolucion = 150
    const costoSeguro = 500
    const costoSilla = 450

    const calcularExtras = () => {
        form.value.extraEntrega = form.value.entrega !== 'Oficinas' ? costoEntrega : 0
        form.value.extraDevolucion = form.value.devolucion !== 'Oficinas' ? costoDevolucion : 0
    }


    onMounted(async () => {
        try {
            const id = route.params.id
            const data = await AutoServicePublic.getById(id)

            auto.value = data

            precioDia.value = data.precioPorDia

        } catch (error) {
            console.error("Error cargando auto", error)
        } finally {
            loading.value = false
        }
    })

    const cotizar = () => {

        if (!form.value.fechaInicio || !form.value.fechaFin) {
            alert("Selecciona fechas")
            return
        }

        const inicio = new Date(form.value.fechaInicio)
        const fin = new Date(form.value.fechaFin)

        const diff = fin - inicio
        dias.value = Math.ceil(diff / (1000 * 60 * 60 * 24))

        if (dias.value <= 0) {
            alert("Fechas invalidas")
            return
        }

        precioDia.value = auto.value.precioPorDia

        let subtotal = dias.value * precioDia.value

        if (form.value.seguro) subtotal += costoSeguro * dias.value
        if (form.value.sillabebe) subtotal += costoSilla

        subtotal += form.value.extraEntrega
        subtotal += form.value.extraDevolucion

        total.value = subtotal
    }

    const isReservas = () => {
        if (!form.value.fechaInicio || !form.value.fechaFin) {
            alert("Selecciona ambas fechas")
            return
        }

        if (total.value <= 0) {
            alert("Primero cotiza")
            return
        }

        // router.push({
        //     name: 'Checkout',
        //     query: {
        //         fechaInicio: form.value.fechaInicio,
        //         fechaFin: form.value.fechaFin,
        //         entrega: form.value.entrega,
        //         devolucion: form.value.devolucion,
        //         extraEntrega: form.value.extraEntrega,
        //         extraDevolucion: form.value.extraDevolucion,
        //         seguro: form.value.seguro,
        //         sillabebe: form.value.sillabebe,
        //         total: total.value
        //     }
        // }) aqui manda los datos a checkout antes pide iniciar session
    }

</script>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 6px;
  font-weight: 500;
}

.input-group input,
.input-group select {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px;
  background: white;
  transition: 0.3s;
  outline: none;
  font-weight: 500;
}

.input-group input:focus,
.input-group select:focus {
  border-color: #e5be01;
  box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.15);
}

.btn-button {
  background: #e5be01;
  color: white;
  padding: 14px;
  border-radius: 14px;
  font-weight: 600;
  letter-spacing: 0.3px;
  transition: 0.35s;
  box-shadow: 0 10px 25px rgba(255, 107, 0, 0.35);
}

.btn-button:hover {
  background: #ff8533;
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(255, 107, 0, 0.45);
}

.btn-button:active {
  transform: scale(0.97);
}

.check-row {
  display: flex;
  gap: 8px;
  font-size: 14px;
  margin-bottom: 6px;
}

.badge-disponible {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(34, 197, 94, 0.9);
  color: white;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}
</style>