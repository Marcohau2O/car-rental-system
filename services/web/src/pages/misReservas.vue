<template>
    <div class="min-h-screen bg-[#f6f7fb] overflow-hidden">
        <Navbar/>

        <div class="fixed top-[-120px] right-[-120px] w-[420px] h-[420px] bg-[#ff6b00] opacity-20 blur-[130px] rounded-full animate-glow"></div>
        <div class="fixed bottom-[-120px] left-[-120px] w-[420px] h-[420px] bg-[#ff6b00] opacity-10 blur-[130px] rounded-full animate-glow"></div>

        <div class="max-w-7xl mx-auto px-4 py-10 pt-28 relative">
            <div class="mb-10">
                <h1 class="text-4xl font-extrabold hero-title">
                    Mis <span class="text-[#ff6b00]">Reservas</span>
                </h1>
                <p class="text-gray-500 mt-2">Consulta el estado de tus rentas</p>
            </div>

            <div v-if="loading" class="card-box text-gray-500 animate-fadeUp">
                Cargando reservaciones...
            </div>

            <div v-else-if="reservas.length === 0" class="card-box text-center animate-fadeUp">
                <p class="text-gray-600">No tienes reservaciones resgistradas.</p>
            </div>

            <div v-else class="space-y-6">
                <div
                    v-for="reserva in reservas"
                    :key="reserva.id"
                    class="reservation-card animate-fadeUp"
                    >
                    <div class="relative">
                        <img :src="`${API_PUBLIC_URL}${reserva.auto.imagen}`" alt="Auto" class="w-full h-40 object-cover rounded-xl">
                        <span class="status-badge" :class="estadoColor(reserva.estado)">
                            {{ reserva.estado }}
                        </span>
                    </div>

                    <div class="md:col-span-2">
                        <h3 class="text-xl font-bold mb-1">
                            {{ reserva.auto.marca }} {{ reserva.auto.modelo }}
                        </h3>
                        <p class="text-sm text-gray-500 mb-3">
                            Confirmación: <strong>{{ reserva.confirmacion }}</strong>
                        </p>

                        <div class="grid md:grid-cols-2 gap-3 text-sm">
                            <div class="info-row">
                                Fechas:
                                {{ formatDate(reserva.fechainicio) }}
                                →
                                {{ formatDate(reserva.fechafin) }}
                            </div>

                            <div class="info-row">
                                Horas:
                                {{ reserva.horainicio }}
                                →
                                {{ reserva.horafin }}
                            </div>

                            <div class="info-row">
                                Seguro:
                                <span :class="reserva.seguro ? 'text-green-600' : 'text-red-600'">
                                    {{ reserva.seguro ? 'Incluido' : 'No Incluido' }}
                                </span>
                            </div>

                            <div class="info-row">
                                Silla Bebé:
                                <span :class="reserva.sillabebe ? 'text-green-600' : 'text-red-600'">
                                    {{ reserva.sillabebe ? 'Sí' : 'No' }}
                                </span>
                            </div>
                        </div>
                        
                    </div>

                    <div class="flex flex-col justify-between text-right">
                        <div></div>

                        <div>
                            <p class="text-sm text-gray-500">
                                Total pagado
                            </p>
                            <p class="text-2xl font-extrabold text-[#ff6b00]">
                                ${{ reserva.total }}
                            </p>
                        </div>

                        <!-- <button class="btn-details mt-3">
                            ver Detalles
                        </button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue"
    import Navbar from '../components/Navbar.vue'
    import { ReservacionService } from "../services/reservacion.service";
    import { API_PUBLIC_URL } from "../config/endpointPublic";

    const reservas = ref([])
    const loading = ref(true)

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('es-MX')
    }

    const estadoColor = (estado) => {
        switch (estado) {
            case 'PENDIENTE':
                return 'bg-yellow-100 text-yellow-700'
            case 'CONFIRMADA':
                return 'bg-green-100 text-green-700'
            case 'CANCELADA':
                return 'bg-red-100 text-red-700'
            default:
                return 'bg-gray-100 text-gray-700'
        }
    }

    onMounted(async () => {
        try {
            reservas.value = await ReservacionService.getById()

        } catch (error) {
            console.error(error)
            alert('Error al cargar las reservaciones')
        } finally {
            loading.value = false
        }
    })
</script>

<style scoped>
.card-box {
  background: rgba(255,255,255,.9);
  backdrop-filter: blur(14px);
  border-radius: 20px;
  padding: 26px;
  box-shadow: 0 25px 60px rgba(0,0,0,.08);
  border:1px solid #eee;
}

.reservation-card {
  display:grid;
  grid-template-columns: 1fr;
  gap:20px;
  background: rgba(255,255,255,.88);
  backdrop-filter: blur(14px);
  padding:22px;
  border-radius:22px;
  box-shadow:0 20px 60px rgba(0,0,0,.08);
  border:1px solid #eee;
  transition:.4s;
}
@media(min-width:768px){
  .reservation-card {
    grid-template-columns: 260px 1fr 160px;
    align-items:center;
  }
}

.reservation-card:hover {
  transform:translateY(-6px);
  box-shadow:0 30px 80px rgba(0,0,0,.12);
}

.info-row {
  background:#f9fafb;
  padding:10px 12px;
  border-radius:12px;
}

.status-badge {
  position:absolute;
  top:12px;
  left:12px;
  padding:6px 12px;
  border-radius:999px;
  font-size:12px;
  font-weight:600;
  backdrop-filter: blur(6px);
}

.btn-details {
  background:#111;
  color:white;
  padding:10px;
  border-radius:12px;
  font-weight:600;
  transition:.3s;
}
.btn-details:hover {
  background:#ff6b00;
  transform:translateY(-2px);
  box-shadow:0 10px 25px rgba(255,107,0,.4);
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
  animation:fadeUp .7s ease;
}
@keyframes fadeUp {
  from{opacity:0; transform:translateY(30px)}
  to{opacity:1; transform:translateY(0)}
}

</style>