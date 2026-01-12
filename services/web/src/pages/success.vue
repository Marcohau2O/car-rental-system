<template>
    <div class="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center">
        <div class="container mx-auto px-4">
            <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow text-center">
                <div class="mb-6">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-3xl">✓</span>
                    </div>
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">¡Reserva Confirmada!</h1>
                    <p class="text-gray-600">Tu reservacion ha sido procesada exitosame</p>
                </div>

                <div class="bg-gray-50 p-4 rounded mb-6 text-left">
                    <h3 class="font-semibold text-gray-900 mb-3">Detalles de tu reservas:</h3>
                    <div class="space-y-2 text-sm text-gray-700">
                        <p><strong>Confirmación:</strong> #RES2024001234</p>
                        <p><strong>Vehículo:</strong> Toyota Corolla</p>
                        <p><strong>Recogida:</strong> 15 Dic, 2024 - 10:00 AM</p>
                        <p><strong>Retorno:</strong> 18 Dic, 2024 - 10:00 AM</p>
                        <p><strong>Total:</strong> $240.00</p>
                    </div>
                </div>

                <p class="text-gray-600 text-sm mb-6">
                    Se ha enviado un correo de confirmación a tu email con todos los detalles
                </p>

                <div class="space-y-2">
                    <button @click="goHome" class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:not-even:bg-blue-700 transition">Volver al inicio</button>
                    <button @click="downloadPDF" class="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition">
                        Descargar comprobante
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useNavigation } from '../composables/useNavigation';

    const { goHome } = useNavigation()

    const downloadPDF = () => {
        console.log('Descargar PDF')
    }
</script>