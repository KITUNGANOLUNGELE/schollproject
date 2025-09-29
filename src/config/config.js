import axios from "axios";
export const params = {
    //affichage des dialogs
    dialog: (props, $q, title, msg, onOk, onCancel, onDismiss, notifyMessage) => {
        $q.dialog({

            title: title,
            message: `<div class="row items-center">
                  <span>${msg}.</span>
                </div>`,
            html: true,
            ok: {
                text: "Confirmer",
                color: "primary",
            },
            cancel: {
                text: "Abandonner",
                color: "negative",
            },
        })
            .onOk(() => {
                onOk();
                $q.notify({
                    message: notifyMessage ?? "",
                    color: "positive",
                });
            })
            .onCancel(() => {
                onCancel();
            })
            .onDismiss(() => {
                onDismiss();
            });
    },

    stringCapitalize: (str = "") => {
        const strToTable = str.split(' ');
        return strToTable.map(el => el.charAt(0).toUpperCase() + el.slice(1).toLocaleLowerCase()).join(' ');
    },

    //
    id_ad: 1, //a changer par local storage une fois l'authentification termine
    baseURL: "http://127.0.0.1:62616",
    headerJSON: () => {
        const token = sessionStorage.getItem('token')
        return {
            "Content-Type": "application/json",
            "authorization": token ? `Breer ${token}` : null
        }
    },
    headerPOST: () => {
        const token = sessionStorage.getItem('token')

        return {
            "Content-Type": "multipart/form-data",
            "authorization": token ? `Breer ${token}` : null
        }
    },
    validateStatus: (status) => status < 500,

    getForAllStores: async (url, q, msg) => {
        const text = msg ?? "chargement...";
        q.loading.show({
            html: true,
            message: `<b class="text-yellow">${text}</b>`,
        });
        try {
            const res = await axios.get(url, {
                headers: params.headerJSON(),
                validateStatus: params.validateStatus,
                withCredentials: true
            });
            if (res.status === 200) {
                console.log(res)
                return res;
            }
        } catch (error) {
            console.log(error);
            return error;
        } finally {
            q?.loading.hide();
        }
    },

    // méthode post pour tous les stores
    postFormData: async (url, form, q) => {
        q?.loading.show({
            html: true,
            message:
                'Enregistrement <b>produit</b> en cours...<br><span class="text-amber text-italic">Veuillez patienter...</span>',
        });

        try {
            const res = await axios.post(url, form, {
                params: params.params,
                headers: params.headerPOST(),
                validateStatus: params.validateStatus,
                withCredentials: true,
            });

            // Afficher la notification en fonction de la réponse
            q?.notify({ message: res.data.message, color: "positive" });
            return res;
        } catch (error) {
            // Afficher une notification d'erreur en cas de problème
            q?.notify({
                message: "Erreur lors de l'enregistrement du produit",
                color: "negative",
            });
            return error;
        } finally {
            // Cacher le QLoading après la requête
            q?.loading.hide();
        }
    },
    //post du json
    postJSON: async (url, data, q, msg, noticationStr, token) => {

        q?.loading?.show({
            html: true,
            message: ` <b>${msg}</b><br><span class="text-amber text-italic">Veuillez patienter...</span>`,
        });

        try {
            const res = await axios.post(url, data, {
                params: params.params,
                headers: token ? { authorization: token } : params.headerJSON(),
                validateStatus: params.validateStatus,
                withCredentials: true
            });

            // Afficher la notification en fonction de la réponse
            if (res.status == 200 || res.status == 201) {
                q?.notify?.({
                    message: noticationStr?.length ? noticationStr : "Welcome",
                    color: "positive",
                });
            }
            else {
                q?.notify?.({
                    message: res?.data?.message || "something wrong appened",
                    color: "warning",
                });
            }

            console.log(res);
            return res;
        } catch (error) {
            console.log(q?.notify)
            // Afficher une notification d'erreur en cas de problème
            q?.notify?.({
                message: "Erreur ",
                color: "negative",
            });
            return error;
        } finally {
            // Cacher le QLoading après la requête
            q?.loading?.hide();
        }
    },
    //patch json
    patchJSON: async (url, data, q, msg) => {
        q?.loading.show({
            html: true,
            message: ` <b>${msg}</b><br><span class="text-amber text-italic">Veuillez patienter...</span>`,
        });

        try {
            const res = await axios.patch(url, data, {
                params: params.params,
                headers: params.headerJSON(),
                validateStatus: params.validateStatus,
                withCredentials: true
            });

            // Afficher la notification en fonction de la réponse
            if (res.status == 200) {
                q?.notify({ message: res.data.message, color: "positive" });

            }
            return res;
        } catch (error) {
            // Afficher une notification d'erreur en cas de problème
            q?.notify({
                message: "Erreur lors de la Modification",
                color: "negative",
            });
            return error;
        } finally {
            // Cacher le QLoading après la requête
            q?.loading.hide();
        }
    },
    //delete json
    DeleteJSON: async (url, data, q, msg) => {
        q?.loading.show({
            html: true,
            message: ` <b>${msg}</b><br><span class="text-amber text-italic">Veuillez patienter...</span>`,
        });

        try {
            const res = await axios.delete(url, {
                data: data,
                params: params.params,
                headers: params.headerJSON(),
                validateStatus: params.validateStatus,
                withCredentials: true,
            });

            // Afficher la notification en fonction de la réponse
            q?.notify({ message: res.data.message, color: "positive" });
            return res;
        } catch (error) {
            // Afficher une notification d'erreur en cas de problème
            q?.notify({
                message: "Erreur lors de la suppression",
            });
            return error;
        } finally {
            // Cacher le QLoading après la requête
            q?.loading.hide();
        }
    },

};
