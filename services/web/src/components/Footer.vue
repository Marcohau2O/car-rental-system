<template>
    <footer class="bg-[#0f0f0f] text-gray-300 border-t border-white/10">
        <div class="container mx-auto px-6 py-14">
            <div class="grid gap-10 md:grid-cols-4">

                <div>
                    <h3 class="text-3xl font-bold text-white mb-4 tracking-wide">
                        Riviera<span class="text-[#e5be01]">Rentals</span>
                    </h3>
                    <p class="text-sm text-gray-400 leading-relaxed">
                        Renta de autos confiable, rápida y sin complicaciones.
                    </p>

                    <div class="flex gap-4 mt-6">
                        <div class="social">F</div>
                        <div class="social">I</div>
                        <div class="social">X</div>
                    </div>
                </div>

                <div>
                    <h4 class="footer-title">
                        Enlaces Rápidos
                    </h4>
                    <ul class="space-y-2">
                        <li><a href="" class="footer-link">Inicio</a></li>
                        <li><a href="" class="footer-link">Autos</a></li>
                        <li><a href="" class="footer-link">FAQs</a></li>
                        <li><a href="" class="footer-link">Contacto</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="footer-title">
                        Enlaces Útiles
                    </h4>
                    <ul>
                        <li><a href="" class="footer-link">Políticas de Privacidad</a></li>
                        <li><a href="" class="footer-link">Términos y Condiciones</a></li>
                        <li><a href="" class="footer-link">Descargo de Responsabilidades</a></li>
                    </ul>
                </div>

            </div>

            <div class="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-sm text-gray-500">
                    © {{ new Date().getFullYear() }} Riviera Rentals. Todos los derechos reservados.
                </p>

                <div class="flex gap-6 text-sm">
                    <span class="text-gray-500">México</span>
                    <span class="text-gray-500">|</span>
                    <span class="text-gray-500">Español</span>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer-title {
    color: white;
    font-weight: 600;
    margin-bottom: 18px;
    font-size: 19px;
}

.footer-link {
    color: #9ca3af;
    transition: .3s;
    position: relative;
}

.footer-link:hover {
    color: #e5be01;
    padding-left: 6px;
}

.social{
  width:38px;
  height:38px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#1a1a1a;
  border-radius:10px;
  font-weight:bold;
  cursor:pointer;
  transition:.3s;
}
.social:hover{
  background:#e5be01;
  color:white;
  transform:translateY(-4px);
  box-shadow:0 10px 25px rgba(255,107,0,.4);
}
</style>