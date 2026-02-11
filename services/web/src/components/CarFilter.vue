<template>
    <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded-lg shadow">
        <div class="grid md:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium mb-2 p-1ou">Fecha inicio</label>
                <input v-model="busqueda.fechaInicio" type="date" class="w-full border border-gray-300 rounded p-2">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2 p-1">Hora inicio</label>
                <input v-model="busqueda.horaInicio" type="time" min="08:00" max="20:00" class="w-full border border-gray-300 rounded p-2">
            </div>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium mb-2 p-1">Fecha fin</label>
                <input v-model="busqueda.fechaFin" :min="busqueda.fechaInicio" type="date" class="w-full border border-gray-300 rounded p-2">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2 p-1">Hora fin</label>
                <input v-model="busqueda.horaFin" type="time" min="08:00" max="20:00" class="w-full border border-gray-300 rounded p-2">
            </div>
        </div>
        <div class="grid md:grid-cols-3 gap-4 items-end">
            <div>
                <label class="block text-sm font-semibold mb-2">Personas</label>
                <select v-model="busqueda.personas" class="w-full border border-gray-300 rounded p-2">
                    <option value="">Personas</option>
                    <option v-for="n in 8" :key="n" :value="n">{{ n }}</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Tipo de auto</label>
                <select v-model="busqueda.tipoAuto" class="w-full border border-gray-300 rounded p-2">
                    <option value="">Todos</option>
                    <option value="Pequeño">Pequeño</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Sedán">Sedán</option>
                    <option value="Suv">SUV</option>
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

const busqueda = ref({
    fechaInicio:'',
    horaInicio:'',
    fechaFin:'',
    horaFin:'',
    personas:'',
    tipoAuto:''
})

const validarHoras = (hora) => {
    if (!hora) return true
    return hora >= "08:00" && hora <= "20:00"
}

const emit = defineEmits(['search'])

const handleSubmit = () => {
    if (!validarHoras(busqueda.value.horaInicio) || !validarHoras(busqueda.value.horaFin)) {
        alert("Horario solo disponible de 8:00 AM a 8:00 PM")
        return
    }
  emit('search', busqueda.value)
}
</script>