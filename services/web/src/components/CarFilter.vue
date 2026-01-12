<template>
    <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded-lg shadow">
        <div class="grid md:grid-cols-5 gap-4">
            <div>
                <label class="block text-sm font-medium mb-2">Recogido</label>
                <input v-model="criteria.pickupDate" type="date" class="w-full border border-gray-300 rounded p-2">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Retorno</label>
                <input v-model="criteria.returnDate" type="date" class="w-full border border-gray-300 rounded p-2">
            </div>
            <div>
                <label class="block text-sm font-semibold mb-2">Ubicación recogida</label>
                <select v-model="criteria.pickupLocation" class="w-full border border-gray-300 rounded p-2">
                    <option>Aeropuerto</option>
                    <option>Centro ciudad</option>
                    <option>Hotel</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Tipo de auto</label>
                <select v-model="criteria.carType" class="w-full border border-gray-300 rounded p-2">
                    <option value="">Todos</option>
                    <option value="economy">Economía</option>
                    <option value="sedan">Sedán</option>
                    <option value="suv">SUV</option>
                </select>
            </div>
            <div class="flex items-end">
                <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">
                    Buscar
                </button>
            </div>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue'

const criteria = ref({
    pickupDate: '',
    returnDate: '',
    pickupLocation: 'Aeropuerto',
    carType: '',
})

const emit = defineEmits(['search'])

const handleSubmit = () => {
  emit('search', criteria.value)
}
</script>