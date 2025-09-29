import { defineStore } from "pinia";
import { params } from "src/config/config";
import { Notify } from "quasar";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        route: "/auth/auth",
        user: null,
    }),
    getters: {
        getUser: (state) => state.user
    },
    actions: {
        async auth(data, q, router) {
            const resp = await params.postJSON(`${params.baseURL}${this.route}`, data, q, "authentification", "ok")
            this.user = resp.data?.data || {}
            console.log(resp)
            if (this.user.role === 'admin') {
                localStorage.setItem("user", JSON.stringify(this.user));
                router.replace('/admin')
            } else if (this.user.role == 'enseignant') {
                localStorage.setItem("user", JSON.stringify(this.user));
                router.replace('/ens')

            } else if (this.user.role == 'etudiant') {
                localStorage.setItem("user", JSON.stringify(this.user));
                router.replace('/admin')
            }
            else {
                Notify.create({
                    message: "Not allowed",
                    color: "negative"
                })
            }
            //redirection
            return resp
        },
        async verify(data, q) {
            const resp = await params.postJSON(`${params.baseURL}${this.route}`, data, q, "authentification", "ok")
            this.user = resp.data?.data || {}
            console.log(resp)
            return resp
        }
    }
})