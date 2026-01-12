<template>
    <div class="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition cursor-pointer" @click="$emit('click')">
        <img src="" alt="car.image" class="w-full h-48 object-cover">
        <div class="p-4">
            <h3 class="font-semibold text-lg mb-1">{{ car.brand }} {{ car.model }}</h3>
            <p class="text-sm text-gray-600 mb-3">{{ car.type }}</p>
            <div class="flex justify-between items-center mb-3">
                <span class="text-blue-600 font-bold text-lg">${{ car.price }} /dia</span>
                <span class="text-yellow-500">⭐ {{ car.rating }}</span>
            </div>
            <div class="text-xs text-gray-600 mb-3">
                <p>{{ car.transmission }}</p>
            </div>
            <button class="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">
                Ver Detalles
            </button>
        </div>
    </div>
</template>

<script setup>
defineProps({
  car: Object,
})

defineEmits(['click'])
</script>