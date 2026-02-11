<template>
      <Layout>
        <div class="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
            <p class="text-gray-600 text-sm md:text-base">Administra los usuarios registrados</p>
          </div>
          <a @click="goAdminUserForm()" class="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 w-full md:w-auto">
            + Nuevo Usuario
          </a>
        </div>

        <!-- Filtros -->
        <div class="bg-white p-4 rounded shadow mb-6 flex flex-col md:flex-row gap-4">
          <input v-model="searchTerm" type="text" placeholder="Buscar usuario..." class="border border-gray-300 rounded px-3 py-2 flex-1">
          <select v-model="roleFilter" class="border border-gray-300 rounded px-3 py-2 w-full md:w-56">
            <option value="">Todos los roles</option>
            <option value="ADMIN">Administrador</option>
            <option value="PERSONAL">Personal</option>
            <option value="USER">Usuarios</option>
          </select>
        </div>

        <div v-if="loading" class="md:hidden">
            <div class="py-10">
                <Spinner />
            </div>
        </div>
        
        <div v-else class="md:hidden space-y-4">
          <div v-for="user in paginadoAutos" :key="user.id" class="bg-white rounded-lg shadow p-4 space-y-3">
            <div class="flex justify-between items-start">
              <div>
                <h2 class="font-semibold text-gray-900 text-base">{{ user.nombre }}</h2>
                <p class="text-sm text-gray-500">{{ user.correo }}</p>
              </div>

              <span :class="getRoleColor(user.rol?.nombre)" class="px-2 py-1 rounded text-xs font-semibold">
                {{ user.rol?.nombre }}
              </span>
            </div>

            <div class="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Teléfono:</strong>
                {{ user.telefono }}
              </p>
              <p>
                <strong>Miembro desde:</strong>
                {{ user.fechaCreacion }}
              </p>
            </div>

            <div class="flex gap-3 pt-3 border-t">
              <button @click="editUser(user.id)" class="flex-1 text-blue-600 border border-blue-600 rounded py-2 text-sm font-semibold hover:bg-blue-50">
                Editar
              </button>
              <button @click="deleteUser(user.id)" class="flex-1 text-red-600 border border-red-600 rounded py-2 text-sm font-semibold hover:bg-red-50">
                Eliminar
              </button>
            </div>
          </div>
        </div>

        <!-- Tabla -->
        <div class="hidden md:block bg-white rounded shadow overflow-x-auto">
          <table class="w-full min-w-[800px]">
            <thead class="bg-gray-50 border-b">
              <tr>
                <th class="text-left px-6 py-3 font-semibold">Nombre</th>
                <th class="text-left px-6 py-3 font-semibold">Email</th>
                <th class="text-left px-6 py-3 font-semibold">Teléfono</th>
                <th class="text-left px-6 py-3 font-semibold">Rol</th>
                <th class="text-left px-6 py-3 font-semibold">Miembro desde</th>
                <th class="text-left px-6 py-3 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <tr v-if="loading">
                <td colspan="5", class="py-10">
                  <Spinner />
                </td>
              </tr>
              <tr v-else v-for="user in paginadoAutos" :key="user.id" class="hover:bg-gray-50">
                <td class="px-6 py-3 font-medium">{{ user.nombre }}</td>
                <td class="px-6 py-3">{{ user.correo }}</td>
                <td class="px-6 py-3">{{ user.telefono }}</td>
                <td class="px-6 py-3">
                  <span :class="getRoleColor(user.rol?.nombre)" class="px-2 py-1 rounded text-xs font-semibold">
                    {{ user.rol?.nombre }}
                  </span>
                </td>
                <td class="px-6 py-3 text-sm text-gray-600">{{ user.fechaCreacion }}</td>
                <td class="px-6 py-3">
                  <button @click="editUser(user.id)" class="text-blue-600 hover:underline text-sm mr-3">Editar</button>
                  <button @click="deleteUser(user.id)" class="text-red-600 hover:underline text-sm">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-6">
            <p class="text-sm text-gray-600 text-center md:text-left">
                Página {{ paginaActual }} de {{ totalPaginas }}
            </p>

            <div class="flex flex-wrap justify-center gap-1">
              <button
                @click="goToPagina(paginaActual - 1)"
                :disabled="paginaActual === 1"
                class="px-3 py-1 border rounded disabled:opacity-50"
                >
                Antenrior
              </button>
              
              <button
              v-for="car in totalPaginas"
              :key="car"
              @click="goToPagina(car)"
              :class="[
                'px-3 py-1 border rounded',
                car === paginaActual
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700'
              ]"
              >
              {{ car }}
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
      </Layout>
</template>

<script setup>
    import { ref, computed, onMounted, watch } from 'vue'
    import Sidebar from '../components/Sidebar.vue';
    import TopBar from '../components/TopBar.vue';
    import Layout from '../components/Layout.vue';
    import { useNavigation } from '../composables/useNavigation';
    import { UserService } from '../services/user.service';
    import Spinner from '../components/Spinner.vue';


    const { goAdminUserForm } = useNavigation()

    const searchTerm = ref('')
    const roleFilter = ref('')

    const showEditModal = ref(false);
    const selectedUser = ref(null);

    const users = ref([])

    //paginacion
    const paginaActual = ref(1)
    const tamañoPagina = ref(4)

    const loading = ref(true)

    const paginadoAutos = computed(() => {
        const start = (paginaActual.value - 1) * tamañoPagina.value
        const end = start + tamañoPagina.value
        return filteredUsers.value.slice(start, end)
    })


    const totalPaginas = computed(() =>
        Math.ceil(filteredUsers.value.length / tamañoPagina.value)
    )

    const goToPagina = (page) => {
        if (page >= 1 && page <= totalPaginas.value) {
            paginaActual.value = page
        }
    }

    watch([searchTerm, roleFilter], () => {
        paginaActual.value = 1
    })

    const editUser = (id) => goAdminUserForm(id)

    onMounted(async () => {
      try {
        const usuarios = await UserService.getAll()

        await new Promise(r => setTimeout(r, 500))

        users.value = usuarios
      } finally {
        loading.value = false
      }
    })

    const filteredUsers = computed(() => {
        return users.value.filter(user => {
            const searchMatch = user.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                            user.correo.toLowerCase().includes(searchTerm.value.toLowerCase())
            const roleMatch = !roleFilter.value || user.rol.nombre.toLowerCase().includes(roleFilter.value.toLowerCase())
            return searchMatch && roleMatch
        })
    })

    const getRoleColor = (role) => {
            const colors = {
                'ADMIN': 'bg-red-100 text-red-800',
                'USER': 'bg-blue-100 text-blue-800',
                'PERSONAL': 'bg-yellow-100 text-yellow-800',
            }
        return colors[role] || 'bg-gray-100 text-gray-800'
    }

    const deleteUser = async (id) => {
      const confirmacion = confirm('¿Estás seguro de que deseas eliminar este usuario?');
      if (!confirmacion) return

      await UserService.delete(id);
      users.value = users.value.filter(u => u.id !== id)
    }
</script>
