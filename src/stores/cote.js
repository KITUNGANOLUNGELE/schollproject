import { defineStore } from "pinia";
import { params } from "src/config/config";

export const useCoteStore = defineStore('cote', {

    state: () => ({
        route: '/cotes/cote',
        cotes: []
    }),
    getters: {
        getProms: (state) => state.cotes
    },
    actions: {
        async fetch(q) {
            const result = await params.getForAllStores(`${params.baseURL}${this.route}`, q, "obtention de données")
            console.log(result);
            this.cotes = result.data?.data || []
            return result
        },
        async add(q, data) {
            const result = await params.postJSON(`${params.baseURL}${this.route}`, data, q, "Enregistrement...", "ok");
            console.log(result)
            const r = await this.fetch(q);
            this.items = result.data?.data || []
            return r
        }
    }
})