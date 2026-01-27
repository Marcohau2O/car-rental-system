<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-400 to-blue-800 flex items-center">
        <div class="container mx-auto px-4">
            <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
                <!-- <div class="flex justify-center">
                    <img src="" alt="Logo" class="h-[13rem] w-auto object-contain">
                </div> -->
                <h1 class="text-3xl font-bold text-gray-900">Bienvenidos a Riviera Rentals</h1>
                <p class="text-gray-600">Inicia sessión para acceder a nuestro sitio web</p>

                <form @submit.prevent="handleLogin" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">Email:</label>
                        <input v-model="form.correo" type="email" placeholder="user@diminio.com" class="w-full border border-gray-300 rounded p-2" required>
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
                    ¿Aun no tienes una cuenta? <button @click="goRegistro" class="text-blue-600 hover:underline">Registrate</button>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { reactive } from 'vue';
    import { useNavigation } from '../composables/useNavigation';
    import { useRoute, useRouter } from 'vue-router';
    import { useAuthStore } from '../store/auth.store';

    const auth = useAuthStore();
    const route = useRoute()
    const router = useRouter()

    const form = reactive({
        correo: '',
        password: '',
    })

    
    const { goRegistro } = useNavigation()

    const handleLogin = async () => {
        if (!form.correo || !form.password) {
            alert("Correo y Contraseña son oblihatorios");
            return;
        }

        try {
            await auth.loginStore(form);
                const redirect = route.query.redirect || '/'
                router.push(redirect)

        } catch (e) {
            console.log(e)
            alert(e.response?.data?.message || "Error al iniciar sesión")
        }
    }


</script>