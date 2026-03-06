<template>
    <div class="min-h-screen bg-[#f5f5f5] overflow-hidden">
        <Navbar/>

        <div class="fixed top-[-150px] right-[-150px] w-[500px] h-[500px] bg-[#e5be01] opacity-20 blur-[140px] rounded-full"></div>
        <div class="fixed bottom-[-150px] left-[-150px] w-[500px] h-[500px] bg-[#e5be01] opacity-10 blur-[140px] rounded-full"></div>

        <div class="max-w-7xl mx-auto px-4 py-10 pt-28 relative">
            <div class="grid lg:grid-cols-3 gap-10">
                <div class="lg:col-span-2 space-y-8">
                    <div v-if="car" class="card-box overflow-hidden group">
                        <img :src="imageUrl" :alt="car.modelo" class="w-full h-[21rem] p-2 object-cover transition duration-700 group-hover:scale-105">
                        <div class="absolute top-10 left-10 bg-green-700/70 backdrop-blur-md px-10 py-3 rounded-full text-white text-xs">Disponible</div>
                    </div>

                    <div class="card-box">
                        <h3 class="text-2xl font-bold mb-4 text-gray-900 hero-title">Descripción</h3>
                        <p class="text-gray-600 leading-relaxed hero-sub"> {{ car.descripcion }}.
                            El vehículo se entrega limpio y con el tanque lleno de combustible.</p>
                    </div>
                </div>

                <div class="lg:col-span-1">
                    <div class="card-box sticky top-24">
                        <div class="mb-6">
                            <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 hero-title">{{ car.marca }} {{ car.modelo }}</h1>
                            <p class="text-2xl text-[#e5be01] font-bold mt-3">
                                ${{ car.precioPorDia }} <span class="text-sm text-gray-500">/ dia</span>
                            </p>
                        </div>

                        <div class="space-y-2">
                            <div class="info-row flex justify-between">
                                <span>Transmisión:</span>
                                <span class="font-semibold">{{ car.transmision }}</span>
                            </div>
                            <div class="info-row flex justify-between">
                                <span>Tipo:</span>
                                <span class="font-semibold">{{ car.tipoVehiculo }}</span>
                            </div>
                            <div class="info-row flex justify-between">
                                <span>Combustible:</span>
                                <span class="font-semibold">{{ car.combustible }}</span>
                            </div>
                            <div class="info-row flex justify-between">
                                <span>Puertas:</span>
                                <span class="font-semibold">{{ car.cantidadpuerta }}</span>
                            </div>

                            <div class="info-row flex justify-between">
                                <span>Capacidad:</span>
                                <span class="font-semibold">{{ car.capacidad }} personas</span>
                            </div>

                            <div class="info-row flex justify-between">
                                <span>Consumo:</span>
                                <span class="font-semibold">{{ car.kilometraje }} km</span>
                            </div>
                        </div>

                        <div class="space-y-2">
                            <button @click="goToCheckout" class="w-full btn-button mt-7">
                                Continuar a Reserva
                            </button>
                            <button @click="goCotizar(car.id)" class="w-full btn-button mt-4">
                                Cotizar Vehiculo
                            </button>
                        </div>
                    </div>

                    <div class="card-box mt-6">
                        <h3  class="text-lg font-bold mb-4 text-gray-900">Características</h3>
                        <ul class="space-y-3 text-gray-600 text-sm">
                            <li class="flex items-center gap-3"><span>✓</span> Aire acondicionado</li>
                            <li class="flex items-center gap-3"><span>✓</span> Bluetooth</li>
                            <li class="flex items-center gap-3"><span>✓</span> Bolsa de Aire</li>
                            <!-- <li class="flex items-center gap-2"><span>✓</span> Control de crucero</li>
                            <li class="flex items-center gap-2"><span>✓</span> Entrada sin llave</li> -->
                        </ul>
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
    import { API_PUBLIC_URL } from '../config/endpointPublic';
    import { AutoServicePublic } from '../services/autoP.service';
    import { useRoute } from 'vue-router';

    const { goCheckout, goCotizar } = useNavigation()

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

<style scoped>
.btn-button {
    background: #e5be01;
    color: white;
    padding: 12px 18px;
    border-radius: 16px;
    font-weight: 600;
    letter-spacing: .3s;
    transition: .35s;
    box-shadow: 0 15px 35px rgba(255, 107, 0, .35);
    white-space: nowrap;
}

.btn-button:hover {
    background: #ff8533;
    transform: translateY(-3px);
    box-shadow: 0 25px 60px rgba(255, 107, 0, .45);
}

.btn-button:active {
    transform: scale(.96);
}

.card-box{
  background: rgba(255,255,255,.92);
  backdrop-filter: blur(14px);
  border-radius: 22px;
  padding: 18px;
  box-shadow: 0 25px 60px rgba(0,0,0,.08);
  border:1px solid #f1f1f1;
  transition:.4s;
}

.card-box:hover{
  transform:translateY(-6px);
  box-shadow:0 35px 80px rgba(0,0,0,.12);
}

.info-row{
  background:#f9fafb;
  padding:13px 14px;
  border-radius:12px;
  font-size:14px;
}

.hero-title{
  opacity:0;
  transform:translateY(30px);
  animation:titleReveal .8s ease forwards;
}

.hero-sub{
  opacity:0;
  transform:translateY(20px);
  animation:titleReveal .8s ease forwards;
  animation-delay:.3s;
}

@keyframes titleReveal{
  to{opacity:1; transform:translateY(0);}
}

@keyframes glowMove{
  0%{transform:translateY(0)}
  50%{transform:translateY(-25px)}
  100%{transform:translateY(0)}
}

.animate-glow{
  animation:glowMove 8s ease-in-out infinite;
}
</style>