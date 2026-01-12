<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center">
        <div class="container mx-auto px-4">
            <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
                <div class="flex justify-center">
                    <img src="../assets/img/RentaCar.png" alt="" class="h-[13rem] w-auto object-contain"></img>
                </div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">Panel Admin</h1>
                <p class="text-gray-600 mb-6">Inicia sessión para acceder</p>

                <form @submit.prevent="handleLogin" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">Email:</label>
                        <input v-model="form.correo" type="email" placeholder="admin@autorent.com" class="w-full border border-gray-300 rounded p-2" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Contraseña</label>
                        <input v-model="form.password" type="password" placeholder="••••••••" class="w-full border border-gray-300 rounded p-2" required>
                    </div>
                    <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">
                        Inicia Sesión
                    </button>
                </form>

                <p class="text-center text-gray-600 text-sm mt-4">
                    ¿Problemas para iniciar sesión? <a href="#" class="text-blue-600 hover:underline">Contacta soporte</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { reactive } from 'vue'
    import { useNavigation } from '../composables/useNavigation';
    import { useAuthStore } from '../stores/auth.store';

    const auth = useAuthStore();

    const form = reactive({
        correo: '',
        password: '',
    })

    const { goAdminDashboard } = useNavigation()

    const handleLogin = async () => {
        if (!form.correo || !form.password) {
            alert("Correo y password son obligatorios");
            return;
        }

        try {
            await auth.login(form);
            goAdminDashboard();
        } catch (e) {
            console.error(e)
            alert(e.response?.data?.message || "Error al iniciar sesión")
        }
    }

</script>