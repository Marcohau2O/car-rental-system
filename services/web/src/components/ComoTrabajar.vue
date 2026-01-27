<template>
    <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-center mb-4">
                ¿Cómo funciona la reserva?
            </h2>
            <p class="text-center text-gray-600 mb-12">
                Reservar tu auto es facil y rápido
            </p>

            <div class="grid md:grid-cols-4 gap-8">
                <div
                v-for="(paso, index) in pasos"
                :key="index"
                class="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition"
                >
                    <div
                    class="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold" 
                    >
                    {{ index + 1 }}
                    </div>

                    <h3 class="text-lg font-semibold mb-2">
                        {{ paso.title }}
                    </h3>

                    <p class="text-gray-600 text.sm">
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