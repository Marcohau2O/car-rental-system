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
                    <img src="" alt="Auto de lujo" class="w-full h-full object-cover">
                </div>
            </div>
        </section>
        
        <section ref="searchSection" class="bg-white py-12 border-t">
            <div class="container mx-auto px-4">
                <h2 class="text-4xl font-bold text-center pb-5">Busca tu carrro para tu aventura</h2>
                <CarFilter @search="handleSearch"/>
            </div>
        </section>

        <section class="py-16 bg-gray-50">
            <div class="container mx-auto px-4">
                <h2 class="text-4xl font-bold text-center pb-5">¿Por que elegit nuestro servicio?</h2>
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="bg-white p-8 rounded-lg shadow">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <span class="text-2xl">🚗</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-3">Amplia Seleccion</h3>
                        <p class="text-gray-600">
                           Elegimos entre cientos de vehículos de diferentes marcas y modelos 
                        </p>
                    </div>
                    <div class="bg-white p-8 rounded-lg shadow">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <span class="text-2xl">💰</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-3">Precios Competitivos</h3>
                        <p class="text-gray-600">Obtén las mejores tarifas del mercado sin costos ocultos</p>
                    </div>
                    <div class="bg-white p-8 rounded-lg shadow">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <span class="text-2xl">⚡</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-3">Proceso Rápido</h3>
                        <p class="text-gray-600">Reserva tu auto en minutos sin trámites complicados</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import CarFilter from '../components/CarFilter.vue'

const searchSection = ref(null)

const scrollToSearch = () => {
  searchSection.value?.scrollIntoView({ behavior: 'smooth' })
}

const handleSearch = (criteria) => {
  console.log('Búsqueda:', criteria)
  useNavigation().goCars()
}
</script>