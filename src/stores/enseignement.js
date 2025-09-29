import { defineStore } from 'pinia'
import { params } from 'src/config/config'

export const useEnseignementStore = defineStore('enseignement', {
    state: () => ({
        route: '/enseignement/enseignement',
        items: []
    }),
    getters: {
        getProms: (state) => state.items
    },
    actions: {
        async fetch(q) {
            const result = await params.getForAllStores(`${params.baseURL}${this.route}`, q, 'obtention de données')
            this.items = result.data?.data || []
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
