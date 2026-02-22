<template>
<div class="min-h-screen bg-[#f6f7fb] flex items-center justify-center overflow-hidden">

    <div class="fixed top-[-120px] right-[-120px] w-[420px] h-[420px] bg-green-400 opacity-20 blur-[120px] rounded-full animate-glow"></div>
    <div class="fixed bottom-[-120px] left-[-120px] w-[420px] h-[420px] bg-blue-400 opacity-20 blur-[120px] rounded-full animate-glow"></div>

    <div class="max-w-lg w-full mx-auto px-4 relative">

        <div class="confirm-card text-center">

            <div class="success-icon">
                ✓
            </div>

            <h1 class="text-3xl font-extrabold mb-2 hero-title">
                ¡Reserva Confirmada!
            </h1>
            <p class="text-gray-500 mb-6">
                Tu reservación fue procesada correctamente
            </p>

            <div v-if="reserva" class="details-box text-left">

                <h3 class="font-bold text-lg mb-4">Detalles de tu reserva</h3>

                <div class="space-y-2 text-sm">

                    <div class="row">
                        <span>Confirmación:</span>
                        <strong>#{{ reserva.confirmacion }}</strong>
                    </div>

                    <div class="row">
                        <span>Vehículo:</span>
                        <strong>{{ reserva.auto?.marca }} {{ reserva.auto?.modelo }}</strong>
                    </div>

                    <div class="row">
                        <span>Recogida:</span>
                        <strong>{{ formatDate(reserva.fechainicio) }} - {{ reserva.horainicio }}</strong>
                    </div>

                    <div class="row">
                        <span>Retorno:</span>
                        <strong>{{ formatDate(reserva.fechafin) }} - {{ reserva.horafin }}</strong>
                    </div>

                    <div class="row total">
                        <span>Total pagado:</span>
                        <strong class="text-green-600 text-lg">${{ reserva.total }}</strong>
                    </div>

                </div>
            </div>

            <div v-else class="text-gray-500 py-10">
                Cargando datos de reserva...
            </div>

            <p class="text-gray-500 text-sm mt-6">
                Recibirás un correo con los detalles de tu renta
            </p>

            <div class="space-y-3 mt-6">
                <button @click="goHome" class="btn-primary">
                    Volver al inicio
                </button>

                <button @click="downloadPDF" class="btn-outline">
                    Descargar comprobante
                </button>
            </div>

        </div>
    </div>
</div>
</template>


<script setup>
    import { ref, onMounted } from 'vue';
    import { useNavigation } from '../composables/useNavigation';
    import { useRoute } from 'vue-router';
    import { ReservacionService } from '../services/reservacion.service';

    const { goHome } = useNavigation()
    const route = useRoute()

    const reserva = ref(null)

    onMounted(async () => {
        try {
            const id = route.params.id
            console.log ("id", id)
            const data = await ReservacionService.getById(id)

            reserva.value = data[0]

            console.log("datos reservacion", data)
        } catch(e) {
            console.log(e)
        }
    })

    const downloadPDF = () => {
        window.open(`/api/reservas/pdf/${reserva.value.id}`, '_blank')
    }

    const formatDate = (fecha) => {
        if(!fecha) return ''
            return new Date(fecha).toLocaleDateString('es-MX',{
                day:'2-digit',
                month:'short',
                year:'numeric'
        })
    }
</script>

<style scoped>
.confirm-card {
  background: rgba(255,255,255,.9);
  backdrop-filter: blur(14px);
  border-radius: 26px;
  padding: 40px;
  box-shadow:0 40px 90px rgba(0,0,0,.12);
  border:1px solid #eee;
  animation:fadeUp .7s ease;
}

.success-icon {
  width:90px;
  height:90px;
  background:linear-gradient(135deg,#22c55e,#16a34a);
  color:white;
  font-size:40px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:999px;
  margin:auto;
  margin-bottom:20px;
  box-shadow:0 15px 40px rgba(34,197,94,.5);
  animation:pop .5s ease;
}

.details-box {
  background:#f9fafb;
  padding:20px;
  border-radius:16px;
}

.row {
  display:flex;
  justify-content:space-between;
  padding:8px 0;
  border-bottom:1px dashed #e5e7eb;
}
.row:last-child{border:none}

.total {
  margin-top:6px;
}

.btn-primary {
  width:100%;
  background:#111;
  color:white;
  padding:14px;
  border-radius:14px;
  font-weight:600;
  transition:.3s;
}
.btn-primary:hover {
  background:#16a34a;
  transform:translateY(-2px);
  box-shadow:0 15px 30px rgba(22,163,74,.4);
}

.btn-outline {
  width:100%;
  border:1px solid #ddd;
  padding:14px;
  border-radius:14px;
  font-weight:600;
  transition:.3s;
}
.btn-outline:hover {
  background:#111;
  color:white;
}

@keyframes pop {
  0%{transform:scale(.6);opacity:0}
  100%{transform:scale(1);opacity:1}
}

@keyframes fadeUp {
  from{opacity:0; transform:translateY(40px)}
  to{opacity:1; transform:translateY(0)}
}

@keyframes glowMove {
  0%{transform:translateY(0)}
  50%{transform:translateY(-25px)}
  100%{transform:translateY(0)}
}
.animate-glow {
  animation:glowMove 8s ease-in-out infinite;
}
</style>