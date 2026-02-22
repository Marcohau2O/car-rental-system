<template>
    <div class="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#1e293b] flex items-center justify-center relative overflow-hidden">
        <div class="absolute top-[-120px] right-[-120px] w-[350px] h-[350px] bg-[#ff6b00] opacity-30 blur-[120px] rounded-full"></div>
        <div class="absolute bottom-[-120px] left-[-120] w-[350px] h-[350px] bg-[#ff6b00] opacity-20 blur-[120px] rounded-full"></div>

        <div class="relative w-full max-w-md mx-auto px-6">
            <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 animate-fade-in">
                <!-- <div class="flex justify-center">
                    <img src="" alt="Logo" class="h-[13rem] w-auto object-contain">
                </div> -->
                <div class="text-center mb-6">
                    <h1 class="text-3xl font-extrabold text-white tracking-tight">Bienvenidos a Riviera Rentals</h1>
                    <p class="text-gray-300 text-sm mt-2">Inicia sessión para acceder a nuestro sitio web</p>
                </div>

                <form @submit.prevent="handleLogin" class="space-y-5">
                    <div class="input-group">
                        <label>Email:</label>
                        <input v-model="form.correo" type="email" placeholder="user@diminio.com" class="w-full bg-white/10 text-white" required>
                    </div>
                    <div class="input-group">
                        <label>Contraseña:</label>
                        <input v-model="form.password" type="password" placeholder="••••••••" class="w-full bg-white/10 text-white" required>
                    </div>
                    <button type="submit" class="btn-button w-full">
                        Inicia Sesión
                    </button>
                </form>

                <p class="text-center text-white text-sm mt-6">
                    ¿Aun no tienes una cuenta? <a @click="goRegistro" class="link">Crear cuenta</a>
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

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(25px) scale(.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-fade-in {
  animation: fade-in .7s ease;
}

@keyframes floatGlow {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-25px); }
  100% { transform: translateY(0px); }
}

.absolute {
  animation: floatGlow 7s ease-in-out infinite;
}


.btn-button {
    background: #ff6b00;
    color: white;
    padding: 16px 26px;
    border-radius: 16px;
    font-weight: 600;
    letter-spacing: .3s;
    transition: .35s;
    box-shadow: 0 15px 35px rgba(255, 107, 0, .35);
    white-space: nowrap;
}

.btn-button:hover {
    background: #ff8533;
    transform: translateY(-3px);
    box-shadow: 0 25px 60px rgba(255, 107, 0, .45);
}

.btn-button:active {
    transform: scale(.96);
}

.input-group {
    display: flex;
    flex-direction: column;
}

.input-group label {
    font-size: 13px;
    color: white;
    margin-bottom: 6px;
    font-weight: 500;
}

.input-group input {
    border: 1px solid rgba(255,255,255,.15);
    background: rgba(255,255,255,.05);
    color: white;
    border-radius: 12px;
    padding: 14px;
    transition: .35s;
    outline: none;
    font-weight: 300;
}

.input-group input:focus {
    border-color: #ff6b00;
    box-shadow: 0 0 0 3px rgba(255, 107, 0, .15);
    transform: scale(1.02);
}

.link {
    color: #ff6b00;
    position: relative;
    cursor: pointer;
    transition: .3s;
}

.link:hover {
    color: #ff6b00;
}

.link::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 0%;
    height: 2px;
    background: #ff6b00;
    transition: .3s;
}

.link:hover::after {
    width: 100%;
}
</style>