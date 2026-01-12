import { getRoles } from "../api/role.api";

export const RoleService = {
    getAll: async () => {
        const { data } = await getRoles();
        return data;
    }
}