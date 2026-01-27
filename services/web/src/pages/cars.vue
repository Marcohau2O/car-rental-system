<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <div class="container mx-auto px-4 py-8 pt-25">
      <div class="grid md:grid-cols-4 gap-8">
        <!-- Sidebar de filtros -->
        <div class="md:col-span-1">
          <div class="bg-white p-6 rounded-lg shadow sticky top-4">
            <h3 class="text-lg font-semibold mb-4">Filtros</h3>
            
            <div class="mb-6">
              <label class="block text-sm font-medium mb-2">Tipo de Vehículo</label>
              <select v-model="filters.tipoVehiculo" class="w-full border border-gray-300 rounded p-2">
                <option value="">Todos</option>
                <option value="Pequeño">Pequeño</option>
                <option value="Coupe">Coupe</option>
                <option value="Sedán">Sedán</option>
                <option value="Suv">SUV</option>
                <option value="Van">Van</option>
                <option value="Mini Van">Mini Van</option>
              </select>
            </div>

            <div class="mb-6">
              <label class="block text-sm font-medium mb-2">Precio máximo</label>
              <input v-model.number="filters.maximoPrecio" type="range" min="0" max="500" class="w-full">
              <div class="text-sm text-gray-600 mt-2">${{ filters.maximoPrecio }}/día</div>
            </div>

            <div class="mb-6">
              <label class="block text-sm font-medium mb-2">Transmisión</label>
              <select v-model="filters.transmision" class="w-full border border-gray-300 rounded p-2">
                <option value="">Todas</option>
                <option value="Manual">Manual</option>
                <option value="Automática">Automática</option>
              </select>
            </div>

            <button @click="clearFilters" class="w-full border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50">
              Limpiar Filtros
            </button>
          </div>
        </div>

        <!-- Grid de autos -->
        <div class="md:col-span-3">
          <div class="mb-4 flex justify-between items-center">
            <p class="text-gray-600">Mostrando {{ filteredCars.length }} autos</p>
            <select v-model="sortBy" class="border border-gray-300 rounded p-2">
              <option value="price-asc">Precio menor</option>
              <option value="price-desc">Precio mayor</option>
              <option value="rating">Mejor calificación</option>
            </select>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CarCard v-for="car in filteredCars" :key="car.id" :car="car" 
                     @click="navigateTo(car.id)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import CarCard from '../components/CarCard.vue'
import { useNavigation } from '@/composables/useNavigation'
import { AutoServicePublic } from '../services/autoP.service'

const { goCarDetail } = useNavigation()

  const cars = ref([])

const filters = ref({
  tipoVehiculo: '',
  maximoPrecio: 500,
  transmision: '',
})

onMounted(async () => {
  cars.value = await AutoServicePublic.getAll();
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
  filters.value = { tipoVehiculo: '', maximoPrecio: 500, transmision: '' }
}

const navigateTo = (carId) => {
  goCarDetail(carId)
}
</script>
