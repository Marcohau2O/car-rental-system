<template>
    <div class="card-box space-y-6">

        <h2 class="text-xl font-bold">Resumen de Pago</h2>

        <div class="mb-6">
            <label class="mr-4">
                <input type="radio" value="COMPLETO" v-model="tipoPago">
                Pago Completo
            </label>

            <label>
                <input type="radio" value="ANTICIPO" v-model="tipoPago">
                Anticipo 30%
            </label>
        </div>

        <p class="text-lg font-semibold mb-6">
            Total a pagar: ${{ montoAPagar }}
        </p>

        <div class="flex gap-4 mb-6">
            <button @click="metodoPago='TARJETA DEBITO/CREDITO'" :class="metodoPago==='TARJETA DEBITO/CREDITO'" class="px-4 py-2 btn-button">
                Tarjeta
            </button>

            <button @click="metodoPago='PAYPAL'" :class="metodoPago==='PAYPAL'" class="px-4 py-2 btn-button">
                PayPal
            </button>

            <button @click="metodoPago='EFECTIVO'" :class="metodoPago==='EFECTIVO'" class="px-4 py-2 btn-button">
                Efectivo
            </button>
        </div>

        <div v-if="metodoPago==='TARJETA DEBITO/CREDITO'" class="space-y-4">
            <div class="input-style">
                <label>Nombre Titular:</label>
                 <input v-model="tarjeta.nombre" placeholder="Nombre en la tarjeta" />
            </div>

            <div class="input-style">
                <label>Numero Tarjeta:</label>
                <input v-model="tarjeta.numero" placeholder="Número de tarjeta" />
            </div>

            <div class="flex gap-4">
                <div class="input-style">
                    <label>Fecha Expiracion:</label>
                    <input v-model="tarjeta.expiracion" placeholder="MM/AA" class="w-1/2" />
                </div>
                <div class="input-style">
                    <label>Codigo CVV:</label>
                    <input v-model="tarjeta.cvv" placeholder="CVV" class="w-1/2" />
                </div>
            </div>

            <button @click="procesar" class="btn-button w-full mt-4">
                Pagar con Tarjeta
            </button>
        </div>

        <div v-if="metodoPago==='PAYPAL'" class="text-center">

            <p class="mb-4">Serás redirigido a PayPal</p>

            <button @click="procesar" class="bg-yellow-400 w-full py-3 rounded font-bold">
            Pagar con PayPal
            </button>
        </div>

        <div v-if="metodoPago==='EFECTIVO'" class="space-y-4">
            <div class="bg-gray-100 p-4 rounded-lg">
                <p class="font-semibold">Pago en efectivo en oficina</p>
                <p class="text-sm text-gray-600">
                    La reservacion quedara pendiente hasta que el cliente pague en oficina
                </p>
            </div>

            <button @click="procesar" class="btn-button w-full">
                Confirmar Reservación
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from "vue"

    const props = defineProps({
        total: Number,
        reservacionId: Number
    })

    const emit = defineEmits(['procesar'])

    const tipoPago = ref("COMPLETO")
    const metodoPago = ref("TARJETA DEBITO/CREDITO")

    const tarjeta = ref({
        nombre: '',
        numero: '',
        expiracion: '',
        cvv: '',
    })

    const montoAPagar = computed(() => {
        return tipoPago.value === 'ANTICIPO'
            ? props.total * 0.3
            : props.total
    })

    const procesar = () => {
        emit('procesar', {
            metodo: metodoPago.value,
            tipoPago: tipoPago.value,
            montoAPagar: montoAPagar.value
        })
    }
</script>

<style scoped>
.btn-button {
    background: #ff6b00;
    color: white;
    padding: 10px 14px;
    border-radius: 16px;
    font-weight: 500;
    letter-spacing: .3s;
    transition: .35s;
    box-shadow: 0 15px 35px rgba(255, 107, 0, .35);
    white-space: nowrap;
}

.btn-button:hover {
    background: #ff8533;
    transform: translateY(-3px);
    box-shadow: 0 25px 60px rgba(255, 107, 0, .45);
}

.btn-button:active {
    transform: scale(.96);
}

.card-box {
  background: rgba(255,255,255,.92);
  backdrop-filter: blur(14px);
  border-radius: 22px;
  padding: 18px;
  box-shadow: 0 25px 60px rgba(0,0,0,.08);
  border:1px solid #f1f1f1;
  transition:.4s;
}

.input-style {
     display: flex;
     flex-direction: column;
}

.input-style label {
    font-size: 12px;
    color: #6b7280;
    margin-bottom: 6px;
    font-weight: 500;
}

.input-style input {
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 10px;
    background: white;
    transition: -3s;
    outline: none;
    font-weight: 400;
}

.input-style input:focus {
    border-color: #ff6b00;
    box-shadow: 0 0 0 3px rgba(255, 107, 0, .15);
}
</style>