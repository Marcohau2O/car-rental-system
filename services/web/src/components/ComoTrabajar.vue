<template>
    <section class="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">

        <div class="absolute -top-20 -left-20 w-72 h-72 bg-orange-500/10 blur-3xl rounded-full"></div>
        <div class="absolute bottom-0 right-0 w-72 h-72 bg-orange-500/10 blur-3xl rounded-full"></div>

        <div class="container mx-auto px-6 relative z-10">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Reserva en minutos
                </h2>
                <p class="text-gray-600 text-lg">
                    Rápidos, seguro y sin complicaciones
                </p>
            </div>

            <div class="grid md:grid-cols-4 gap-8">
                <div
                v-for="(paso, index) in pasos"
                :key="index"
                class="step-card group"
                >
                    <div
                    class="step-number" 
                    >
                    {{ index + 1 }}
                    </div>

                    <h3 class="text-xl font-semibold text-gray-900 mb-2">
                        {{ paso.title }}
                    </h3>

                    <p class="text-gray-500 leading-relaxed">
                        {{ paso.description }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    const pasos = [
  {
    title: 'Busca tu auto',
    description: 'Selecciona fechas, ubicación y el vehículo que mejor se adapte a ti.'
  },
  {
    title: 'Reserva sin depósito',
    description: 'No necesitas tarjeta de crédito ni pagos anticipados.'
  },
  {
    title: 'Recíbelo fácilmente',
    description: 'Entrega rápida en aeropuerto o punto acordado.'
  },
  {
    title: 'Disfruta tu viaje',
    description: 'Conduce tranquilo con seguro incluido y asistencia.'
  }
]
</script>

<style scoped>
.step-card {
    background: white;
    padding: 40px 28px;
    border-radius: 22px;
    text-align: center;
    box-shadow: 0 10px 35px rgba(0, 0, 0, .08);
    transition: .45s;
    position: relative;
    border: 1px solid #f3f4f6;
}

.step-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 70px rgba(255, 107, 0, .25);
}

.step-number{
  width:70px;
  height:70px;
  margin:auto;
  margin-bottom:20px;
  border-radius:20px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:700;
  font-size:22px;
  background:#111;
  color:white;
  transition:.4s;
  box-shadow:0 10px 30px rgba(0,0,0,.25);
}

.step-card:hover .step-number{
  background:#ff6b00;
  transform:scale(1.1) rotate(-6deg);
  box-shadow:0 20px 40px rgba(255,107,0,.45);
}
</style>