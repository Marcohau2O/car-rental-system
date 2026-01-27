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
                                    <input v-model="reservation.pickupDate" type="date" class="w-full border border-gray-300 rounded p-2">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-2">Fecha de retorno</label>
                                    <input v-model="reservation.returnDate" type="date" class="w-full border border-gray-300 rounded p-2">
                                </div>
                            </div>
                        </div>

                        <div class="mb-6 border-t pt-6">
                            <h3 class="text-lg font-semibold mb-4">Ubicacion</h3>
                            <div class="grid md:grid-cols-2 gap-4">
                                <input v-model="reservation.firstName" type="select" placeholder="Nombre" class="border border-gray-300 rounded p-2">
                                <input v-model="reservation.lastName" type="text" placeholder="Apellido" class="border border-gray-300 rounded p-2">
                                <input v-model="reservation.email" type="email" placeholder="Email" class="border border-gray-300 rounded p-2 col-span-2">
                                <input v-model="reservation.phone" type="tel" placeholder="Teléfono" class="border border-gray-300 rounded p-2 col-span-2">
                                <input v-model="reservation.licenseNumber" type="text" placeholder="Número de licencia" class="border border-gray-300 rounded p-2 col-span-2">
                            </div>
                        </div>

                        <div class="border-t pt-6">
                            <h3 class="text-lg font-semibold mb-4">Servicios Adicionales</h3>
                            <div class="space-y-2">
                                <label class="flex items-center gap-2 cursor-pointer">
                                <input v-model="reservation.insurance" type="checkbox" class="w-4 h-4">
                                <span>Seguro completo (+$15/día)</span>
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer">
                                <input v-model="reservation.gpsPack" type="checkbox" class="w-4 h-4">
                                <span>GPS y Paquet wifi (+$8/día)</span>
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer">
                                <input v-model="reservation.babyKit" type="checkbox" class="w-4 h-4">
                                <span>Kit para bebé (+$12)</span>
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
                                <span>${{ insuranceCost }}</span>
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

                        <button @click="goToPayment" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                            Continuar al Pago
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

    const { goSuccess } = useNavigation()

    const route = useRoute()
    const carDetails = ref(null)

    const reservation = ref({
        pickupDate: '',
        pickupTime: '10:00',
        insurance: false,
        gpsPack: false,
        babyKit: false,
    })

    const daysCount = computed(() => {
        if (!reservation.value.pickupDate || !reservation.value.returnDate) return 0

        const inicio = new Date(reservation.value.pickupDate)
        const fin = new Date(reservation.value.returnDate)

        const diff = fin - inicio
        return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0
    })

    const subtotal = computed(() => {
        if (!carDetails.value) return 0

        return carDetails.value.precioPorDia * daysCount.value
    })

    const insuranceCost = computed(() => {
        return reservation.value.insurance ? 15 * daysCount.value : 0
    })

    const additionalsCost = computed(() => {
        let cost = 0
            if (reservation.value.gpsPack) cost += 8 * daysCount.value
                if (reservation.value.babyKit) cost += 12
        return cost
    })

    const total = computed(() => {
        return subtotal.value + insuranceCost.value + additionalsCost.value
    })

    const goToPayment = () => {
        console.log('Ir a pago')
            goSuccess()
    }

    onMounted(async () => {
        const id = route.params.id
        carDetails.value = await AutoServicePublic.getById(id)
    })
</script>