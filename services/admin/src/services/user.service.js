import { getUsuario, getUsuarios, createUsuario, updateUsuario,deleteUsuario, assignRole } from "../api/user.api.js";

export const UserService = {
    getAll: async () => {
        const { data } = await getUsuarios();
        return data;
    },

    getById: async (id) => {
        const { data } = await getUsuario(id);
        return data;
      },

      create: async (payload) => {
        const { data } = await createUsuario(payload);
        return data;
    },

    update: async (id, payload) => {
        const { data } = await updateUsuario(id, payload);
        return data;
    },

    delete: async (id) => {
        await deleteUsuario(id);
    },

    assignRole: async (id, roleId) => {
        const { data } = await assignRole(id, roleId);
        return data;
    }
}