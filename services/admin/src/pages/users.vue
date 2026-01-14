<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    
    <div class="flex-1 flex flex-col">
      <TopBar />
      
      <main class="flex-1 overflow-auto p-8">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
            <p class="text-gray-600">Administra los usuarios registrados</p>
          </div>
          <a @click="goAdminUserForm()" class="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700">
            + Nuevo Usuario
          </a>
        </div>

        <!-- Filtros -->
        <div class="bg-white p-4 rounded shadow mb-6 flex gap-4">
          <input v-model="searchTerm" type="text" placeholder="Buscar usuario..." class="border border-gray-300 rounded px-3 py-2 flex-1">
          <select v-model="roleFilter" class="border border-gray-300 rounded px-3 py-2">
            <option value="">Todos los roles</option>
            <option value="ADMIN">Administrador</option>
            <option value="USER">Personal</option>
          </select>
        </div>

        <!-- Tabla -->
        <div class="bg-white rounded shadow overflow-hidden">
          <table class="w-full">
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
              <tr v-for="user in paginadoAutos" :key="user.id" class="hover:bg-gray-50">
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
      </main>
    </div>
  </div>
</template>

<script setup>
    import { ref, computed, onMounted, watch } from 'vue'
    import Sidebar from '../components/Sidebar.vue';
    import TopBar from '../components/TopBar.vue';
    import { useNavigation } from '../composables/useNavigation';
    import { UserService } from '../services/user.service';


    const { goAdminUserForm } = useNavigation()

    const searchTerm = ref('')
    const roleFilter = ref('')

    const showEditModal = ref(false);
    const selectedUser = ref(null);

    const users = ref([])

    //paginacion
    const paginaActual = ref(1)
    const tamañoPagina = ref(4)

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
      users.value = await UserService.getAll();
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
