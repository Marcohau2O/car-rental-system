<template>
    <div class="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition cursor-pointer" @click="$emit('click')">
        <img v-if="car.imagen" :src="`${API_PUBLIC_URL}${car.imagen}`" alt="car.image" class="w-full h-48 object-cover">
        <div class="p-4">
            <h3 class="font-semibold text-lg mb-1">{{ car.marca }} {{ car.modelo }}</h3>
            <p class="text-sm text-gray-600 mb-3">{{ car.tipoVehiculo }}</p>
            <div class="flex justify-between items-center mb-3">
                <span class="text-blue-600 font-bold text-lg">${{ car.precioPorDia }} /dia</span>
            </div>
            <div class="text-xs text-gray-600 mb-3">
                <p>{{ car.transmision }}</p>
            </div>
            <button class="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">
                Ver Detalles
            </button>
        </div>
    </div>
</template>

<script setup>
    import { API_PUBLIC_URL } from '../config/endpointPublic'

    defineProps({
    car: Object,
    })

    defineEmits(['click'])
</script>