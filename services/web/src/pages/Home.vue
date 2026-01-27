<template>
    <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Navbar/>
        
        <section class="container mx-auto px-4 py-16 md:py-24">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Renta de Autos Fácil y Confiable</h1>
                    <p class="text-xl text-gray-600 mb-8">
                        Encuentra el auto perfecto para tu viaje. Tarifas competitivas, proceso simple y atención al cliente excepcional.
                    </p>
                    <button @click="scrollToSearch" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                        Buscar Autos
                    </button>
                </div>
                <div class="relative h-96 bg-blue-100 rounded-3xl overflow-hidden">
                    <img src="../assets/imgs/car-image.jpg" alt="Auto de lujo" class="w-full h-full object-cover">
                </div>
            </div>
        </section>
        
        <section ref="searchSection" class="bg-white py-12">
            <div class="container mx-auto px-4">
                <h2 class="text-4xl font-bold text-center pb-5">Busca tu carro para tu aventura</h2>
                <CarFilter @search="handleSearch"/>
            </div>
        </section>

        <section class="py-16 bg-gray-50">
            <div class="container mx-auto px-4">
                <h2 class="text-4xl font-bold text-center pb-5">¿Por que elegir nuestro servicio?</h2>
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="bg-white p-8 rounded-lg shadow">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <span class="text-2xl">🚗</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-3">Renta sin Trajeta de crédito</h3>
                        <p class="text-gray-600">
                           Elegimos entre cientos de vehículos de diferentes marcas y modelos 
                        </p>
                    </div>
                    <div class="bg-white p-8 rounded-lg shadow">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <span class="text-2xl">💰</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-3">Seguro Total GNP Incluido en tu Tarifa</h3>
                        <p class="text-gray-600">Obtén las mejores tarifas del mercado sin costos ocultos</p>
                    </div>
                    <div class="bg-white p-8 rounded-lg shadow">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <span class="text-2xl">⚡</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-3">Entrega Inmediata en el Aeropuerto</h3>
                        <p class="text-gray-600">Reserva tu auto en minutos sin trámites complicados</p>
                    </div>
                </div>
            </div>
        </section>

        <section  class="py-16 bg-gray-50">
            <div class="container mx-auto px-4">
                <h2 class="text-4xl font-bold text-center pb-5">Solo con 4 Pasos Obtiene tu Auto</h2>
                <div class="grid md:grid-cols-4 gap-5">
                    <div class="bg-white p-8 rounded-lg shadow">
                        <h3 class="text-xl font-semibold mb-3">Cotiza</h3>
                        <p class="text-gray-600">
                            1
                        </p>
                    </div>
                    <div class="bg-white p-8 rounded-lg shadow">
                        <h3 class="text-xl font-semibold mb-3">Reserva sin Depósito</h3>
                        <p class="text-gray-600">
                            2
                        </p>
                    </div>
                    <div class="bg-white p-8 rounded-lg shadow">
                        <h3 class="text-xl font-semibold mb-3">Recibe en el Aeropuerto</h3>
                        <p class="text-gray-600">
                            3
                        </p>
                    </div>
                    <div class="bg-white p-8 rounded-lg shadow">
                        <h3 class="text-xl font-semibold mb-3">" Comienza tu Aventura "</h3>
                        <p class="text-gray-600">
                            4
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="container mx-auto px-4 py-16">
            <h2 class="text-4xl font-bold text-center mb-10">
                Vehiculos Disponibles
            </h2>

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

import { AutoServicePublic } from '../services/autoP.service'

const vehicles = ref([])

const searchSection = ref(null)

const scrollToSearch = () => {
  searchSection.value?.scrollIntoView({ behavior: 'smooth' })
}

const handleSearch = (criteria) => {
  console.log('Búsqueda:', criteria)
  useNavigation().goCars()
}

onMounted(async () => {
    vehicles.value = await AutoServicePublic.getAll()
})

</script>