<template>
    <div class="min-h-screen bg-[#f4f6f8]">
        <Navbar/>

        <section class="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <div class="relative overflow-hidden rounded-3xl mb-14">

                <div class="absolute inset-0 bg-gradient-to-r from-black via-[#111] to-[#ff6b00]"></div>
                <div class="absolute -right-32 -top-32 w-[420px] h-[420px] bg-[#ff6b00] opacity-20 blur-[120px] rounded-full animate-glow"></div>
                
                <div class="relative px-8 md:px-14 py-14 md:py20 text-center">
                    <h1 class="hero-title text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                        Contáctanos
                        <span class="text-[#ff6b00] block">Estamos para ayudarte</span>
                    </h1>
                    <p class="hero-sub text-gray-300 mt-4 text-lg">
                        Reserva fácil, rápido y seguro en Cancún
                    </p>
                </div>
            </div>

                <div class="bg-white/80 backdrop-blur-lg border border-white/40
                    rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,.08)]
                    p-8 md:12 grid md:grid-cols-2 gap-12 items-center">

                    <div>
                        <h2 class="text-2xl font-bold mb-8 text-gray-900">
                            Información de contacto
                        </h2>

                        <div class="space-y-4 text-gray-700">
                            <div class="contact-item">
                                <span>Empresa</span>
                                <strong>Riviera Rentals</strong>
                            </div>

                            <!-- <div class="contact-item">
                                <span>Dueño</span>
                                <strong>Nicolas Simioni</strong>
                            </div> -->

                            <div class="contact-item">
                                <span>Teléfono</span>
                                <strong>+52 9983005859</strong>
                            </div>

                            <div class="contact-item">
                                <span>Email</span>
                                <strong>info@rivierarentals.com.mx</strong>
                            </div>

                            <div class="contact-item">
                                <span>Ubicación</span>
                                <strong>Cancún, Quintana Roo</strong>
                            </div>
                        </div>

                        <div class="mt-10 flex flex-wrap gap-4">
                            <a href="https://wa.me/529980000000"
                                target="_blank"
                                class="btn-whatsapp">
                                WhatsApp
                            </a>

                            <!-- <a href="tel:9980000000"
                                class="btn-call">
                                Llamar
                            </a> -->

                            <a href="mailto:contacto@rentcar.com"
                                class="btn-mail">
                                Enviar correo
                            </a>
                        </div>
                    </div>

                    <div class="relative group">
                        <div class="absolute inset-0 bg-[#ff6b00] opacity-0 group-hover:opacity-20 blur-2xl transition"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
                            class="rounded-2xl shadow-2xl w-full h-[320px] object-cover
                            transform group-hover:scale-105 transition duration-500"
                        >

                        <p class="text-center text-sm text-gray-500 mt-5">
                            Atención de <strong>08:00 AM - 08:00 PM</strong>
                        </p>
                    </div>

                </div>
        </section>

        <Footer/>
    </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
</script>

<style scoped>
.contact-item {
    display: flex;
    justify-content: space-between;
    padding: 14px 18px;
    background: #f9fafb;
    border-radius: 12px;
    font-size: 14px;
}

.contact-item span {
    color: #6b7280;
}

.contact-item strong{
  color:#111;
  font-weight:600;
}

.btn-whatsapp {
    background: #25D366;
    color: white;
    padding: 12px 20px;
    border-radius: 12px;
    font-weight: 600;
    transition: .3s;
}
.btn-whatsapp:hover {
    transform: translateY(-3px);
    box-shadow:0 15px 30px rgba(37,211,102,.4);
}

.btn-call{
  background:#2563eb;
  color:white;
  padding:12px 20px;
  border-radius:12px;
  font-weight:600;
  transition:.3s;
}
.btn-call:hover{
  transform:translateY(-3px);
  box-shadow:0 15px 30px rgba(37,99,235,.4);
}

.btn-mail{
  background:#111;
  color:white;
  padding:12px 20px;
  border-radius:12px;
  font-weight:600;
  transition:.3s;
}
.btn-mail:hover{
  background:#ff6b00;
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
  to{
    opacity:1;
    transform:translateY(0);
  }
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