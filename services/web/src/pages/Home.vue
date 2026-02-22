<template>
    <div class="min-h-screen bg-[#f5f5f5] overflow-hidden">
        <Navbar/>
        
        <section class="container mx-auto px-4 py-20 md:py-28">

            <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff6b00]/20 blur-3xl rounded-full"></div>

            <div class="grid md:grid-cols-2 gap-14 items-center">
                <div class="animate-fade-up">
                    <h1 class="text-5xl md:text-6xl font-extrabold mb-6 leading-tightd">
                        Renta de Autos <br>
                        <span class="text-[#ff6b00]">Fácil y Confiable</span>
                    </h1>
                    <p class="text-xl text-gray-600 mb-8">
                        Encuentra el auto perfecto para tu viaje. Tarifas competitivas, proceso simple y atención al cliente excepcional.
                    </p>
                    <div class="flex gap-4 flex-wrap">
                        <button @click="scrollToSearch" class="btn-reservar">
                            Buscar Autos
                        </button>
                    </div>
                </div>
                <div>
                    <!-- <div class="absolute -bottom-10 -left-10 w-72 h-72 bg-[#ff6b00]/20 blur-3xl rounded-full"></div> -->

                    <div class="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl group">
                        <img src="../assets/imgs/car-image.jpg" alt="Auto de lujo" class="w-full h-full object-cover group-hover:scale-105 transition duration-700">

                        <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                </div>
            </div>
        </section>
        
        <section ref="searchSection" class="bg-white py-12">
            <div class="container mx-auto px-4">
                <CarFilter @search="handleSearch"/>
            </div>
        </section>

        <section class="py-16 bg-gray-50">
            <div class="container mx-auto px-4">
                <div class="text-center mb-10">
                    <h2 class="text-4xl font-bold text-gray-900">¿Por qué elegir AutoRent?</h2>
                    <p class="text-gray-500 mt-2 text-sm">Seguro y Rapido</p>
                </div>
                <div class="grid md:grid-cols-3 gap-10">
                    <div class="benefit-card">
                        <div class="icon-box">🚗</div>
                        <h3>Renta sin Trajeta de crédito</h3>
                        <p>
                           Elegimos entre cientos de vehículos de diferentes marcas y modelos 
                        </p>
                    </div>
                    <div class="benefit-card">
                        <div class="icon-box">💰</div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">Seguro Total GNP Incluido en tu Tarifa</h3>
                        <p class="text-gray-500 leading-relaxed">Obtén las mejores tarifas del mercado sin costos ocultos</p>
                    </div>
                    <div class="benefit-card">
                        <div class="icon-box">⚡</div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">Entrega Inmediata en el Aeropuerto</h3>
                        <p class="text-gray-500 leading-relaxed">Reserva tu auto en minutos sin trámites complicados</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="container mx-auto px-4 py-16">

            <VehicleCarousel :vehicles="vehicles"/>

            <div class="pt-20">
                <ComoTrabajar/>
            </div>

            <div class="pt-20">
                <Testimonios/>
            </div>
        </section>

        <Footer />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import CarFilter from '../components/CarFilter.vue'
import Footer from '../components/Footer.vue'
import VehicleCarousel from '../components/VehicleCarousel.vue'
import Testimonios from '../components/Testimonios.vue'
import ComoTrabajar from '../components/ComoTrabajar.vue'
import { useRouter } from 'vue-router'

import { AutoServicePublic } from '../services/autoP.service'

const vehicles = ref([])
const router = useRouter()
const searchSection = ref(null)

const scrollToSearch = () => {
  searchSection.value?.scrollIntoView({ behavior: 'smooth' })
}

const handleSearch = (criteria) => {
  console.log('Búsqueda:', criteria)
//   useNavigation().goCars()
    router.push({
        path: "/cars",
         query: {
            fechaInicio: criteria.fechaInicio,
            horaInicio: criteria.horaInicio,
            fechaFin: criteria.fechaFin,
            horaFin: criteria.horaFin,
            personas: criteria.personas,
            tipoAuto: criteria.tipoAuto
        }
    })
}

onMounted(async () => {
    vehicles.value = await AutoServicePublic.getAll()
})

</script>

<style scoped>
@keyframes fadeUp {
    from {opacity: 0; transform: translateY(40px);}
    to{opacity: 1; transform: translateY(0);}
}

@keyframes fadeRight {
    from {opacity:0; transform: translateX(60px);}
    to {opacity:1; transform: translateX(0);}
}

.animate-fade-up { animation: fadeUp .8s ease; }
.animate-fade-right { animation: fadeRight 1s ease; }

.benefit-card {
    background: white;
    padding: 40px 28px;
    border-radius: 22px;
    text-align: center;
    box-shadow: 0 10px 35px rgba(0, 0, 0, .08);
    transition: .45s;
    position: relative;
    border: 1px solid #f3f4f6;
}
.benefit-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 70px rgba(255, 107, 0, .25);
}

.icon-box{
  width:70px;
  height:70px;
  margin:auto;
  margin-bottom:20px;
  border-radius:20px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:700;
  font-size:22px;
  background:#111;
  color:white;
  transition:.4s;
  box-shadow:0 10px 30px rgba(0,0,0,.25);
}

.benefit-card:hover .icon-box {
    background:#ff6b00;
    transform:scale(1.1) rotate(-6deg);
    box-shadow:0 20px 40px rgba(255,107,0,.45);
}

.btn-reservar {
    background: #ff6b00;
    color: white;
    padding: 16px 26px;
    border-radius: 16px;
    font-weight: 600;
    letter-spacing: .3px;
    transition: .35s;
    box-shadow: 0 15px 35px rgba(255, 107, 0, .35);
    white-space: nowrap;
}

.btn-reservar:hover {
    background: #ff8533;
    transform: translateY(-3px);
    box-shadow:0 25px 60px rgba(255,107,0,.45);
}

.btn-reservar:active {
    transform: scale(.96);
}
</style>