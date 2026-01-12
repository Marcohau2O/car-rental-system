<template>
    <nav class="bg-white shadow">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <div class="flex items-center gap-8">
                <a @click="navigateHome" class="text-2xl font-bold text-blue-600 cursor-pointer">AutoRent</a>
                <div class="hidden md:flex gap-6">
                    <a @click="navigateHome" class="text-gray-700 hover:text-blue-600 cursor-pointer">Inicio</a>
                    <a @click="navigateCars" class="text-gray-700 hover:text-blue-600 cursor-pointer">Autos</a>
                    <a href="/" class="text-gray-700 hover:text-blue-600 cursor-pointer">Contacto</a>
                </div>
            </div>
            <!-- <div class="flex items-center gap-4">
                <a href="#" class="text-gray-700 hover:text-blue-600 cursor-pointer">Panel Admin</a>
                <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Mis Reservas</button>
            </div> -->
        </div>
    </nav>
</template>
<script setup>
    import { useNavigation } from '../composables/useNavigation';
    import { useRouter } from 'vue-router';

    const router = useRouter()
    const { goHome, goCars, goAdminLogin } = useNavigation()

    const navigateHome = () => goHome()
    const navigateCars = () => goCars()
</script>