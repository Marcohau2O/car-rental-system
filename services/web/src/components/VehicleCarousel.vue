<template>
    <div class="relative w-full">
        <!-- Carousel -->
        <div class="overflow-hidden">
            <div
             class="flex transition-transform duration-500 ease-in-out"
             :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
             >
                <div
                    v-for="(car, index) in vehicles"
                    :key="car.id || index"
                    class="min-w-full px-4"
                    >
                    <div class="bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">
                        <div class="h-64 md:h-full">
                            <img 
                                :src="getImagen(car.imagen)"
                                :alt="`${car.marca} ${car.modelo}`"
                                class="w-full h-full object-cover"
                            />
                        </div>

                        <div class="p-6 flex flex-col justify-between">
                            <div>
                                <h3 class="text-2xl font-bold text-gray-900">
                                    {{ car.marca }} {{ car.modelo }}
                                </h3>

                                <p class="text-blue-600 text-xl font-semibold mt-2">
                                    ${{ car.precioPorDia }}
                                </p>

                                <ul class="grid grid-cols-2 gap-3 text-sm text-gray-600 mt-4">
                                    <li>🚪 {{ car.cantidadpuerta }} puertas</li>
                                    <li>⛽ {{ car.combustible }}</li>
                                    <li>⚙️ {{ car.transmision }}</li>
                                    <li>🛣 {{ car.kilometraje }} km</li>
                                    <li>👥 {{ car.capacidad }} pasajeros</li>
                                </ul>
                            </div>

                            <button @click="navigateTo(car.id)" class="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition">
                                Reservar Ahora
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button
        @click="prev"
        class="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-gray-100"
        >
            ◀
        </button>

        <button
        @click="next"
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-gray-100"
        >
            ▶
        </button>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { API_PUBLIC_URL } from '../config/endpointPublic';
    import { useNavigation } from '../composables/useNavigation';

    const props = defineProps({
        vehicles: {
            type: Array,
            required: true
        }
    })

    const { goCarDetail } = useNavigation()
    const currentIndex = ref(0)

    const next = () => {
        if (!props.vehicles.length) return
    currentIndex.value =
        currentIndex.value === props.vehicles.length - 1 ? 0 : currentIndex.value + 1
    }

    const prev = () => {
        if (!props.vehicles.length) return
    currentIndex.value =
        currentIndex.value === 0 ? props.vehicles.length - 1 : currentIndex.value - 1
    }

    const getImagen = (imagen) => {
        if (!imagen) return '/no-imagen.png'
        return `${API_PUBLIC_URL}${imagen}`
    }

    const navigateTo = (carId) => {
        goCarDetail(carId)
    }
</script>