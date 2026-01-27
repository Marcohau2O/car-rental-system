<template>
    <div class="min-h-screen bg-gray-50">
        <Navbar/>

        <div class="container mx-auto px-4 py-8 pt-25">
            <div class="grid md:grid-cols-3 gap-8">
                <div class="md:col-span-2">
                    <div v-if="car" class="bg-white rounded-lg overflow-hidden shadow mb-4">
                        <img :src="imageUrl" :alt="car.modelo" class="w-full h-96 object-cover">
                    </div>

                    <!-- <div class="grid grid-cols-4 gap-2">
                        <img v-for="i in 4" :key="i"
                            src=""
                            alt="Thumnail"
                            class="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80">
                    </div> -->
                </div>

                <div class="md:col-span-1">
                    <div class="bg-white p-6 rounded-lg shadow mb-4">
                        <div class="mb-4">
                            <h1 class="text-3xl font-bold text-gray-900">{{ car.marca }} {{ car.modelo }}</h1>
                            <p class="text-lg text-blue-600 font-semibold mt-2">${{ car.precioPorDia }}/dia</p>
                        </div>

                        <div class="borrder-t border-b py-4 mb-4">
                            <div class="flex justify-between mb-2">
                                <span class="text-gray-600">Transmisión:</span>
                                <span class="font-semibold">{{ car.transmision }}</span>
                            </div>
                            <div class="flex justify-between mb-2">
                                <span class="text-gray-600">Tipo:</span>
                                <span class="font-semibold">{{ car.tipoVehiculo }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Combustible:</span>
                                <span class="font-semibold">{{ car.combustible }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Puertas:</span>
                                <span class="font-semibold">{{ car.cantidadpuerta }}</span>
                            </div>

                            <div class="flex justify-between">
                                <span class="text-gray-600">Capacidad:</span>
                                <span class="font-semibold">{{ car.capacidad }} personas</span>
                            </div>

                            <div class="flex justify-between">
                                <span class="text-gray-600">Consumo:</span>
                                <span class="font-semibold">{{ car.kilometraje }} km</span>
                            </div>
                        </div>

                        <button @click="goToCheckout" class="w-full bg-blue-600 text-white py-3 mb-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                            Continuar a Reserva
                        </button>
                        <button class="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
                            Añadir a Favoritos
                        </button>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow">
                        <h3  class="text-lg font-semibold mb-4">Características</h3>
                        <ul class="space-y-2 text-gray-700">
                            <li class="flex items-center gap-2"><span>✓</span> Aire acondicionado</li>
                            <li class="flex items-center gap-2"><span>✓</span> Bluetooth</li>
                            <li class="flex items-center gap-2"><span>✓</span> Bolsa de Aire</li>
                            <!-- <li class="flex items-center gap-2"><span>✓</span> Control de crucero</li>
                            <li class="flex items-center gap-2"><span>✓</span> Entrada sin llave</li> -->
                        </ul>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow mt-8">
                <h3 class="text-2xl font-bold mb-4">Descripción</h3>
                <p class="text-gray-700 leading-relaxed"> {{ car.descripcion }}. 
                El vehículo se entrega limpio y con el tanque lleno de combustible.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue'
    import Navbar from '../components/Navbar.vue';
    import { useNavigation } from '../composables/useNavigation';
    import { API_PUBLIC_URL } from '../config/endpointPublic';
    import { AutoServicePublic } from '../services/autoP.service';
    import { useRoute } from 'vue-router';

    const { goCheckout } = useNavigation()
    
    const route = useRoute()
    const car = ref([])

    onMounted(async () => {
        const id = route.params.id
        car.value = await AutoServicePublic.getById(id)
    })

    const imageUrl = computed(() => {
        if (!car.value.imagen) {
            return '/no-image-png'
        }
        return `${API_PUBLIC_URL}${car.value.imagen}`
    })

    const goToCheckout = () => {
    goCheckout(car.value.id)
    }
</script>