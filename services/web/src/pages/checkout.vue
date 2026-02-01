<template>
    <div class="min-h-screen bg-gray-50">
        <Navbar/>

        <div class="container mx-auto px-4 py-8 pt-25">
            <div class="grid md:grid-cols-3 gap-8">
                <div class="md:col-span-2">
                    <div class="bg-white p-6 rounded-lg shadow mb-6">
                        <h2 class="text-2xl font-bold mb-6">Detalles de la Reserva</h2>

                        <div class="mb-6">
                            <h3 class="text-lg font-semibold mb-4">Fechas</h3>
                            <div class="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium mb-2">Fecha de recogida</label>
                                    <input v-model="reservacion.fechainicio" type="date" class="w-full border border-gray-300 rounded p-2">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-2">Fecha de retorno</label>
                                    <input v-model="reservacion.fechafin" :min="reservacion.fechainicio" type="date" class="w-full border border-gray-300 rounded p-2">
                                </div>
                            </div>
                        </div>

                        <div class="mb-6 border-t pt-6">
                            <h3 class="text-lg font-semibold mb-4">Ubicacion y Licencia/Carnet de Conducir</h3>
                            <div class="grid md:grid-cols-2 gap-4">
                                <div>
                                     <label class="block text-sm font-medium mb-2">
                                    Lugar de Retiro
                                    </label>
                                    <select v-model="reservacion.lugarRetiro" class="w-full border border-gray-300 rounded p-2 bg-white input">
                                        <option disabled value="">Selecciona un lugar</option>
                                        <option v-for="loc in locaciones" :key="loc.value" :value="loc.value">
                                            {{ loc.label }}
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-2">
                                    Lugar de Devolución
                                    </label>
                                    <select v-model="reservacion.lugarDevolucion" class="w-full border border-gray-300 rounded p-2 bg-white input">
                                        <option disabled value="">Selecciona un lugar</option>
                                        <option v-for="loc in locaciones" :key="loc.value" :value="loc.value">
                                            {{ loc.label }}
                                        </option>
                                    </select>
                                </div>
                                
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium mb-2">
                                        Licencia/Carner de Conducir
                                    </label>
                                    <input type="file" accept="image/png, image/jpeg" :disabled="isSubmitting" @change="handleLicenciaChange" placeholder="Licencia de conducir" class="border border-gray-300 rounded p-2 col-span-2">
                                    <p v-if="licenciaError" class="text-red-600 text-sm mt-2">
                                        {{ licenciaError }}
                                    </p>

                                    <div v-if="licenciaPreview" class="mt-4">
                                        <p class="text-sm txet-gray-600 mb-2">Vista precia:</p>
                                        <img :src="licenciaPreview" class="w-full h-40 object-cover rounded-lg" alt="Licencia">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="border-t pt-6">
                            <h3 class="text-lg font-semibold mb-4">Servicios Adicionales</h3>
                            <div class="space-y-2">
                                <label class="flex items-center gap-2 cursor-pointer">
                                <input v-model="reservacion.seguro" type="checkbox" class="w-4 h-4">
                                <span>Seguro completo (+$500/día)</span>
                                </label>
                                <!-- <label class="flex items-center gap-2 cursor-pointer">
                                <input v-model="reservation.gpsPack" type="checkbox" class="w-4 h-4">
                                <span>GPS y Paquet wifi (+$8/día)</span>
                                </label> -->
                                <label class="flex items-center gap-2 cursor-pointer">
                                <input v-model="reservacion.sillaBebe" type="checkbox" class="w-4 h-4">
                                <span>Kit para bebé (+$450)</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="md:col-span-1">
                    <div v-if="carDetails" class="bg-white p-6 rounded-lg shadow sticky top-4">
                        <h3 class="text-2xl font-bold mb-4">Resumen</h3>

                        <div class="mb-4 pb-4 border-b">
                            <img :src="`${API_PUBLIC_URL}${carDetails.imagen}`" alt="Auto" class="w-full object-cover rounded mb-2">
                            <p class="font-semibold">{{ carDetails.marca }} {{ carDetails.modelo }}</p>
                            <p class="text-sm text-gray-600">{{ carDetails.tipoVehiculo }}</p>
                        </div>

                        <div class="space-y-2 text-sm mb-3 pb-4 border-b">
                            <div class="flex justify-between">
                                <span>Precio diario:</span>
                                <span>${{ carDetails.precioPorDia }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Dias:</span>
                                <span>{{ daysCount }}</span>
                            </div>
                            <div class="flex justify-between font-semibold text-base">
                                <span>Subtotal:</span>
                                <span>${{ subtotal }}</span>
                            </div>
                        </div>

                        <div class="space-y-2 text-sm mb-4 pb-4 border-b">
                            <div class="flex justify-between">
                                <span>Seguro:</span>
                                <span>${{ costoSeguro }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Adicionales:</span>
                                <span>${{ additionalsCost }}</span>
                            </div>
                        </div>

                        <div class="flex justify-between font-bold text-lg mb-4">
                            <span>Total:</span>
                            <span>${{ total }}</span>
                        </div>

                        <button type="button" @click="goToPayment" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                            <span v-if="isSubmitting">
                                Cargando pago...
                            </span>
                            <span v-else>
                                Continuar al Pago
                            </span>
                        </button>
                    </div>
                    <div v-else class="bg-white p-6 rounded-lg shadow text-gray-500">
                        Cargando resumen...
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue'
    import Navbar from '../components/Navbar.vue';
    import { useNavigation } from '../composables/useNavigation';
    import { useRoute } from 'vue-router';
    import { AutoServicePublic } from '../services/autoP.service';
    import { API_PUBLIC_URL } from '../config/endpointPublic';
    import { ReservacionService } from '../services/reservacion.service';

    const { goSuccess } = useNavigation()

    const route = useRoute()
    const carDetails = ref(null)
    const licenciaFile = ref(null)
    const licenciaPreview = ref(null)
    const licenciaError = ref('')
    const isSubmitting = ref(false)

    const MAX_SIZE_MB = 2
    const ALLOWED_TYPES = ['image/jpeg', 'image/png']

    const locaciones = [
        { value: 'Oficinas', label: 'Oficinas' },
        { value: 'Cancun-Centro', label: 'Cancun-Centro' },
        { value: 'Cancun-Aeropuero', label: 'Cancun-Aeropuero' },
        { value: 'Playa del Carmen', label: 'Playa del Carmen' },
    ]

    const reservacion = ref({
        fechainicio: '',
        fechafin: '',
        lugarRetiro: '',
        lugarDevolucion: '',
        seguro: false,
        sillaBebe: false,
    })

    const handleLicenciaChange = (event) => {
        const file = event.target.files[0]
        licenciaError.value = ''

        if (!file) return

        if (!ALLOWED_TYPES.includes(file.type)) {
            licenciaError.value = 'Solo se permiten imágenes JPG o PNG'
            resetLicencia()
            return
        }

        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            licenciaError.value = `La imagen no debe superar ${MAX_SIZE_MB}`
            resetLicencia()
            return
        }

        licenciaFile.value = file
        licenciaPreview.value = URL.createObjectURL(file)
    }

    const resetLicencia = () => {
        licenciaFile.value = null
        licenciaPreview.value = null
    }
 
    const daysCount = computed(() => {
        if (!reservacion.value.fechainicio || !reservacion.value.fechafin) return 0

        const inicio = new Date(reservacion.value.fechainicio)
        const fin = new Date(reservacion.value.fechafin)

        const diff = fin - inicio
        return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0
    })

    const subtotal = computed(() => {
        if (!carDetails.value) return 0

        return carDetails.value.precioPorDia * daysCount.value
    })

    const costoSeguro = computed(() => {
        return reservacion.value.seguro ? 500 * daysCount.value : 0
    })

    const additionalsCost = computed(() => {
        let cost = 0
            // if (reservacion.value.gpsPack) cost += 8 * daysCount.value
                if (reservacion.value.sillaBebe) cost += 450
        return cost
    })

    const total = computed(() => {
        return subtotal.value + costoSeguro.value + additionalsCost.value
    })

    const goToPayment = async () => {
        if (isSubmitting.value) return

        if (!reservacion.value.fechainicio || !reservacion.value.fechafin) {
            alert('Selecciona las fechas')
            return
        }

        if (!licenciaFile.value) {
            alert('Debes subir la licencia')
            return
        }

        isSubmitting.value = true

        const formData = new FormData()

        formData.append('fechainicio', reservacion.value.fechainicio)
        formData.append('fechafin', reservacion.value.fechafin)
        formData.append('seguro', reservacion.value.seguro)
        formData.append('sillabebe', reservacion.value.sillaBebe)
        formData.append('total', total.value)
        formData.append('autoId', carDetails.value.id)
        formData.append('licencia', licenciaFile.value)

        try {
            await ReservacionService.crearReserva(formData)
            goSuccess()
        } catch (error) {
            console.error(error)
            alert('Error al guardar la reservación')
        } finally {
            isSubmitting.value = false
        }
    }

    onMounted(async () => {
        const id = route.params.id
        carDetails.value = await AutoServicePublic.getById(id)
    })
</script>