<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-400 to-blue-800 flex items-center">
        <div class="container mx-auto px-4">
            <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
                <!-- <div class="flex justify-center">
                    <img src="" alt="Logo" class="h-[13rem] w-auto object-contain">
                </div> -->
                <h1 class="text-3xl font-bold text-gray-900">Bienvenidos a Riviera Rentals</h1>
                <p class="text-gray-600">Create un cuenta para acceder a nuestro sitio web</p>

                <form @submit.prevent="handleRegister" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">Nombre:</label>
                        <input v-model="form.nombre" type="text" placeholder="Marco Hau" class="w-full border border-gray-300 rounded p-2" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Correo:</label>
                        <input v-model="form.correo" type="email" placeholder="user@diminio.com" class="w-full border border-gray-300 rounded p-2" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Contraseña:</label>
                        <input v-model="form.password" type="password" placeholder="••••••••" class="w-full border border-gray-300 rounded p-2" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Telefono:</label>
                        <input v-model="form.telefono" type="texy" placeholder="9982418792" class="w-full border border-gray-300 rounded p-2" required>
                    </div>
                    <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">
                        Registrate
                    </button>
                </form>

                <p class="text-center text-gray-600 text-sm mt-4">
                    Ya tiene una cuenta? <a @click="goLogin" class="text-blue-600 hover:underline">Inicia sesión</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { reactive } from 'vue';
    import { useNavigation } from '../composables/useNavigation';
    import { useAuthStore } from '../store/auth.store';
    
    const { goLogin } = useNavigation()
    const auth = useAuthStore()

    const form = reactive({
        nombre: '',
        correo: '',
        password: '',
        telefono: '',
    })

    const handleRegister = async () => {
        if (!form.nombre || !form.correo || !form.password || !form.telefono) {
            alert("Los campos son obligatorios")
        }

        try {
            await auth.registerStore(form)
            goLogin()
        } catch (e) {
            alert(e.response?.data?.message || 'Error al registrarse')
        }
    }

</script>