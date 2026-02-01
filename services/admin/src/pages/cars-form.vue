<template>
    <Layout>
        <div class="max-x-2xl">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ isEditing ? 'Editar Auto' : 'Añadir Nuevo Auto' }}</h1>
            <p class="text-gray-600 mb-8">Completa los detalles del vehículo</p>
            
                <form @submit.prevent="handleSubmit" class="bg-white p-8 rounded shadow space-y-6">
                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold mb-2">Marca</label>
                            <input v-model="form.marca" type="text" placeholder="ej: Toyota" class="w-full border border-gray-300 rounded p-2" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">Modelo</label>
                            <input v-model="form.modelo" type="text" placeholder="ej: Corolla" class="w-full border border-gray-300 rounded p-2" required>
                        </div>
                    </div>

                    <div class="grid md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-sm font-medium mb-2">Tipo de Vehículo</label>
                                <select v-model="form.tipoVehiculo" class="w-full border border-gray-300 rounded p-2" required>
                                    <option value="">Seleccionar</option>
                                    <option value="Pequeño">Pequeño</option>
                                    <option value="Coupe">Coupe</option>
                                    <option value="Sedán">Sedán</option>
                                    <option value="Suv">SUV</option>
                                    <option value="Van">Van</option>
                                    <option value="Mini Van">Mini Van</option>
                               </select>
                        </div>  
                        <div>
                            <label class="block text-sm font-medium mb-2">Año</label>
                            <input v-model.number="form.anio" type="number" placeholder="2024" class="w-full border border-gray-300 rounded p-2" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">Precio por día</label>
                            <input v-model.number="form.precioPorDia" type="number" placeholder="45" class="w-full border border-gray-300 rounded p-2" required>
                        </div>
                    </div>

                    <div class="grid md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-sm font-medium mb-2">Capacidad</label>
                            <input v-model.number="form.capacidad" type="number" placeholder="5" class="w-full border border-gray-300 rounded p-2" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">Cantidad de Puerta</label>
                            <input v-model.number="form.cantidadpuerta" type="number" placeholder="4" class="w-full border border-gray-300 rounded p-2" required>
                        </div>
                        <div>
                                <label class="block text-sm font-medium mb-2">Kilometraje</label>
                                 <input v-model="form.kilometraje" type="text" placeholder="5,11 / 100" class="w-full border border-gray-300 rounded p-2" required>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-2">Descripción</label>
                        <textarea v-model="form.descripcion" placeholder="Descripción del vehículo" class="w-full border border-gray-300 rounded p-2 h-24" required></textarea>
                    </div>

                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium mb-2">Transmisión</label>
                            <select v-model="form.transmision" class="w-full border border-gray-300 rounded p-2" required>
                                <option value="Manual">Manual</option>
                                <option value="Automática">Automática</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">Combustible</label>
                            <select v-model="form.combustible" class="w-full border border-gray-300 rounded p-2" required>
                                <option value="Gasolina">Gasolina</option>
                                <option value="Diésel">Diésel</option>
                                <option value="Eléctrico">Eléctrico</option>
                                <option value="Híbrido">Híbrido</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-2">Estado</label>
                        <select v-model="form.estado" class="w-full border border-gray-300 rounded p-2" required>
                            <option value="Disponible">Disponible</option>
                            <option value="Rentado">Rentado</option>
                            <option value="Mantenimiento">Mantenimiento</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-2">Imagen del vehículo</label>
                        <input type="file" :disabled="isSubmitting" accept="image/png, image/jpeg" @change="handleImageChange" class="w-full borderm border-gray-300 rounded p-2">
                            <p v-if="imageError" class="text-red-600 text-sm mt-2">
                                {{ imageError }}
                            </p>

                        <div v-if="imagePreview" class="mt-4">
                            <p class="text.sm text-gray-600 mb-2">Vista previa:</p>
                            <img :src="imagePreview" class="w-full h-48 object-cover rounded-lg" alt="Preview del auto">
                        </div>
                    </div>
                            
                    <div class="flex gap-4 pt-6">
                    <button type="submit" class="flex-1 bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        <span v-if="isSubmitting">
                            Guardando...
                        </span>
                      <span v-else>
                            {{ isEditing ? 'Actualizar' : 'Crear' }} Auto
                        </span>
                    </button>
                    <button type="button" @click="goBack" class="flex-1 border border-gray-300 text-gray-700 py-2 rounded font-semibold hover:bg-gray-50">
                        Cancelar
                    </button>
                 </div>
            </form>
        </div>
    </Layout>
</template>

<script setup>
    import Layout from '../components/Layout.vue';

    import { ref, onMounted } from 'vue'
    import { useNavigation } from '../composables/useNavigation';
    import { useRoute } from 'vue-router';
    import { AutoService } from '../services/auto.service';

    const route = useRoute()
    const { goAdminCars } = useNavigation()

    const imageFile = ref(null)
    const imagePreview = ref(null)
    const imageError = ref('')
    const isSubmitting = ref(false)

    const MAX_SIZE_MB = 2
    const ALLOWED_TYPES = ['image/jpeg', 'image/png']

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        imageError.value = ''

        if (!file) return

        if (!ALLOWED_TYPES.includes(file.type)) {
            imageError.value = 'Solo se permiten imagenes JPG o PNG'
            resetImage()
            return
        }

        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            imageError.value = `La imagen no debe superar ${MAX_SIZE_MB}MB`
            resetImage()
            return
        }

        imageFile.value = file
        imagePreview.value = URL.createObjectURL(file)
    }

    const resetImage = () => {
        imageFile.value = null
        imagePreview.value = null
    }

    const isEditing = ref(!!route.params.id)

    const form = ref({
        marca: '',
        modelo: '',
        tipoVehiculo: '',
        anio: new Date().getFullYear(),
        precioPorDia: '',
        descripcion: '',
        transmision: 'Automática',
        combustible: 'Gasolina',
        capacidad: '',
        cantidadpuerta: '',
        kilometraje: '',
        estado: 'Disponible',
    })

    onMounted(async () => {
        if (isEditing.value) {
            const auto = await AutoService.getById(route.params.id);
            form.value = {
                marca: auto.marca,
                modelo: auto.modelo,
                tipoVehiculo: auto.tipoVehiculo,
                anio: auto.anio,
                precioPorDia: auto.precioPorDia,
                descripcion: auto.descripcion,
                transmision: auto.transmision,
                combustible: auto.combustible,
                capacidad: auto.capacidad,
                cantidadpuerta: auto.cantidadpuerta,
                kilometraje: auto.kilometraje,
                estado: auto.estado,
            };

            if (auto.imagen) {
                imagePreview.value = `http://localhost:4000/api${auto.imagen}`
            }
        }
    });

    const handleSubmit = async () => {
        if (isSubmitting.value) return

        isSubmitting.value = true

        const formData = new FormData()

        Object.entries(form.value).forEach(([key, value]) => {
            formData.append(key, value)
        })

        if (imageFile.value) {
            formData.append('imagen', imageFile.value)
        }

        try {
            if (isEditing.value) {
                await AutoService.update(route.params.id, formData)
            } else {
                await AutoService.create(formData);
            }

            goAdminCars();

        } catch (error) {
            console.log(error.message?.data || error)
            alert('Error al guarda el auto')
        } finally {
            isSubmitting.value = false
        }
    }

    const goBack = () => goAdminCars()
</script>