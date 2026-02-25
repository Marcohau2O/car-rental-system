<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 print:bg-transparent">
    <div class="bg-white w-full max-w-4xl p-10 rounded-lg shadow-2xl overflow-y-auto max-h-screen border border-gray-200 relative print:shadow-none print:border-none print:max-h-full invoice-container">
      
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img 
          src="/src/assets/img/RentaCar.png" 
          alt="Logo AutoRent" 
          class="w-2/3 opacity-10 filter grayscale"
        />
      </div>

      <div class="relative z-10">
        <div class="flex justify-between items-center border-b pb-4 mb-8">
          <div>
            <h2 class="text-3xl font-extrabold text-gray-800">AutoRent</h2>
            <p class="text-sm text-gray-500">Av. Cancún #123, Cancún, Q.Roo</p>
            <p class="text-sm text-gray-500">Email: contacto@autorent.com</p>
            <p class="text-sm text-gray-500">Tel: (998) 555-1234</p>
            <p class="text-sm text-gray-500">www.autorent.com</p>
          </div>
          <div class="text-right">
            <h3 class="text-xl font-bold text-gray-700">FACTURA</h3>
            <p class="text-sm text-gray-500">No: {{ invoiceData.confirmacion || 'N/A' }}</p>
            <p class="text-sm text-gray-500">Fecha: {{ formatDate(new Date()) }}</p>
          </div>
        </div>

        <div class="mb-8 text-sm text-gray-600">
          <h3 class="font-semibold text-gray-700 mb-2">Cliente</h3>
          <p>Nombre: {{ invoiceData.usuario?.nombre || 'N/A' }}</p>
          <p>Email: {{ invoiceData.usuario?.correo || 'N/A' }}</p>
          <p>Tel: {{ invoiceData.usuario?.telefono || 'N/A' }}</p>
        </div>

        <div class="mb-8 text-sm text-gray-600">
          <h3 class="font-semibold text-gray-700 mb-2">Información del Vehículo</h3>
          <p>Modelo: {{ invoiceData.auto?.marca }} {{ invoiceData.auto?.modelo }}</p>
          <p>Periodo: {{ formatDate(invoiceData.fechainicio) }} - {{ formatDate(invoiceData.fechafin) }}</p>
        </div>

        <div class="mb-8">
          <h3 class="font-semibold text-gray-700 mb-2">Detalle de Cargos</h3>
          <table class="w-full text-sm border border-gray-300 rounded-lg">
            <thead class="bg-gray-100 text-gray-700">
              <tr>
                <th class="text-left px-4 py-2 w-1/2">Descripción</th>
                <th class="text-center px-4 py-2 w-1/6">Tarifa</th>
                <th class="text-center px-4 py-2 w-1/6">Cantidad</th>
                <th class="text-right px-4 py-2 w-1/6">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-t">
                <td class="px-4 py-2">Renta de Auto</td>
                <td class="text-center">${{ invoiceData.auto?.precioPorDia || 'N/A' }}</td>
                <td class="text-center">{{ invoiceData.dias || 'N/A' }}</td>
                <td class="text-right">
                  {{
                    invoiceData.auto?.precioPorDia && invoiceData.dias
                      ? '$' + (Number(invoiceData.auto.precioPorDia) * Number(invoiceData.dias))
                      : 'N/A'
                  }}
                </td>
              </tr>
              <tr v-if="invoiceData.seguro" class="border-t">
                <td class="px-4 py-2">Seguro</td>
                <td class="text-center">${{ invoiceData.seguro }}</td>
                <td class="text-center">1</td>
                <td class="text-right">${{ invoiceData.seguro }}</td>
              </tr>
              <tr v-if="invoiceData.sillabebe" class="border-t">
                <td class="px-4 py-2">Silla bebé</td>
                <td class="text-center">${{ invoiceData.sillabebe }}</td>
                <td class="text-center">1</td>
                <td class="text-right">${{ invoiceData.sillabebe }}</td>
              </tr>
              <tr class="border-t bg-gray-50 font-bold">
                <td colspan="3" class="px-4 py-2 text-right">Total</td>
                <td class="px-4 py-2 text-right">${{ invoiceData.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mb-8 text-sm text-gray-600">
          <h3 class="font-semibold text-gray-700 mb-2">Información de Pago</h3>
          <p>Fecha de vencimiento: {{ formatDate(new Date(invoiceData.fechafin)) }}</p>
          <p>Banco: Banco de México</p>
          <p>Cuenta: AutoRent S.A. de C.V.</p>
          <p>Número de cuenta: 1234567890</p>
        </div>

        <div class="mb-8 text-sm text-gray-600 text-center">
          <h3 class="font-semibold text-gray-700 mb-2">Firma Autorizada</h3>
          <img src="/src/assets/img/firma.png" alt="Firma" class="mx-auto h-24 mb-2" />
          <p>__________________________</p>
          <p>Gerente de AutoRent</p>
        </div>

        <div class="mb-8 text-sm text-gray-600">
          <h3 class="font-semibold text-gray-700 mb-2">Notas</h3>
          <p>Gracias por elegir AutoRent. Si tiene alguna duda, contáctenos.</p>
        </div>

        <div class="flex justify-center gap-6 mt-6 print:hidden">
          <button @click="printInvoice" class="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 text-lg font-semibold">
            Imprimir
          </button>
          <button @click="$emit('close')" class="bg-gray-300 px-8 py-3 rounded-lg shadow hover:bg-gray-400 text-lg font-semibold">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  invoiceData: {
    type: Object,
    required: true
  }
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-MX')
}

const printInvoice = () => {
  window.print()
}
</script>

<style>
@page {
  margin: 0;
}

@media print {
    body {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
    margin: 0;
  }

  nav, header, footer, .sidebar {
    display: none !important;
  }
  .invoice-container {
    box-shadow: none !important;
    border: none !important;
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
    max-height: none !important;
    margin: 0 auto !important;
    page-break-inside: avoid;
  }

}
</style>