import { getAutosPublic, getAutoPublic } from '../api/autoP.api';

export const AutoServicePublic = {
    getAll: async () => {
        const { data } = await getAutosPublic();
        return data;
    },

    getById: async (id) => {
        const { data } = await getAutoPublic(id);
        return data;
    }
}