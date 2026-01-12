<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    
    <div class="container mx-auto px-4 py-8">
      <div class="grid md:grid-cols-4 gap-8">
        <!-- Sidebar de filtros -->
        <div class="md:col-span-1">
          <div class="bg-white p-6 rounded-lg shadow sticky top-4">
            <h3 class="text-lg font-semibold mb-4">Filtros</h3>
            
            <div class="mb-6">
              <label class="block text-sm font-medium mb-2">Tipo de Vehículo</label>
              <select v-model="filters.type" class="w-full border border-gray-300 rounded p-2">
                <option value="">Todos</option>
                <option value="economy">Economía</option>
                <option value="compact">Compacto</option>
                <option value="sedan">Sedán</option>
                <option value="suv">SUV</option>
                <option value="luxury">Lujo</option>
              </select>
            </div>

            <div class="mb-6">
              <label class="block text-sm font-medium mb-2">Precio máximo</label>
              <input v-model.number="filters.maxPrice" type="range" min="0" max="500" class="w-full">
              <div class="text-sm text-gray-600 mt-2">${{ filters.maxPrice }}/día</div>
            </div>

            <div class="mb-6">
              <label class="block text-sm font-medium mb-2">Transmisión</label>
              <select v-model="filters.transmission" class="w-full border border-gray-300 rounded p-2">
                <option value="">Todas</option>
                <option value="manual">Manual</option>
                <option value="automatic">Automática</option>
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
import { ref, computed } from 'vue'
import Navbar from '../components/Navbar.vue'
import CarCard from '../components/CarCard.vue'
import { useNavigation } from '@/composables/useNavigation'

const { goCarDetail } = useNavigation()

const cars = ref([
  { id: 1, brand: 'Toyota', model: 'Corolla', type: 'sedan', price: 45, transmission: 'automatic', image: '', rating: 4.5 },
  { id: 2, brand: 'Honda', model: 'Civic', type: 'compact', price: 40, transmission: 'automatic', image: '', rating: 4.3 },
  { id: 3, brand: 'Tesla', model: 'Model 3', type: 'luxury', price: 120, transmission: 'automatic', image: '', rating: 4.8 },
  { id: 4, brand: 'Hyundai', model: 'Elantra', type: 'economy', price: 35, transmission: 'automatic', image: '', rating: 4.2 },
  { id: 5, brand: 'Jeep', model: 'Cherokee', type: 'suv', price: 85, transmission: 'automatic', image: '', rating: 4.6 },
  { id: 6, brand: 'BMW', model: 'Series 3', type: 'luxury', price: 150, transmission: 'automatic', image: '', rating: 4.9 },
])

const filters = ref({
  type: '',
  maxPrice: 500,
  transmission: '',
})

const sortBy = ref('price-asc')

const filteredCars = computed(() => {
  let result = cars.value.filter(car => {
    const typeMatch = !filters.value.type || car.type === filters.value.type
    const priceMatch = car.price <= filters.value.maxPrice
    const transmissionMatch = !filters.value.transmission || car.transmission === filters.value.transmission
    return typeMatch && priceMatch && transmissionMatch
  })

  if (sortBy.value === 'price-asc') result.sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price-desc') result.sort((a, b) => b.price - a.price)
  if (sortBy.value === 'rating') result.sort((a, b) => b.rating - a.rating)

  return result
})

const clearFilters = () => {
  filters.value = { type: '', maxPrice: 500, transmission: '' }
}

const navigateTo = (carId) => {
  goCarDetail(carId)
}
</script>
