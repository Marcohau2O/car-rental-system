<template>
    <form @submit.prevent="handleSubmit" class="relative bg-white/80 backdrop-blur-xl border border-black/5 p-8 md:p-10 rounded-3xl shadow-2xl shadow-black/10 transition hover:shadow-orange-500/10">

        <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-900">Reserva tu vehículo</h3>
            <p class="text-gray-500 text-sm">Selecciona fechas y encuentra el auto ideal</p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 mb-6">
            <div class="input-group">
                <label>Fecha inicio</label>
                <input v-model="busqueda.fechaInicio" type="date">
            </div>
            <div class="input-group">
                <label>Hora inicio</label>
                <input v-model="busqueda.horaInicio" type="time" min="08:00" max="20:00">
            </div>
        
            <div class="input-group">
                <label>Fecha fin</label>
                <input v-model="busqueda.fechaFin" :min="busqueda.fechaInicio" type="date">
            </div>
            <div class="input-group">
                <label>Hora fin</label>
                <input v-model="busqueda.horaFin" type="time" min="08:00" max="20:00">
            </div>
        </div>
        <div class="grid md:grid-cols-3 gap-6 items-end">
            <div class="input-group">
                <label>Personas</label>
                <select v-model="busqueda.personas">
                    <option value="">Personas</option>
                    <option v-for="n in 8" :key="n" :value="n">{{ n }}</option>
                </select>
            </div>
            <div class="input-group">
                <label>Tipo de auto</label>
                <select v-model="busqueda.tipoAuto">
                    <option value="">Todos</option>
                    <option value="Pequeño">Pequeño</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Sedán">Sedán</option>
                    <option value="Suv">SUV</option>
                </select>
            </div>
            <div class="flex items-end">
                <button type="submit" class="w-full btn-search">
                    Buscar vehículo
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

<style scoped>
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
    transition: -3s;
    outline: none;
    font-weight: 500;
}

.input-group input:focus,
.input-group select:focus {
    border-color: #ff6b00;
    box-shadow: 0 0 0 3px rgba(255, 107, 0, .15);
}

.btn-search {
    background: #ff6b00;
    color: white;
    padding: 14px;
    border-radius: 14px;
    font-weight: 600;
    letter-spacing: .3px;
    transition: .35s;
    box-shadow: 0 10px 25px rgba(255, 107, 0, .35);
}

.btn-search:hover{
  background:#ff8533;
  transform:translateY(-2px);
  box-shadow:0 18px 40px rgba(255,107,0,.45);
}

.btn-search:active{
  transform:scale(.97);
}
</style>