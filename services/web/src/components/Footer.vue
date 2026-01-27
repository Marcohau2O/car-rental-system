<template>
    <footer class="bg-gray-900 text-gray-300">
        <div class="container mx-auto px-4 py-12">
            <div class="grid gap-8 md:grid-cols-3">

                <div>
                    <h3 class="text-3xl font-bold text-white mb-4">AutoRent</h3>
                    <p class="text-sm text-gray-400">
                        Renta de autos confiable, rápida y sin complicaciones.
                    </p>
                </div>

                <div>
                    <h4 class="text-lg font-semibold text-white mb-4">
                        Enlaces Rápidos
                    </h4>
                    <ul class="space-y-2">
                        <li><a href="" class="hover:text-white">Inicio</a></li>
                        <li><a href="" class="hover:text-white">Autos</a></li>
                        <li><a href="" class="hover:text-white">FAQs</a></li>
                        <li><a href="" class="hover:text-white">Contacto</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-lg font-semibold text-white mb-4">
                        Enlaces Útiles
                    </h4>
                    <ul>
                        <li><a href="" class="hover:text-white">Políticas de Privacidad</a></li>
                        <li><a href="" class="hover:text-white">Términos y Condiciones</a></li>
                        <li><a href="" class="hover:text-white">Descargo de Responsabilidades</a></li>
                    </ul>
                </div>

            </div>

            <div class="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
                © {{ new Date().getFullYear() }} AutoRent. Todos los derechos reservados.
            </div>
        </div>
    </footer>
</template>