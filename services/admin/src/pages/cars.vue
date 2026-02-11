<template>
    <Layout>
        <div class="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">
            <div>
                <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
                    Gestión de Autos
                </h1>
                    <p class="text-gray-600 text-sm md:text-base">
                        Administra el inventario de vehículos
                    </p>
            </div>
            
            <button v-if="hasRole([1])" @click="goAdminCarsForm()" class="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 w-full md:w-auto">
                + Añadir Auto
            </button>
        </div>

        <div class="bg-white p-4 rounded shadow mb-6 flex flex-col md:flex-row gap-4">
            <input v-model="searchTerm" placeholder="Buscar auto..." class="border border-gray-300 rounded px-3 py-2 flex-1">
                <select v-model="statusFilter"class="border border-gray-300 rounded px-3 py-2 w-full md:w-56">
                    <option value="">Todos los estados</option>
                    <option value="Disponible">Disponible</option>
                    <option value="Rentado">Rentado</option>
                    <option value="Mantenimiento">Mantenimiento</option>
               </select>
        </div>

        <div v-if="loading" class="md:hidden">
            <div class="py-10">
                <Spinner />
            </div>
        </div>

        <div v-else class="md:hidden space-y-4">
            <div v-for="car in paginadoAutos":key="car.id" class="bg-white rounded shadow p-4">
                <div class="flex gap-4">
                    <img v-if="car.imagen" :src="`${API_BASE_URL}${car.imagen}`" class="w-24 h-16 object-cover rounded border">
                    <div class="flex-1">
                        <p class="font-semibold">
                            {{ car.marca }} {{ car.modelo }}
                        </p>
                        <p class="text-sm text-gray-500">
                            {{ car.tipoVehiculo }} · {{ car.anio }}
                        </p>
                        <p class="mt-1 font-semibold">
                            ${{ car.precioPorDia }} / día
                        </p>

                        <span :class="getStatusColor(car.estado)" class="inline-block mt-2 px-2 py-1 rounded text-xs font-semibold">
                            {{ car.estado }}
                        </span>
                    </div>
                </div>

                <div class="flex gap-4 mt-4">
                    <button v-if="hasRole([1, 3])" @click="editCar(car.id)" class="text-blue-600 text-sm font-medium">
                        Editar
                    </button>
                    <button v-if="hasRole([1])" @click="deleteCar(car.id)" class="text-red-600 text-sm font-medium">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>

        <div class="hidden md:block bg-white rounded shadow overflow-x-auto">
            <table class="w-full min-w-[800px]">
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
                    <tr v-if="loading">
                        <td colspan="5", class="py-10">
                            <Spinner />
                        </td>
                    </tr>
                    <tr v-else v-for="car in paginadoAutos" :key="car.id" class="hover:bg-gray-50">
                        <td class="px-6 py-3">
                            <div class="flex items-center gap-3">
                                <img v-if="car.imagen" :src="`${API_BASE_URL}${car.imagen}`" class="w-16 h-12 object-cover rounded border">
                                <div>
                                    <p class="font-medium">
                                        {{ car.marca }} {{ car.modelo }}
                                    </p>
                                    <p class="text-xs text-gray-500">
                                        {{ car.anio }}
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-3">{{ car.tipoVehiculo }}</td>
                        <td class="px-6 py-3">${{ car.precioPorDia }}</td>
                        <td class="px-6 py-3">
                            <span :class="getStatusColor(car.estado)" class="px-2 py-1 rounded text-xs font-semibold">
                                {{ car.estado }}
                            </span>
                        </td>
                        <td class="px-6 py-3">
                            <button v-if="hasRole([1,3])" @click="editCar(car.id)" class="text-blue-600 mr-3">
                                Editar
                            </button>
                            <button v-if="hasRole([1])" @click="deleteCar(car.id)" class="text-red-600">
                                Eliminar
                            </button>
                            </td>
                    </tr>
                </tbody>
            </table>
            
            <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-6">
                <p class="text-sm text-gray-600 text-center md:text-left">
                   Página {{ paginaActual }} de {{ totalPaginas }}
                </p>
                
                <div class="flex flex-wrap justify-center gap-1">
                   <button @click="goToPagina(paginaActual - 1)" :disabled="paginaActual === 1" class="px-3 py-1 border rounded disabled:opacity-50">
                        Anterior
                    </button>

                    <button v-for="pagina in totalPaginas" :key="pagina" @click="goToPagina(pagina)"
                            class="px-3 py-1 border rounded"
                            :class="pagina === paginaActual
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700'"
                    >
                        {{ pagina }}
                    </button>

                    <button @click="goToPagina(paginaActual + 1)" :disabled="paginaActual === totalPaginas" class="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup>
    import { ref, computed, onMounted, watch } from 'vue'
    import Layout from '../components/Layout.vue';
    import { useNavigation } from '../composables/useNavigation';
    import { AutoService } from '../services/auto.service';
    import { API_BASE_URL } from '../config/endpoint';
    import { getUser } from '../utils/auth';
    import Spinner from '../components/Spinner.vue';

    const { goAdminCarsForm } = useNavigation()
    
    const searchTerm = ref('')
    const statusFilter = ref('')
    const cars = ref([])

    //paginacion
    const paginaActual = ref(1)
    const tamañoPagina = ref(4)

    const loading = ref(true)

    const paginadoAutos = computed(() => {
        const start = (paginaActual.value - 1) * tamañoPagina.value
        const end = start + tamañoPagina.value
        return filteredCars.value.slice(start, end)
    })

    const RolUsuario = computed(() => getUser())

    const hasRole = (roles = []) => {
        if (!RolUsuario.value) return false
        return roles.includes(RolUsuario.value.roleId)
    }

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
        try {
            const autos = await AutoService.getAll()
            
            await new Promise(r => setTimeout(r, 500))

            cars.value = autos
        } finally {
            loading.value = false
        }
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