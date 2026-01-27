<template>
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-center mb-4">
                Lo que dicen nuestro clientes
            </h2>
            <p class="text-center text-gray-600 mb-12">
                Experiencias reales de personas que confiaron en nosotros
            </p>

            <div class="grid md:grid-cols-3 gap-8">
                <div
                v-for="(testimonio, index) in testimonios"
                :key="index"
                class="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition"
                >
                <p class="text-gray-700 italic mb-4">
                    “{{ testimonio.comment }}”
                </p>

                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
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

                    <div class="mt-3 text-yellow-400">
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
    location: 'CDMX',
    comment: 'El proceso fue súper rápido y el auto estaba en excelentes condiciones.'
  },
  {
    name: 'Ana López',
    location: 'Guadalajara',
    comment: 'Me entregaron el auto directo en el aeropuerto, excelente servicio.'
  },
  {
    name: 'Luis Hernández',
    location: 'Monterrey',
    comment: 'Precios justos y sin cargos ocultos, totalmente recomendado.'
  }
]
</script>