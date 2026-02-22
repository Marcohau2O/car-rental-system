<template>
    <div class="relative w-full py-10">

        <div class="text-center mb-10">
            <h2 class="text-4xl font-bold text-gray-900">Vehículo disponible</h2>
            <p class="text-gray-500 mt-2">
               Elige el vehículo perfecto para tu viaje 
            </p>
        </div>
        <div class="overflow-hidden">
            <div
             class="flex transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
             :style="{ transform: `translateX(-${currentIndex * 50}%)` }"
             >
                <div
                    v-for="(car, index) in vehicles"
                    :key="car.id || index"
                    class="min-w-1/2 flex justify-center px-4"
                    >
                    <div class="card-car max-w-md mx-auto h-[30rem]">
                        <div class="relative  h-[160px] md:h-[200px] bg-black overflow-hidden rounded-t-2xl">
                            <img 
                                :src="getImagen(car.imagen)"
                                :alt="`${car.marca} ${car.modelo}`"
                                class="w-full h-full object-contain bg-gradient-to-br from-gray-100 to-white p-4 transition duration-700 hover:scale-105"
                            />

                            <div class="absolute top-3 left-3 bg-green-700/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs">
                                Disponible
                            </div>
                        </div>

                        <div class="p-2 flex flex-col justify-between gap-5">
                            <div>
                                <h3 class="text-xl font-bold text-gray-900">
                                    {{ car.marca }} {{ car.modelo }}
                                </h3>

                                <div class="text-xl font-bold text-[#ff6b00] mt-1">
                                    ${{ car.precioPorDia }}
                                    <span class="text-sm text-gray-500 font-normal">/dia</span>
                                </div>

                                <ul class="grid grid-cols-2 gap-3 text-gray-600 mt-4 text-sm">
                                    <li class="spec">🚪 {{ car.cantidadpuerta }} puertas</li>
                                    <li class="spec">⛽ {{ car.combustible }}</li>
                                    <li class="spec">⚙️ {{ car.transmision }}</li>
                                    <li class="spec">🛣 {{ car.kilometraje }} km</li>
                                    <li class="spec col-span-2">👥 {{ car.capacidad }} pasajeros</li>
                                </ul>
                            </div>

                            <div class="flex items-center">
                                <button @click="navigateTo(car.id)" class="btn-reservar">
                                    Reservar Ahora
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button
        @click="prev"
        class="nav-btn left-0"
        >
            ◀
        </button>

        <button
        @click="next"
        class="nav-btn right-0"
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
        if (currentIndex.value >= props.vehicles.length -2) {
            currentIndex.value = 0
        } else {
            currentIndex.value++
        }
    }

    const prev = () => {
        if (!props.vehicles.length) return
        if (currentIndex.value === 0) {
            currentIndex.value = props.vehicles.length - 2
        } else {
            currentIndex.value--
        }
    }

    const getImagen = (imagen) => {
        if (!imagen) return '/no-imagen.png'
        return `${API_PUBLIC_URL}${imagen}`
    }

    const navigateTo = (carId) => {
        goCarDetail(carId)
    }
</script>

<style scoped>
.card-car {
    background: white;
    border-radius: 28px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, .12);
    transition: .4s;
    border:1px solid #f1f1f1;
}

.card-car:hover {
    transform: translateY(-8px);
    box-shadow: 0 35px 80px rgba(255, 107, 0, .25);
}

.spec {
    background: #f9fafb;
    padding: 6px 8px;
    border-radius: 10px;
    font-weight: 500;
}

.btn-reservar {
    background: #ff6b00;
    color: white;
    padding: 10px 22px;
    border-radius: 10px;
    font-weight: 600;
    letter-spacing: .3px;
    transition: .35s;
    box-shadow: 0 10px 25px rgba(255, 107, 0, .35);
    white-space: nowrap;
}

.btn-reservar:hover {
    background: #ff8533;
    transform: translateY(-2px);
    box-shadow:0 18px 35px rgba(255,107,0,.45);
}

.btn-reservar:active {
    transform: scale(.96);
}

.nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 28px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, .15);
    transition: .3s;
}

.nav-btn:hover {
    background: #ff6b00;
    color: white;
    transform: translateY(-50%) scale(1.1);
}
.left-0{ left:-10px; }
.right-0{ right:-10px; }
</style>