<template>
    <div class="min-h-screen bg-[#f6f7fb] overflow-hidden">
        <Navbar/>

        <div class="fixed top-[-120px] right-[-120px] w-[420px] h-[420px] bg-[#e5be01] opacity-20 blur-[130px] rounded-full animate-glow"></div>
        <div class="fixed bottom-[-120px] left-[-120px] w-[420px] h-[420px] bg-[#e5be01] opacity-10 blur-[130px] rounded-full animate-glow"></div>

        <div class="max-w-5xl mx-auto px-4 py-10 pt-28 relative">
            <div class="grid md:grid-cols-2 gap-10">
                <div class="md:col-span-2 space-y-6">
                    <div class="card-box">
                        <h2 class="text-3xl font-extrabold mb-6 hero-title">
                            Datos de <span class="text-[#e5be01]">Contrato</span> Vehículo
                        </h2>

                        <div class="mb-8">
                            <h3 class="section-title">Información Contrato</h3>
                            <div class="grid gap-4 mt-3">
                                <div class="mb-8">
                                    <label class="label">Nombre completo</label>
                                    <input type="text" placeholder="Nombre completo" class="input">
                                </div>
                                <div class="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="label">Teléfono</label>
                                        <input type="text" class="input">
                                    </div>
                                    <div>
                                        <label class="label">Correo Electronico</label>
                                        <input type="text" class="input">
                                    </div>
                                </div>

                                <div class="space-y-3 mt-3">
                                    <h3 class="section-title">¿Eres Extrajero?</h3>
                                    <label class="check-row">
                                        <input type="checkbox">
                                        Soy extrajero
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="md:col-span-2">
                            <h3 class="section-title">Fotos INE Y Selfie</h3>
                            <label class="label">
                                Foto DNI (frente y dorso)
                            </label>
                                <div class="upload-box">
                                    <input type="file" accept="image/png, image/jpeg" :disabled="isSubmitting" @change="handleLicenciaChange">
                                    <span>Subir imagen</span>
                                </div>
                            <p v-if="licenciaError" class="text-red-600 text-sm mt-2">
                                {{ licenciaError }}
                            </p>

                            <img v-if="licenciaPreview"
                                :src="licenciaPreview"
                                class="w-full h-44 object-cover rounded-xl mt-4 shadow">
                        </div>
                        <div class="md:col-span-2">
                            <label class="label">
                                Selfie con licencia de conducir
                            </label>
                            <div class="upload-box">
                                <input type="file" accept="image/png, image/jpeg" :disabled="isSubmitting" @change="handleLicenciaChange">
                                <span>Subir imagen</span>
                            </div>
                            <p v-if="licenciaError" class="text-red-600 text-sm mt-2">
                                {{ licenciaError }}
                            </p>

                            <img v-if="licenciaPreview"
                                :src="licenciaPreview"
                                class="w-full h-44 object-cover rounded-xl mt-4 shadow">
                        </div>
                        
                        <div class="mt-5">
                            <h3 class="section-title">Información Contacto Emergencia</h3>
                            <div class="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label class="label">Nombre completo</label>
                                    <input type="text" class="input">
                                </div>
                                <div>
                                    <label class="label">Numero Telefonico</label>
                                    <input type="text" class="input">
                                </div>
                            </div>  
                        </div>

                        <div class="space-y-3 mt-3">
                            <h3 class="section-title">He leido y acepto los términos y condiciones del servicio</h3>
                            <label class="check-row">
                                <input type="checkbox">
                                    Estoy de acuerdo
                            </label>
                        </div>

                        <div class="mt-6">
                            <h2 class="section-title">Firma Digital</h2>

                            <canvas
                            ref="canvasRef"
                            width="500"
                            height="200"
                            class="border rounded-xl bg-white w-full"
                            @mousedown="startDraw"
                            @mouseup="endDraw"
                            @mousemove="draw"
                            @mouseleave="endDraw"
                            ></canvas>

                            <button type="button" @click="limpiarFirma" class="mt-2 text-sm text-red-500">
                                Limpiar firma
                            </button>
                        </div>

                        <div class="mt-6">
                            <h2 class="section-title">Ubicación actual</h2>

                            <button type="button" @click="obtenerUbicacion" class="btn-pay mt-3">
                                Obtener ubicación
                            </button>

                            <div v-if="form.latitud" class="text-sm mt-2">
                                Lat: {{ form.latitud }} <br /> Lng: {{ form.longitud }}
                            </div>
                        </div>

                        <button
                        type="button"
                        @click="guardarDatos"
                        class="w-full btn-pay mt-8"
                        :disabled="isSubmitting"
                        >
                            <span v-if="isSubmitting">Guardando...</span>
                            <span v-else>Continuar a Pago</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import Navbar from '../components/Navbar.vue';
    import { useRoute, useRouter } from 'vue-router';

    const isSubmitting = ref(false)
    const route = useRoute()
    const router = useRouter()

    const reservaId = route.params.id

    const form = ref({
        nombre: '',
        telefono: '',
        correo: '',
        extrajero: false,
        emergenciaNombre: '',
        emergenciaTelefono: '',
        aceptaTerminos: false,
        latitud: null,
        longitud: null
    })

    const ineFile = ref(null)
    const inePreview = ref(null)

    const selfieFile = ref(null)
    const selfiePreview = ref(null)

    const MAX_SIZE_MB = 3
    const ALLOWED_TYPES = ['image/jpeg','image/png']

    const handleFile = (event, type) => {
        const file = event.target.files[0]

        if(!file) return

        if (!ALLOWED_TYPES.includes(file.type)) {
            alert('Solo JPG o PNG')
            return
        }

        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            alert('Imagen demasiado grande')
            return
        }

        const preview = URL.createObjectURL(file)

        if (type === 'ine') {
            ineFile.value = file
            inePreview.value = preview
        } else {
            selfieFile.value = file
            selfiePreview.value = preview
        }
    }

    const canvasRef = ref(null)
    let ctx = null
    let drawing = false

    onMounted(() => {
        const canvas = canvasRef.value
        ctx = canvas.getContext('2d')
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
    })

    const startDraw = (e) => {
        drawing = true
        draw(e)
    }

    const endDraw = () => {
        drawing = false
        ctx.beginPath()
    }

    const draw = (e) => {
        if (!drawing) return

        const rect = canvasRef.value.getBoundingClientRect()
        ctx.lineTo(
            e.clientX - rect.left,
            e.clientY - rect.top
        )
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(
            e.clientX - rect.left,
            e.clientY - rect.top
        )
    }

    const limpiarFirma = () => {
        ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
    }

    const obtenerFirmaBase64 = () => {
        return canvasRef.value.toDataURL('image/png')
    }

    const obtenerUbicacion = () => {
        if (!navigator.geolocation) {
            alert('Geolocalización no soportada')
            return
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                form.value.latitud = pos.coords.latitude
                form.value.longitud = pos.coords.longitude
            },
            () => {
                alert('No se pudo obtener ubicación')
            }
        )
    }

    const guardarDatos = async () => {
    // if (!form.value.nombre) {
    //     alert('Nombre obligatorio')
    //     return
    // }

    // if (!form.value.aceptaTerminos) {
    //     alert('Debes aceptar términos')
    //     return
    // }

    // if (!ineFile.value || !selfieFile.value) {
    //     alert('Documentación obligatoria')
    //     return
    // }

    const firmaBase64 = obtenerFirmaBase64()

    const formData = new FormData()

    Object.entries(form.value).forEach(([key,value]) => {
        formData.append(key, value)
    })

    formData.append('ine', ineFile.value)
    formData.append('selfie', selfieFile.value)
    formData.append('firma', firmaBase64)

    isSubmitting.value = true

    try {
        // await ServicioContrato.enviarDatos(formData)
        console.log('Datos listos para enviar')

        router.push(`/success/${reservaId}`)
        } catch (error) {
            console.error(error)
        } finally {
            isSubmitting.value = false
        }
    }
</script>

<style scoped>
.card-box {
  background: rgba(255,255,255,.85);
  backdrop-filter: blur(14px);
  border-radius: 22px;
  padding: 28px;
  box-shadow: 0 25px 60px rgba(0,0,0,.08);
  border:1px solid #f1f1f1;
  transition:.4s;
}
.card-box:hover {
  transform:translateY(-6px);
  box-shadow:0 30px 70px rgba(0,0,0,.12);
}

.section-title {
  font-weight:700;
  margin-bottom:12px;
  font-size:18px;
}

.label {
  display:block;
  font-size:13px;
  margin-bottom:6px;
  font-weight:600;
  color:#444;
}

.input {
  width:100%;
  border:1px solid #e5e7eb;
  padding:12px 14px;
  border-radius:12px;
  background:white;
  transition:.3s;
}

.input:focus {
  outline:none;
  border-color:#e5be01;
  box-shadow:0 0 0 3px rgba(255,107,0,.15);
}

.upload-box {
  border:2px dashed #ddd;
  padding:20px;
  border-radius:14px;
  text-align:center;
  cursor:pointer;
  transition:.3s;
  background:#fafafa;
}
.upload-box:hover {
  border-color:#e5be01;
  background:#fff7f0;
}

.check-row {
  display:flex;
  align-items:center;
  gap:10px;
  background:#f9fafb;
  padding:12px;
  border-radius:12px;
  cursor:pointer;
  transition:.3s;
}
.check-row:hover {
  background:#fff3ea;
}

.row {
  display:flex;
  justify-content:space-between;
}

.btn-pay {
  background:#e5be01;
  color:white;
  padding:16px;
  border-radius:14px;
  font-weight:700;
  transition:.35s;
  box-shadow:0 15px 40px rgba(255,107,0,.35);
}
.btn-pay:hover {
  background:#c5a503;
  transform:translateY(-3px);
  box-shadow:0 25px 60px rgba(255,107,0,.45);
}

.hero-title {
  opacity:0;
  transform:translateY(40px);
  animation:titleReveal 1s ease forwards;
}

@keyframes titleReveal {
  to{opacity:1; transform:translateY(0);}
}

@keyframes glowMove {
  0%{transform:translateY(0)}
  50%{transform:translateY(-25px)}
  100%{transform:translateY(0)}
}
.animate-glow {
  animation:glowMove 7s ease-in-out infinite;
}

.animate-fadeUp {
  animation:fadeUp .8s ease;
}
@keyframes fadeUp {
  from{opacity:0; transform:translateY(30px)}
  to{opacity:1; transform:translateY(0)}
}
</style>