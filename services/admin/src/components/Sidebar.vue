<template>
    <aside class="w-64 h-full flex flex-col">
        <div class="p-6 border-b border-gray-800 flex justify-between items-center">
            <h1 class="text-2xl font-bold">RentaCar</h1>

            <button
                class="md:hidden text-xl"
                @click="$emit('close')"
            >
                ✖
            </button>
        </div>

        <nav class="flex-1 p-4 space-y-2">
            <button v-if="hasRoles([1,3])" @click="goAdminDashboard" class="block px-4 py-2 rounded hover:bg-gray-800 transition cursor-pointer">
                📊 Dashboard
            </button>
            <button v-if="hasRoles([1,3])" @click="goAdminCars" class="block px-4 py-2 rounded hover:bg-gray-800 transition cursor-pointer">
                🚗 Gestión de Autos
            </button>
            <button v-if="hasRoles([1,3])" @click="goAdminReservations" class="block px-4 py-2 rounded hover:bg-gray-800 transition cursor-pointer">
                📋 Reservaciones
            </button>
            <button v-if="hasRoles([1])" @click="goAdminUsers" class="block px-4 py-2 rounded hover:bg-gray-800 transition cursor-pointer">
                👥 Usuarios
            </button>
            <button v-if="hasRoles([1,3])" @click="goAdminCalendario" class="block px-4 py-2 rounded hover:bg-gray-800 transition cursor-pointer">
                📊 Calendario
            </button>
            <!-- <a href="#" class="block px-4 py-2 rounded hover:bg-gray-800 transition">
                📊 Reportes
            </a>
            <a href="#" class="block px-4 py-2 rounded hover:bg-gray-800 transition">
                ⚙️ Configuración
            </a> -->
        </nav>

        <div class="p-4 border-t border-gray-800">
            <button @click="logout" class="w-full text-left block px-4 py-2 rounded hover:bg-gray-800 transition cursor-pointer text-sm">
                🚪 Cerrar Sesión
            </button>
        </div>
    </aside>
</template>

<script setup>
    import { computed } from 'vue'
    import { useNavigation } from '../composables/useNavigation';
    import { useAuthStore } from '../stores/auth.store'
    import { getUser } from '../utils/auth';

    //logoutAdmin from ../utils/auth
     const auth = useAuthStore();

    const { goAdminDashboard, goAdminCars, goAdminReservations, goAdminUsers, goAdminLogin, goAdminCalendario } = useNavigation()

    const RolUsuario = computed(() => getUser())

    const hasRoles = (roles = []) => {
        if (!RolUsuario.value) return false
        return roles.includes(RolUsuario.value.roleId)
    }

    const logout = () => {
        auth.logout();
        goAdminLogin();
    }
</script>