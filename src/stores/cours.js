import { defineStore } from 'pinia'
import { params } from 'src/config/config'

export const useCoursStore = defineStore('cours', {
    state: () => ({
        route: '/enseignement/cours',
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
        }
    }
})
