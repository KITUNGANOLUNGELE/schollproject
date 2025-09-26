import { defineStore } from "pinia";
import { params } from "src/config/config";

export const usePromStore = defineStore("prom", {
    state: () => ({
        route: "/inscription/promotion",
        prom: [],
    }),
    getters: {
        getProms: (state) => state.prom,
    },
    actions: {
        async fetch(q) {
            const result = await params.getForAllStores(
                `${params.baseURL}${this.route}`,
                q,
                "obtention de données"
            );
            console.log(result);
            this.prom = result.data.data;
            console.log("les prom", this.prom);
            return result;
        },
        async add(q, data) {
            const result = await params.postJSON(
                `${params.baseURL}${this.route}`,
                data,
                q,
                "Enregistrement...",
                "ok"
            );
            console.log(result);
            const r = await this.fetch(q);
            this.prom = result.data?.data || [];
            return r;
        },
    },
});
