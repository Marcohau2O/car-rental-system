<template>
    <section class="py-20 bg-gradient-to-b from-white to-gray-50">
        <div class="container mx-auto px-4">
            <h2 class="text-4xl md:text-5xl font-extrabold text-center mb-4 text-gray-900">
                Lo que dicen nuestro clientes
            </h2>
            <p class="text-center text-gray-600 mb-14 max-w-2xl mx-auto">
                Experiencias reales de personas que confiaron en nosotros para su viaje.
            </p>

            <div class="grid md:grid-cols-3 gap-8">
                <div
                v-for="(testimonio, index) in testimonios"
                :key="index"
                class="bg-white p-7 rounded-2xl transition duration-300 border border-gray-100 relative overflow-hidden testimonio"
                >
                <div class="absolute -top-10 -right-10 w-32 h-32 bg-[#ff6b00]/20 rounded-full blur-3xl group-hover:scale-125 transition"></div>

                <p class="text-gray-700 italic mb-6 leading-relaxed relative z-10">
                    “{{ testimonio.comment }}”
                </p>

                <div class="flex items-center gap-4 relative z-10">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff6b00] to-[#ff8533] text-white flex items-center justify-center font-bold text-lg shadow">
                        {{ testimonio.name.charAt(0) }}
                    </div>

                    <div>
                        <p class="font-semibold text-gray-900">
                            {{ testimonio.name }}
                        </p>
                        <p class="text-sm text-gray-500">
                            {{ testimonio.location }}
                        </p>
                    </div>
                </div>

                    <div class="mt-5 text-yellow-400 text-lg relative z-10 tracking-wider">
                        ⭐⭐⭐⭐⭐
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    const testimonios = [
  {
    name: 'Carlos Ramírez',
    location: 'Cáncun',
    comment: 'El proceso fue súper rápido y el auto estaba en excelentes condiciones.'
  },
  {
    name: 'Ana López',
    location: 'Cáncun',
    comment: 'Me entregaron el auto directo en el aeropuerto, excelente servicio.'
  },
  {
    name: 'Luis Hernández',
    location: 'Cáncun',
    comment: 'Precios justos y sin cargos ocultos, totalmente recomendado.'
  }
]
</script>

<style scoped>
.testimonio {
    box-shadow: 0 10px 35px rgba(0, 0, 0, .08);
    transition: .45s;
}

.testimonio:hover {
        transform: translateY(-10px);
        box-shadow: 0 30px 70px rgba(255, 107, 0, .25);
}
</style>