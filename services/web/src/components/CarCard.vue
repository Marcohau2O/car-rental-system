<template>
    <div class="car-card" @click="$emit('click')">
        <div class="img-box">
            <img 
            v-if="car.imagen"
            :src="`${API_PUBLIC_URL}${car.imagen}`"
            alt="car.image"
            />

            <div class="absolute top-3 left-3 bg-green-700/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs">Disponible</div>
        </div>
        <div class="content">
            <h3 class="title">{{ car.marca }} {{ car.modelo }}</h3>
            <p class="type">{{ car.tipoVehiculo }}</p>

            <div class="specs">
                <span>{{ car.transmision }}</span>
            </div>

            <div class="price">
                ${{ car.precioPorDia }}
                <span>/dia</span>
            </div>
            <button class="btn">
                Ver Detalles
            </button>
        </div>
    </div>
</template>

<script setup>
    import { API_PUBLIC_URL } from '../config/endpointPublic'

    defineProps({
    car: Object,
    })

    defineEmits(['click'])
</script>

<style scoped>
.car-card {
    background: white;
    border-radius: 22px;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid #f1f1f1;
    transition: .4s;
    box-shadow: 0 15px 40px rgba(0, 0, 0, .08);
    display: flex;
    flex-direction: column;
    height: 100%;
}

.car-card:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 35px 80px rgba(255, 107, 0, 0.25);
}

.img-box {
    position: relative;
    height: 190px;
    background: linear-gradient(135deg, #f8fafc, #ffffff);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.img-box img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 18px;
    transition: .6s;
}

.car-card:hover img {
    transform:scale(1.08);
}

.content{
  padding:18px;
  display:flex;
  flex-direction:column;
  flex:1;
}

.title{
  font-size:18px;
  font-weight:700;
  color:#111;
}

.type{
  font-size:13px;
  color:#6b7280;
  margin-bottom:8px;
}

.specs{
  display:flex;
  gap:12px;
  font-size:12px;
  color:#555;
  margin-bottom:14px;
}

.price{
  font-size:22px;
  font-weight:800;
  color:#e5be01;
  margin-bottom:14px;
}

.price span{
  font-size:13px;
  color:#777;
  font-weight:500;
}

.btn{
  margin-top:auto;
  background:#111;
  color:white;
  padding:12px;
  border-radius:12px;
  font-weight:700;
  transition:.3s;
  letter-spacing:.3px;
}

.btn:hover{
  background:#e5be01;
  transform:translateY(-2px);
  box-shadow:0 18px 35px rgba(255,107,0,.35);
}

.btn:active{
  transform:scale(.96);
}

</style>