<template>
    <aside class="w-64 bg-gray-900 text-white flex flex-col">
        <div class="p-6 border-b border-gray-800">
            <h1 class="text-2xl font-bold">RentaCar</h1>
        </div>

        <nav class="flex-1 p-4 space-y-2">
            <a @click="goAdminDashboard" class="block px-4 py-2 rounded hover:bg-gray-800 transition cursor-pointer">
                📊 Dashboard
            </a>
            <a @click="goAdminCars" class="block px-4 py-2 rounded hover:bg-gray-800 transition cursor-pointer">
                🚗 Gestión de Autos
            </a>
            <a @click="goAdminReservations" class="block px-4 py-2 rounded hover:bg-gray-800 transition cursor-pointer">
                📋 Reservaciones
            </a>
            <a @click="goAdminUsers" class="block px-4 py-2 rounded hover:bg-gray-800 transition cursor-pointer">
                👥 Usuarios
            </a>
            <!-- <a href="#" class="block px-4 py-2 rounded hover:bg-gray-800 transition">
                📊 Reportes
            </a>
            <a href="#" class="block px-4 py-2 rounded hover:bg-gray-800 transition">
                ⚙️ Configuración
            </a> -->
        </nav>

        <div class="p-4 border-t border-gray-800">
            <button @click="logout" class="w-full text-left px-4 py-2 rounded hover:bg-gray-800 transition text-sm">
                🚪 Cerrar Sesión
            </button>
        </div>
    </aside>
</template>

<script setup>
    import { useNavigation } from '../composables/useNavigation';
    import { useAuthStore } from '../stores/auth.store'

    //logoutAdmin from ../utils/auth
     const auth = useAuthStore();

    const { goAdminDashboard, goAdminCars, goAdminReservations, goAdminUsers, goAdminLogin } = useNavigation()

    const logout = () => {
        auth.logout();
        goAdminLogin();
    }
</script>