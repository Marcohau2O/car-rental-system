<template>
    <nav class="bg-[#0f0f0f]/95 backdrop-blur-md shadow-lg fixed top-0 left-0 w-full z-50 border-b border-white/5">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">

            <div class="flex items-center gap-8">
                <button class="md:hidden text-white text-2xl"
                @click="isOpen = true">
                    ☰
                </button>
                <a @click="navigateHome" class="text-2xl font-bold text-white tracking-wide cursor-pointer hover:text-[#ff6b00] transition duration-300">
                    Riviera<span class="text-[#ff6b00]">Rentals</span>
                </a>
                <div class="hidden md:flex gap-8 font-medium">
                    <a @click="navigateHome" class="nav-link">Inicio</a>
                    <a @click="navigateCars" class="nav-link">Autos</a>
                    <a @click="navigateContactanos" class="nav-link">Contactanos</a>   
                    <a @click="navigateOficinas" class="nav-link">Oficinas</a>
                </div>
            </div>

            <div class="hidden md:flex items-center gap-4">
                <button v-if="!isAutenticado" @click="navigateLogin" class="px-5 py-2 rounded-xl font-semibold border border-[#ff6b00] text-[#ff6b00] 
                hover:bg-[#ff6b00] hover:text-white transition duration-300 shadow hover:shadow-orange-500/30">
                    Inicia sesión
                </button>
                <template v-else>
                    <button @click="navigateReservas"
                        class="text-gray-300 hover:text-[#ff6b00] font-medium transition">
                        Mis reservas
                    </button>

                    <button @click="logout"
                        class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">
                        Cerrar sesión
                    </button>
                </template>
            </div>
        </div>

        <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm"
        @click="isOpen = false">

        </div>

        <aside class="fixed top-0 left-0 h-full w-72 bg-[#0f0f0f]/95 border-r border-white/10 shadow-lg z-50 transform transition-transform duration-300" :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
            <div class="p-6 flex justify-between items-center border-b border-white/10 bg-[#0f0f0f]/95">
                <span class="text-xl font-bold text-white">Auto<span class="text-[#ff6b00]">Rent</span></span>
                <button @click="isOpen = false"  class="bg-red-600 text-white w-8 h-8 rounded-full">✕</button>
            </div>

            <nav class="p-6 flex flex-col gap-5 font-medium bg-[#0f0f0f]/95">
                <a @click="navigateHome" class="mobile-link">Inicio</a>
                <a @click="navigateCars" class="mobile-link">Autos</a>
                <a @click="navigateContactanos" class="mobile-link">Contactanos</a>
                <a @click="navigateOficinas" class="mobile-link">Oficinas</a>
                
                <hr class="border-white/10 bg-[#0f0f0f]/95">

                <button v-if="!isAutenticado" @click="navigateLogin" class="bg-[#ff6b00] hover:bg-[#ff8533] text-white py-3 rounded-xl font-semibold transition shadow-lg">
                    Iniciar sesión
                </button>

                <template v-else>
                    <button @click="navigateReservas"
                        class="mobile-link">
                        Mis reservas
                    </button>

                    <button @click="logout"
                        class="text-left text-red-600 font-medium">
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
    import { toastSuccess } from "../utils/alerts";

    const { goHome, goCars, goContactanos, goOficinas, goLogin, goMisReservas } = useNavigation()
    const isOpen = ref(false)
    const auth = useAuthStore()

    const navigateHome = () => goHome()
    const navigateCars = () => goCars()
    const navigateLogin = () => goLogin()
    const navigateReservas = () => goMisReservas()
    const navigateContactanos = () => goContactanos()
    const navigateOficinas = () => goOficinas()

    const isAutenticado = computed(() => !!auth.token)

    const logout = () => {
        auth.logoutStore();

        toastSuccess("Sesión cerrada Correctamente")
        setTimeout(() => {
            goHome();
        }, 1000)
    }
</script>

<style scoped>
.nav-link {
    color: #d1d5db;
    position: relative;
    cursor: pointer;
    transition: .3s;
}
.nav-link:hover {
    color: #ff6b00;
}
.nav-link::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 0%;
    height: 2px;
    background: #ff6b00;
    transition: .3s;
}
.nav-link:hover::after {
    width: 100%;
}

.mobile-link {
    color: #e5e7eb;
    cursor: pointer;
    transition: -3s;
}

.mobile-link:hover {
    color: #ff6b00;
    transform: translateX(6px);
}
</style>