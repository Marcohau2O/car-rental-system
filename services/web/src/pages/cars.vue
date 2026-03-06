<template>
  <div class="min-h-screen bg-[#f4f6f8]">
    <Navbar />
    
  <section class="mx-auto max-w-7xl px-4 py-16 md:py-24">

    <div class="relative overflow-hidden rounded-3xl mb-10">
      
      <div class="absolute inset-0 bg-gradient-to-r from-black via-[#111] to-[#e5be01]"></div>
      <div class="absolute -right-32 -top-32 w-[420px] h-[420px] bg-[#e5be01] opacity-20 blur-[120px] rounded-full animate-pulse"></div>
      <div class="relative px-8 md:px-14 py-12 md:py-16 flex items-center min-h-[180px]">

        <div class="max-w-xl">
          <h1 class="hero-title text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-white">
            Explora nuestros
            <span class="text-[#e5be01]"> Vehículos</span>
          </h1>
          <p class="hero-sub text-gray-300 mt-4 text-lg">
            Encuentra el auto perfecto para tu viaje
          </p>
        </div>
      </div>
    </div>


    <div class="container mx-auto px-4 py-3">
      <div class="grid md:grid-cols-4 gap-8">
        <!-- Sidebar de filtros -->
        <div class="md:col-span-1">
          <div class="filter-box sticky top-24">
            <h3 class="text-lg font-bold mb-6">Filtros</h3>
            
            <div class="input-group mb-6">
              <label>Tipo de Vehículo</label>
              <select v-model="filters.tipoVehiculo">
                <option value="">Todos</option>
                <option value="Pequeño">Pequeño</option>
                <option value="Coupe">Coupe</option>
                <option value="Sedán">Sedán</option>
                <option value="Suv">SUV</option>
                <option value="Van">Van</option>
                <option value="Mini Van">Mini Van</option>
              </select>
            </div>

            <div class="input-group mb-6">
              <label>Precio máximo</label>
              <input v-model.number="filters.maximoPrecio" type="range" min="0" max="5000" class="w-full">
              <div class="text-sm text-gray-500 mt-2 font-semibold">${{ filters.maximoPrecio }}/día</div>
            </div>

            <div class="input-group mb-6">
              <label>Transmisión</label>
              <select v-model="filters.transmision">
                <option value="">Todas</option>
                <option value="Manual">Manual</option>
                <option value="Automática">Automática</option>
              </select>
            </div>

            <button @click="clearFilters" class="btn-clear">
              Limpiar Filtros
            </button>
          </div>
        </div>

        <!-- Grid de autos -->
        <div class="md:col-span-3">
          <div class="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
            <h2 class="text-2xl font-bold text-gray-800">{{ filteredCars.length }} vehículo disponibles</h2>
            <div class="input-group">
              <select v-model="sortBy" class="w-[220px]">
              <option value="price-asc">Precio menor</option>
              <option value="price-desc">Precio mayor</option>
              <option value="rating">Mejor calificación</option>
            </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CarCard v-for="car in filteredCars" :key="car.id" :car="car" 
                     @click="navigateTo(car.id)" class="car-card group" />
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import CarCard from '../components/CarCard.vue'
import { useNavigation } from '@/composables/useNavigation'
import { AutoServicePublic } from '../services/autoP.service'
import { useRoute } from 'vue-router'

const { goCarDetail } = useNavigation()

  const cars = ref([])
  const capacidadBuscada = ref(null)
  const fechaInicio = ref(null)
  const fechaFin = ref(null)

const filters = ref({
  tipoVehiculo: '',
  maximoPrecio: 5000,
  transmision: '',
})

const route = useRoute()

onMounted(async () => {
  const query = route.query
  cars.value = await AutoServicePublic.getAll();
  if (query.tipoAuto) filters.value.tipoVehiculo = query.tipoAuto
  if (query.personas) capacidadBuscada.value = Number(query.personas)
  if (query.fechaInicio) fechaInicio.value = query.fechaInicio
  if (query.fechaFin) fechaFin.value = query.fechaFin
})

const sortBy = ref('price-asc')

const filteredCars = computed(() => {
  let result = cars.value.filter(car => {
    const typeMatch = !filters.value.tipoVehiculo || car.tipoVehiculo === filters.value.tipoVehiculo
    const priceMatch = car.precioPorDia <= filters.value.maximoPrecio
    const transmissionMatch = !filters.value.transmision || car.transmision === filters.value.transmision
    return typeMatch && priceMatch && transmissionMatch
  })

  if (sortBy.value === 'price-asc') result.sort((a, b) => a.precioPorDia - b.precioPorDia)
  if (sortBy.value === 'price-desc') result.sort((a, b) => b.precioPorDia - a.precioPorDia)

  return result
})

const clearFilters = () => {
  filters.value = { tipoVehiculo: '', maximoPrecio: 5000, transmision: '' }
}

const navigateTo = (carId) => {
  goCarDetail(carId)
}
</script>

<style scoped>
.filter-box {
  background: white;
  padding: 28px;
  border-radius: 20px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, .08);
  border:1px solid #f1f1f1;
}

.input-group {
    display: flex;
    flex-direction: column;
}

.input-group label {
    font-size: 13px;
    color:#6b7280;
    margin-bottom:6px;
    font-weight:500;
}

.input-group input,
.input-group select {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 12px;
    background: white;
    transition: .3s;
    outline: none;
    font-weight: 500;
}

.input-group input:focus,
.input-group select:focus {
    border-color: #e5be01;
    box-shadow: 0 0 0 3px rgba(255, 107, 0, .15);
}

.btn-clear {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  background: #111;
  color: white;
  font-weight: 600;
  transition: .3s;
}

.btn-clear:hover {
  background: #e5be01;
  transform: translateY(-2px);
  box-shadow:0 18px 35px rgba(255,107,0,.45);
}

.btn-clear:active {
  transform: scale(.96);
}

.car-card {
  transition: .4s;
  animation:fadeUp .6s ease;
}

.car-card:hover {
  transform: translateY(-10px) scale(1.02);
}

@keyframes glowMove{
  0%{transform:translateY(0)}
  50%{transform:translateY(-20px)}
  100%{transform:translateY(0)}
}

.animate-glow{
  animation: glowMove 6s ease-in-out infinite;
}

.hero-title{
  opacity:0;
  transform:translateY(40px);
  animation:titleReveal 1s ease forwards;
}

.hero-title span{
  opacity:0;
  transform:translateY(25px);
  animation:titleReveal 1s ease forwards;
  animation-delay:.35s;
}

.hero-sub{
  opacity:0;
  transform:translateY(25px);
  animation:titleReveal 1s ease forwards;
  animation-delay:.6s;
}

@keyframes titleReveal{
  to{
    opacity:1;
    transform:translateY(0);
  }
}
</style>