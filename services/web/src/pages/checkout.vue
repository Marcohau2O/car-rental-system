<template>
    <div class="min-h-screen bg-[#f6f7fb] overflow-hidden">
        <Navbar/>

        <div class="fixed top-[-120px] right-[-120px] w-[420px] h-[420px] bg-[#ff6b00] opacity-20 blur-[130px] rounded-full animate-glow"></div>
        <div class="fixed bottom-[-120px] left-[-120px] w-[420px] h-[420px] bg-[#ff6b00] opacity-10 blur-[130px] rounded-full animate-glow"></div>

        <div class="max-w-7xl mx-auto px-4 py-10 pt-28 relative">
            <div class="grid md:grid-cols-3 gap-10">
                <div class="md:col-span-2 space-y-6">
                    <div class="card-box">
                        <h2 class="text-3xl font-extrabold mb-6 hero-title">
                            Detalles de <span class="text-[#ff6b00]">Reserva</span>
                        </h2>

                        <div class="mb-8">
                            <h3 class="section-title">Fechas</h3>
                            <div class="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label class="label">Fecha de recogida</label>
                                    <input v-model="reservacion.fechainicio" type="date" :min="Dia" class="input">
                                </div>
                                <div>
                                    <label class="label">Hora recogida</label>
                                    <input v-model="reservacion.horainicio" type="time" :min="reservacion.fechainicio === Dia ? horaActual : '08:00'" max="20:00" class="input">
                                </div>
                            </div>
                            <div class="grid md:grid-cols-2 gap-4 mt-3">
                                <div>
                                    <label class="label">Fecha de retorno</label>
                                    <input v-model="reservacion.fechafin" :min="reservacion.fechainicio || Dia" type="date" class="input">
                                </div>
                                <div>
                                    <label class="label">Hora fin</label>
                                    <input v-model="reservacion.horafin" type="time" min="08:00" max="20:00" class="input">
                                </div>
                            </div>
                        </div>

                        <div class="mb-8 border-t pt-6">
                            <h3 class="section-title">Ubicacion y Licencia/Carnet de Conducir</h3>
                            <div class="grid md:grid-cols-2 gap-4">
                                <div>
                                     <label class="label">
                                    Lugar de Retiro
                                    </label>
                                    <select v-model="reservacion.lugarRetiro" class="input">
                                        <option disabled value="">Selecciona un lugar</option>
                                        <option v-for="loc in locaciones" :key="loc.value" :value="loc.value">
                                            {{ loc.label }}
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label class="label">
                                    Lugar de Devolución
                                    </label>
                                    <select v-model="reservacion.lugarDevolucion" class="input">
                                        <option disabled value="">Selecciona un lugar</option>
                                        <option v-for="loc in locaciones" :key="loc.value" :value="loc.value">
                                            {{ loc.label }}
                                        </option>
                                    </select>
                                </div>
                                
                                <div class="md:col-span-2">
                                    <label class="label">
                                        Licencia/Carner de Conducir
                                    </label>
                                    <div class="upload-box">
                                        <input type="file" accept="image/png, image/jpeg" :disabled="isSubmitting" @change="handleLicenciaChange">
                                        <span>Subir imagen</span>
                                    </div>
                                    <p v-if="licenciaError" class="text-red-600 text-sm mt-2">
                                        {{ licenciaError }}
                                    </p>

                                    <img v-if="licenciaPreview"
                                    :src="licenciaPreview"
                                    class="w-full h-44 object-cover rounded-xl mt-4 shadow">
                                </div>
                            </div>
                        </div>

                        <div class="border-t pt-6">
                            <h3 class="section-title">Servicios Adicionales</h3>
                            <div class="space-y-3 mt-3">
                                <!-- <label class="check-row">
                                    <input v-model="reservacion.seguro" type="checkbox">
                                    Seguro completo (+$500/día)
                                </label> -->
                                <label class="check-row">
                                    <input v-model="reservacion.sillaBebe" type="checkbox">
                                    Kit para bebé (+$ 0)
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="md:col-span-1">
                    <div v-if="carDetails" class="card-box sticky top-24 animate-fadeUp">
                        <h3 class="text-2xl font-extrabold mb-5">Resumen de pago</h3>

                        <img :src="`${API_PUBLIC_URL}${carDetails.imagen}`" alt="Auto" class="w-full h-44 object-cover rounded-xl mb-3">
                        <p class="font-bold text-lg">{{ carDetails.marca }} {{ carDetails.modelo }}</p>
                        <p class="text-sm text-gray-500 mb-4">{{ carDetails.tipoVehiculo }}</p>

                        <div class="space-y-2 text-sm border-y py-4 mb-4">
                            <div class="row">
                                <span>Precio diario:</span>
                                <span>${{ carDetails.precioPorDia }}</span>
                            </div>
                            <div class="row">
                                <span>Dias:</span>
                                <span>{{ daysCount }}</span>
                            </div>
                            <div class="row font-semibold">
                                <span>Subtotal:</span>
                                <span>${{ subtotal }}</span>
                            </div>
                        </div>

                        <div class="space-y-2 text-sm mb-4">
                            <!-- <div class="row">
                                <span>Seguro:</span>
                                <span>${{ costoSeguro }}</span>
                            </div>
                            <div class="row">
                                <span>Adicionales:</span>
                                <span>${{ additionalsCost }}</span>
                            </div> -->
                            <div class="row">
                                <span>Costo Ubicacion:</span>
                                <span>${{ costoUbicacion }}</span>
                            </div>
                        </div>

                        <div class="flex justify-between font-bold text-xl mb-5">
                            <span>Total:</span>
                            <span class="text-[#ff6b00]">${{ total }}</span>
                        </div>

                        <button type="button" @click="goToPayment" class="w-full btn-pay">
                            <span v-if="isSubmitting">
                                Cargando pago...
                            </span>
                            <span v-else>
                                Continuar al Pago
                            </span>
                        </button>
                    </div>
                    <div v-else class="bg-white p-6 rounded-lg shadow text-gray-500">
                        Cargando resumen...
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
    import { useRoute } from 'vue-router';
    import { AutoServicePublic } from '../services/autoP.service';
    import { API_PUBLIC_URL } from '../config/endpointPublic';
    import { ReservacionService } from '../services/reservacion.service';

    const { goSuccess, goContrato } = useNavigation()

    const route = useRoute()
    const carDetails = ref(null)
    const licenciaFile = ref(null)
    const licenciaPreview = ref(null)
    const licenciaError = ref('')
    const isSubmitting = ref(false)
    const Dia = ref("")
    const horaActual = ref("")

    const MAX_SIZE_MB = 2
    const ALLOWED_TYPES = ['image/jpeg', 'image/png']

    const locaciones = [
        { value: 'Oficinas', label: 'Oficinas' },
        { value: 'Cancun-Centro', label: 'Cancun-Centro' },
        { value: 'Cancun-Aeropuero', label: 'Cancun-Aeropuero' },
        { value: 'Playa del Carmen', label: 'Playa del Carmen' },
    ]

    const reservacion = ref({
        fechainicio: '',
        fechafin: '',
        horainicio: '',
        horafin: '',
        lugarRetiro: '',
        lugarDevolucion: '',
        seguro: false,
        sillaBebe: false,
    })

    const handleLicenciaChange = (event) => {
        const file = event.target.files[0]
        licenciaError.value = ''

        if (!file) return

        if (!ALLOWED_TYPES.includes(file.type)) {
            licenciaError.value = 'Solo se permiten imágenes JPG o PNG'
            resetLicencia()
            return
        }

        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            licenciaError.value = `La imagen no debe superar ${MAX_SIZE_MB}`
            resetLicencia()
            return
        }

        licenciaFile.value = file
        licenciaPreview.value = URL.createObjectURL(file)
    }

    const resetLicencia = () => {
        licenciaFile.value = null
        licenciaPreview.value = null
    }

    const costoUbicacion = computed(() => {
        const retiro = reservacion.value.lugarRetiro
        const devolucion = reservacion.value.lugarDevolucion

        if (!retiro || !devolucion) return 0

        if (retiro === 'Oficinas' && devolucion === 'Oficinas') {
            return 0
        }

        return 150
    })
 
    const daysCount = computed(() => {
        if (!reservacion.value.fechainicio || !reservacion.value.fechafin) return 0

        const inicio = new Date(reservacion.value.fechainicio)
        const fin = new Date(reservacion.value.fechafin)

        const diff = fin - inicio
        return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0
    })

    const subtotal = computed(() => {
        if (!carDetails.value) return 0

        return carDetails.value.precioPorDia * daysCount.value
    })

    const costoSeguro = computed(() => {
        return reservacion.value.seguro ? 500 * daysCount.value : 0
    })

    const additionalsCost = computed(() => {
        let cost = 0
            // if (reservacion.value.gpsPack) cost += 8 * daysCount.value
                if (reservacion.value.sillaBebe) cost += 0
        return cost
    })

    const total = computed(() => {
        return subtotal.value + costoSeguro.value + additionalsCost.value + costoUbicacion.value
    })

    const validarHoras = (hora) => {
        if (!hora) return true
        return hora >= "08:00" && hora <= "20:00"
    }

    const goToPayment = async () => {
        if (isSubmitting.value) return

        if (!reservacion.value.fechainicio || !reservacion.value.fechafin) {
            alert('Selecciona las fechas')
            return
        }

        if (!licenciaFile.value) {
            alert('Debes subir la licencia')
            return
        }

        if (!validarHoras(reservacion.value.horainicio) || !validarHoras(reservacion.value.horafin)) {
            alert("Horario solo disponible de 8:00 AM a 8:00 PM")
            return
        }

        isSubmitting.value = true

        const formData = new FormData()

        formData.append('fechainicio', reservacion.value.fechainicio)
        formData.append('fechafin', reservacion.value.fechafin)
        formData.append('horainicio', reservacion.value.horainicio)
        formData.append('horafin', reservacion.value.horafin)
        formData.append('seguro', reservacion.value.seguro)
        formData.append('sillabebe', reservacion.value.sillaBebe)
        formData.append('total', total.value)
        formData.append('autoId', carDetails.value.id)
        formData.append('licencia', licenciaFile.value)

        try {
            const res = { id: 6 } //await ReservacionService.crearReserva(formData)
            goContrato(res.id) 
        } catch (error) {
            console.error(error)
            alert('Error al guardar la reservación')
        } finally {
            isSubmitting.value = false
        }
    }

    onMounted(async () => {
        const ahora = new Date()
        
        const año = ahora.getFullYear()
        const mes = String(ahora.getMonth() + 1).padStart(2, "0")
        const dia = String(ahora.getDate()).padStart(2, "0")
        Dia.value = `${año}-${mes}-${dia}`

        const horas = String(ahora.getHours()).padStart(2, "0")
        const minutos = String(ahora.getMinutes()).padStart(2, "0")
        horaActual.value = `${horas}:${minutos}`

        const id = route.params.id
        carDetails.value = await AutoServicePublic.getById(id)

        if (route.query.fechainicio) {
            reservacion.value.fechainicio = route.query.fechainicio
            reservacion.value.fechafin = route.query.fechafin
            reservacion.value.seguro = route.query.seguro === 'true'
            reservacion.value.sillaBebe = route.query.sillaBebe === 'true'
        }
    })
</script>

<style scoped>
.card-box {
  background: rgba(255,255,255,.85);
  backdrop-filter: blur(14px);
  border-radius: 22px;
  padding: 28px;
  box-shadow: 0 25px 60px rgba(0,0,0,.08);
  border:1px solid #f1f1f1;
  transition:.4s;
}
.card-box:hover {
  transform:translateY(-6px);
  box-shadow:0 30px 70px rgba(0,0,0,.12);
}

.section-title {
  font-weight:700;
  margin-bottom:12px;
  font-size:18px;
}

.label {
  display:block;
  font-size:13px;
  margin-bottom:6px;
  font-weight:600;
  color:#444;
}

.input {
  width:100%;
  border:1px solid #e5e7eb;
  padding:12px 14px;
  border-radius:12px;
  background:white;
  transition:.3s;
}

.input:focus {
  outline:none;
  border-color:#ff6b00;
  box-shadow:0 0 0 3px rgba(255,107,0,.15);
}

.upload-box {
  border:2px dashed #ddd;
  padding:20px;
  border-radius:14px;
  text-align:center;
  cursor:pointer;
  transition:.3s;
  background:#fafafa;
}
.upload-box:hover {
  border-color:#ff6b00;
  background:#fff7f0;
}

.check-row {
  display:flex;
  align-items:center;
  gap:10px;
  background:#f9fafb;
  padding:12px;
  border-radius:12px;
  cursor:pointer;
  transition:.3s;
}
.check-row:hover {
  background:#fff3ea;
}

.row {
  display:flex;
  justify-content:space-between;
}

.btn-pay {
  background:#ff6b00;
  color:white;
  padding:16px;
  border-radius:14px;
  font-weight:700;
  transition:.35s;
  box-shadow:0 15px 40px rgba(255,107,0,.35);
}
.btn-pay:hover {
  background:#ff8533;
  transform:translateY(-3px);
  box-shadow:0 25px 60px rgba(255,107,0,.45);
}

.hero-title {
  opacity:0;
  transform:translateY(40px);
  animation:titleReveal 1s ease forwards;
}

@keyframes titleReveal {
  to{opacity:1; transform:translateY(0);}
}

@keyframes glowMove {
  0%{transform:translateY(0)}
  50%{transform:translateY(-25px)}
  100%{transform:translateY(0)}
}
.animate-glow {
  animation:glowMove 7s ease-in-out infinite;
}

.animate-fadeUp {
  animation:fadeUp .8s ease;
}
@keyframes fadeUp {
  from{opacity:0; transform:translateY(30px)}
  to{opacity:1; transform:translateY(0)}
}
</style>