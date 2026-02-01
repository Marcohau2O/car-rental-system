<template>
    <Layout>
        <div class="max-x-2xl">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ isEditing ? 'Editar Usuario' : 'Añadir Nuevo Usuario' }}</h1>
            <p class="text-gray-600 mb-8">Completa los detalles del Usuario</p>

            <form @submit.prevent="submit" class="bg-white p-8 rounded shadow space-y-6">
                <div class="grid md:grid-cols-2 gap-2">
                    <div>
                        <label class="block text-sm font-semibold mb-2">Nombre</label>
                        <input v-model="form.nombre" type="text" placeholder="ej: Marco Hau"
                            class="w-full border border-gray-300 rounded p-2" required />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-2">Correo Electronico</label>
                        <input v-model="form.correo" type="text" placeholder="ej: Admin@admin.com"
                           class="w-full border border-gray-300 rounded p-2" required />
                   </div>
                </div>

                <div class="grid md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">Telefono</label>
                        <input v-model="form.telefono" type="number" placeholder="ej: 9982058022"
                            class="w-full border border-gray-300 rounded p-2" />
                    </div>
                    <div v-if="!isEditing">
                        <label class="block text-sm font-medium mb-2">Contraseña</label>
                        <input v-if="!isEditing"v-model="form.password" :type="showPassword ? 'text' : 'password'"
                            placeholder="ej: ********" class="w-full border border-gray-300 rounded p-2" required />
                        <label class="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <input type="checkbox" v-model="showPassword" class="rounded border-gray-300">
                            Mostrar Contraseña
                        </label>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Tipo de Roles</label>
                        <select v-model="form.roleId" class="w-full border border-gray-300 rounded p-2" required>
                            <option value="">Selecciona un Rol</option>
                            <option v-for="rol in roles" :key="rol.id" :value="rol.id">
                                {{ rol.nombre }}
                            </option>
                        </select>

                        <div v-if="selectedRole" class="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <p class="text-sm font-semibold text-gray-700 mb-3">
                                Permisos asignados
                            </p>

                            <div class="flex flex-wrap gap-2">
                                <span v-for="p in selectedRole.permisos" :key="p.id" class="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                    {{ p.accion }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex gap-4 mt-6">
                    <button type="submit" class="flex-1 bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">
                        {{  isEditing ? 'Actualizar' : 'Crear' }}
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
    import { ref, onMounted, computed } from 'vue'
    import { useNavigation } from '../composables/useNavigation';
    import { useRoute } from 'vue-router';
    import { UserService } from '../services/user.service';
    import { RoleService } from '../services/role.service';
    import Layout from '../components/Layout.vue';

    const route = useRoute()
    const { goAdminUsers } = useNavigation()

    const isEditing = ref(!!route.params.id)

    const roles = ref([]);

    const form = ref({
        nombre: "",
        correo: "",
        telefono: "",
        password: "",
        roleId: null,
    });

    const showPassword = ref(false);

    const selectedRole = computed(() => {
        return roles.value.find(r => r.id === form.value.roleId)
    });

    const submit = async () => {
        const payload = {
            nombre: form.value.nombre,
            correo: form.value.correo,
            telefono: form.value.telefono,
            roleId: form.value.roleId,
        };

        if (isEditing.value) {
            await UserService.update(route.params.id, payload);
        } else {
            payload.password = form.value.password;
            await UserService.create(payload);
        }

        goAdminUsers();
    }

    onMounted(async () => {
        roles.value = await RoleService.getAll();

        if (isEditing.value) {
            const user = await UserService.getById(route.params.id);

            form.value = {
               nombre: user.nombre,
                correo: user.correo,
                telefono: user.telefono,
                password: "",
                roleId: user.roleId,
            };
        }
    });

    const goBack = () => goAdminUsers()
</script>