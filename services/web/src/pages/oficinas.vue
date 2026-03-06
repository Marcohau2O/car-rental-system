<template>
  <div class="min-h-screen bg-[#f4f6f8]">
    <Navbar/>

    <section class="mx-auto max-w-7xl px-4 py-16 md:py-24">

      <!-- HERO -->
      <div class="relative overflow-hidden rounded-3xl mb-14">

        <div class="absolute inset-0 bg-gradient-to-r from-black via-[#111] to-[#e5be01]"></div>
        <div class="absolute -right-32 -top-32 w-[420px] h-[420px] bg-[#e5be01] opacity-20 blur-[120px] rounded-full animate-glow"></div>

        <div class="relative px-8 md:px-14 py-14 md:py-20 text-center">

          <h1 class="hero-title text-3xl md:text-5xl font-extrabold text-white">
            Nuestras
            <span class="text-[#e5be01]"> Oficinas</span>
          </h1>

          <p class="hero-sub text-gray-300 mt-4 text-lg">
            Visítanos en cualquiera de nuestras sucursales en Cancún
          </p>

        </div>
      </div>


      <!-- GRID -->
      <div class="grid md:grid-cols-2 gap-10">

        <!-- LEFT -->
        <div class="space-y-8">

          <!-- INFO CARD -->
          <div class="card-box">

            <h2 class="text-2xl font-bold mb-4 text-gray-900">
              Oficina Principal
            </h2>

            <p class="text-gray-600 leading-relaxed">
              Somos una empresa líder en renta de autos con cobertura en todo Quintana Roo.
              Ofrecemos vehículos modernos, seguros y al mejor precio para turistas y locales.
            </p>

            <div class="mt-6 space-y-3 text-gray-700">

              <div class="info-row">
                📍 Av. Pehaltun 32, Cancún
              </div>

              <div class="info-row">
                🕐 8:00 AM - 8:00 PM
              </div>

              <div class="info-row">
                📞 +52 9983005859
              </div>

            </div>

          </div>


          <!-- GALERIA -->
          <div class="card-box">
            <h2 class="text-xl font-bold mb-5">Galería de Oficinas</h2>

            <div class="relative group">

              <div class="absolute inset-0 bg-[#e5be01] opacity-0 group-hover:opacity-20 blur-2xl transition"></div>

              <img 
                :src="imagenes[actual]" 
                class="w-full h-72 object-cover rounded-xl shadow-xl 
                       transition duration-500 group-hover:scale-105"
              >

              <!-- arrows -->
              <button @click="anterior" class="gallery-btn left-3">‹</button>
              <button @click="siguiente" class="gallery-btn right-3">›</button>

            </div>
          </div>

        </div>


        <!-- MAPA -->
        <div class="card-box h-fit">

          <h2 class="text-xl font-bold mb-4">
            Ubicación en Google Maps
          </h2>

          <iframe
            class="w-full h-[420px] rounded-xl border"
            loading="lazy"
            src="https://www.google.com/maps?q=Av.+Pehaltun+32+Cancun&output=embed">
          </iframe>

          <a
            href="https://maps.google.com/?q=Av.+Pehaltun+32+Cancun"
            target="_blank"
            class="btn-map">
            Abrir en Google Maps
          </a>

        </div>

      </div>
    </section>

    <Footer/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const imagenes = [
  "https://images.unsplash.com/photo-1560448075-bb485b067938",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
  "https://images.unsplash.com/photo-1504215680853-026ed2a45def"
]

const actual = ref(0)

const siguiente = () => {
  actual.value = (actual.value + 1) % imagenes.length
}

const anterior = () => {
  actual.value = (actual.value - 1 + imagenes.length) % imagenes.length
}
</script>

<style scoped>
.card-box{
  background: rgba(255,255,255,.85);
  backdrop-filter: blur(12px);
  border-radius: 22px;
  padding: 28px;
  box-shadow: 0 25px 60px rgba(0,0,0,.08);
  border:1px solid #f1f1f1;
  transition:.4s;
}

.card-box:hover{
  transform:translateY(-6px);
  box-shadow:0 30px 70px rgba(0,0,0,.12);
}

.info-row{
  background:#f9fafb;
  padding:12px 14px;
  border-radius:12px;
  font-size:14px;
}

.gallery-btn{
  position:absolute;
  top:50%;
  transform:translateY(-50%);
  background:rgba(0,0,0,.5);
  color:white;
  font-size:22px;
  padding:6px 14px;
  border-radius:999px;
  transition:.3s;
}
.gallery-btn:hover{
  background:#e5be01;
  transform:translateY(-50%) scale(1.1);
}

.btn-map{
  display:block;
  margin-top:14px;
  background:#111;
  color:white;
  text-align:center;
  padding:12px;
  border-radius:12px;
  font-weight:600;
  transition:.3s;
}
.btn-map:hover{
  background:#e5be01;
  transform:translateY(-3px);
  box-shadow:0 15px 30px rgba(255,107,0,.45);
}

.hero-title{
  opacity:0;
  transform:translateY(40px);
  animation:titleReveal 1s ease forwards;
}

.hero-title span{
  opacity:0;
  transform:translateY(25px);
  animation:titleReveal 1s ease forwards;
  animation-delay:.3s;
}

.hero-sub{
  opacity:0;
  transform:translateY(20px);
  animation:titleReveal 1s ease forwards;
  animation-delay:.6s;
}

@keyframes titleReveal{
  to{opacity:1; transform:translateY(0);}
}

@keyframes glowMove{
  0%{transform:translateY(0)}
  50%{transform:translateY(-25px)}
  100%{transform:translateY(0)}
}
.animate-glow{
  animation:glowMove 7s ease-in-out infinite;
}

</style>