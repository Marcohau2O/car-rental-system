<template>
    <div class="flex h-screen bg-gray-100">
        <Sidebar />

        <div class="flex-1 flex-col">
            <TopBar/>

            <main class="flex-1 overflow-auto p-8">
                <div class="flex justify-between items-center mb-8">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900">Gestion de Autos</h1>
                        <p class="text-gray-600">Administra el inventario de vehículos</p>
                    </div>
                    <a @click="goAdminCarsForm()" class="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"> + Añadir Auto</a>
                </div>

                <div class="bg-white p-4 rounded shadow mb-6 flex gap-4">
                    <input v-model="searchTerm" type="text" name="" id="" placeholder="Bucar Auto.."
                    class="border border-gray-300 rounded px-3 py-2 flex-1">
                    <select v-model="statusFilter" name="" id="" class="border border-gray-300 rounded px-3 py-2">
                        <option value="">Todos los estados</option>d
                        <option value="Disponible">Disponible</option>
                        <option value="Rentado">Rentado</option>
                        <option value="Mantenimiento">Mantenimiento</option>
                    </select>
                </div>

                <div class="bg-white rounded shadow overflow-hidden">
                    <table class="w-full">
                        <thead class="bg-gray-50 border-b">
                            <tr>
                                <th class="text-left px-6 py-3 font-semibold">Auto</th>
                                <th class="text-left px-6 py-3 font-semibold">Tipo</th>
                                <th class="text-left px-6 py-3 font-semibold">Precio/día</th>
                                <th class="text-left px-6 py-3 font-semibold">Estado</th>
                                <th class="text-left px-6 py-3 font-semibold">Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y">
                            <tr v-for="car in paginadoAutos" :key="car.id" class="hover:bg-gray-50">
                                <td class="px-6 py-3">{{ car.marca }} - {{ car.modelo }}</td>
                                <td class="px-6 py-3">{{ car.tipoVehiculo }}</td>
                                <td class="px-6 py-3">${{ car.precioPorDia }}</td>
                                <td class="px-6 py-3">
                                <span :class="getStatusColor(car.estado)" class="px-2 py-1 rounded text-xs font-semibold">
                                    {{ car.estado }}
                                </span>
                                </td>
                                <td class="px-6 py-3">
                                <button @click="editCar(car.id)" class="text-blue-600 hover:underline text-sm mr-3">Editar</button>
                                <button @click="deleteCar(car.id)" class="text-red-600 hover:underline text-sm">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex justify-between items-center mt-4">
                        <p class="text-sm text-gray-600">
                            Página {{ paginaActual }} de {{ totalPaginas }}
                        </p>

                        <div class="flex gap-1">
                            <button
                                @click="goToPagina(paginaActual - 1)"
                                :disabled="paginaActual === 1"
                                class="px-3 py-1 border rounded disabled:opacity-50"
                                >
                                Anterior
                            </button>

                            <button
                                v-for="pagina in totalPaginas"
                                :key="pagina"
                                @click="goToPagina(pagina)"
                                :class="[
                                    'px-3 py-1 border rounded',
                                    pagina === paginaActual
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700'
                                ]"
                                >
                                {{ pagina }}
                            </button>

                            <button
                                @click="goToPagina(paginaActual + 1)"
                                :disabled="paginaActual === totalPaginas"
                                class="px-3 py-1 border rounded disabled:opacity-50"
                                >
                                Siguiente
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted, watch } from 'vue'
    import Sidebar from '../components/Sidebar.vue';
    import TopBar from '../components/TopBar.vue';
    import { useNavigation } from '../composables/useNavigation';
    import { AutoService } from '../services/auto.service';

    const { goAdminCarsForm } = useNavigation()
    
    const searchTerm = ref('')
    const statusFilter = ref('')
    const cars = ref([])

    //paginacion
    const paginaActual = ref(1)
    const tamañoPagina = ref(4)

    const paginadoAutos = computed(() => {
        const start = (paginaActual.value - 1) * tamañoPagina.value
        const end = start + tamañoPagina.value
        return filteredCars.value.slice(start, end)
    })


    const totalPaginas = computed(() =>
        Math.ceil(filteredCars.value.length / tamañoPagina.value)
    )

    const goToPagina = (page) => {
        if (page >= 1 && page <= totalPaginas.value) {
            paginaActual.value = page
        }
    }

    watch([searchTerm, statusFilter], () => {
        paginaActual.value = 1
    })

    onMounted(async () => {
        cars.value = await AutoService.getAll();
    })
 
    const filteredCars = computed(() => {
        return cars.value.filter(car => {
            const nameMatch = `${car.marca} ${car.modelo}`.toLowerCase().includes(searchTerm.value.toLowerCase())
            const statusMatch = !statusFilter.value || car.estado === statusFilter.value
            return nameMatch && statusMatch
        })
    })

    const getStatusColor = (estado) => {
        const colors = {
            'Disponible': 'bg-green-100 text-green-800',
            'Rentado': 'bg-blue-100 text-blue-800',
            'Mantenimiento': 'bg-yellow-100 text-yellow-800',
    }
        return colors[estado] || 'bg-gray-100 text-gray-800'
    }

    const editCar = (id) => goAdminCarsForm(id)

    const deleteCar = async (id) => {
        const confirmacion = confirm('¿Estás seguro de que deseas eliminar este auto?');
        if (!confirmacion) return

        await AutoService.delete(id);
        cars.value = cars.value.filter(c => c.id !== id)
    }
</script>