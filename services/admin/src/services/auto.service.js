import { getAutos, getAuto, createAuto, updateAuto, deleteAuto } from "../api/auto.api";

export const AutoService = {
  getAll: async () => {
    const { data } = await getAutos();
    return data;
  },

  getById: async (id) => {
    const { data } = await getAuto(id);
    return data;
  },

  create: async (auto) => {
    const { data } = await createAuto(auto);
    return data;
  },

  update: async (id, auto) => {
    const { data } = await updateAuto(id, auto);
    return data;
  },

  delete: async (id) => {
    await deleteAuto(id);
  }
};