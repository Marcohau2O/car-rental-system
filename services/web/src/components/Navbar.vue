<template>
    <nav class="bg-white shadow fixed top-0 left-0 w-full z-50">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">

            <div class="flex items-center gap-6">
                <button class="md:hidden text-gray-700"
                @click="isOpen = true">
                    ☰
                </button>
                <a @click="navigateHome" class="text-2xl font-bold text-blue-600 cursor-pointer">AutoRent</a>
                <div class="hidden md:flex gap-6">
                    <a @click="navigateHome" class="text-gray-700 hover:text-blue-600 cursor-pointer">Inicio</a>
                    <a @click="navigateCars" class="text-gray-700 hover:text-blue-600 cursor-pointer">Autos</a>
                    <a href="/" class="text-gray-700 hover:text-blue-600 cursor-pointer">Contacto</a>   
                </div>
            </div>

            <div class="hidden md:flex items-center gap-4">
                <button v-if="!isAutenticado" @click="navigateLogin" class="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition">
                    Inicia sesión
                </button>
                <template v-else>
                    <button
                        class="text-gray-700 hover:text-blue-600 font-medium">
                        Mis reservas
                    </button>

                    <button @click="logout"
                        class="text-red-600 hover:text-red-700 font-medium">
                        Cerrar sesión
                    </button>
                </template>
            </div>
        </div>

        <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/40"
        @click="isOpen = false">

        </div>

        <aside class="fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300" :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
            <div class="p-6 flex justify-between items-center">
                <span class="text-xl font-bold text-blue-600">AutoRent</span>
                <button @click="isOpen = false"  class="bg-red-600 text-white w-8 h-8 rounded-full">✕</button>
            </div>

            <nav class="p-6 flex flex-col gap-4">
                <a @click="navigateHome" class="text-gray-700 hover:text-blue-600 cursor-pointer">Inicio</a>
                <a @click="navigateCars" class="text-gray-700 hover:text-blue-600 cursor-pointer">Autos</a>
                <a href="/" class="text-gray-700 hover:text-blue-600 cursor-pointer">Contacto</a>
                
                <hr>

                <button v-if="!isAutenticado" @click="navigateLogin" class="w-full border border-blue-600 text-blue-600 py-2 rounded-lg font-semibold">
                    Iniciar sesión
                </button>

                <template v-else>
                    <button
                        class="w-full text-left text-gray-700 font-medium">
                        Mis reservas
                    </button>

                    <button @click="logout"
                        class="w-full text-left text-red-600 font-medium">
                        Cerrar sesión
                    </button>
                </template>
            </nav>
        </aside>
    </nav>
</template>
<script setup>
    import { ref, computed } from "vue"
    import { useNavigation } from '../composables/useNavigation';
    import { useAuthStore } from '../store/auth.store';

    const { goHome, goCars, goLogin } = useNavigation()
    const isOpen = ref(false)
    const auth = useAuthStore()

    const navigateHome = () => goHome()
    const navigateCars = () => goCars()
    const navigateLogin = () => goLogin()

    const isAutenticado = computed(() => !!auth.token)

    const logout = () => {
        auth.logoutStore();
        goHome();
    }
</script>