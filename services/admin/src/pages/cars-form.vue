<template>
        <div class="flex h-screen bg-gray-100">
            <Sidebar/>

            <div class="flex-1 flex flex-col">
                <TopBar/>

                <main class="flex-1 overflow-auto p-8">
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
                                        <option value="Economía">Economía</option>
                                        <option value="Compacto">Compacto</option>
                                        <option value="Sedán">Sedán</option>
                                        <option value="SUV">SUV</option>
                                        <option value="Lujo">Lujo</option>
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
                            
                            <div class="flex gap-4 pt-6">
                                <button type="submit" class="flex-1 bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">
                                    {{ isEditing ? 'Actualizar' : 'Crear' }} Auto
                                </button>
                                <button type="button" @click="goBack" class="flex-1 border border-gray-300 text-gray-700 py-2 rounded font-semibold hover:bg-gray-50">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
</template>

<script setup>
    import Sidebar from '../components/Sidebar.vue';
    import TopBar from '../components/TopBar.vue';

    import { ref, onMounted } from 'vue'
    import { useNavigation } from '../composables/useNavigation';
    import { useRoute } from 'vue-router';
    import { AutoService } from '../services/auto.service';

    const route = useRoute()
    const { goAdminCars } = useNavigation()

    const isEditing = ref(!!route.params.id)

    const form = ref({
        marca: '',
        modelo: '',
        tipoVehiculo: '',
        anio: new Date().getFullYear(),
        precioPorDia: '',
        descripcion: '',
        transmision: 'automatic',
        combustible: 'gasoline',
        estado: 'available',
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
                estado: auto.estado,
            };
        }
    });

    const handleSubmit = async () => {
        const payload = {
            marca: form.value.marca,
            modelo: form.value.modelo,
            tipoVehiculo: form.value.tipoVehiculo,
            anio: form.value.anio,
            precioPorDia: form.value.precioPorDia,
            descripcion: form.value.descripcion,
            transmision: form.value.transmision,
            combustible: form.value.combustible,
            estado: form.value.estado,
        };

        if (isEditing.value) {
            await AutoService.update(route.params.id, payload)
        } else {
            await AutoService.create(payload);
        }

        goAdminCars();
    }

    const goBack = () => goAdminCars()
</script>