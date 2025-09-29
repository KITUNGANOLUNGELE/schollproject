<template>
  <div class="bg-white w-[97%] mt-12 px-4 py-4 mx-auto rounded-xl md:w-[50%]">
    <h2 class="mt-2 mb-8 text-xl font-semibold text-center">Connexion</h2>
    <q-form @submit.prevent="submit" class="mx-auto">
      <div class="space-y-4">
        <q-input dense v-model="form.email" label="Adresse Gmail" type="email">
          <template v-slot:prepend>
            <i class="fa fa-envelope text-gray-400"></i>
          </template>
        </q-input>

        <q-input
          dense
          class="w-full"
          v-model="form.mdp"
          type="password"
          label="Mot de passe"
        >
          <template v-slot:prepend>
            <i class="fa fa-lock text-gray-400"></i>
          </template>
          <template v-slot:append>
            <q-btn
              flat
              dense
              icon="visibility"
              @click="togglePassword"
              :class="showPassword ? 'text-indigo-600' : 'text-gray-400'"
            />
          </template>
        </q-input>

        <div class="flex items-center justify-between text-sm text-gray-500">
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              v-model="remember"
              class="form-checkbox h-4 w-4 text-indigo-600"
            />
            <span>Se souvenir de moi</span>
          </label>
          <a
            class="text-indigo-600 hover:underline cursor-pointer"
            @click.prevent="forgotPassword"
            >Mot de passe oublié ?</a
          >
        </div>

        <div class="pt-2">
          <q-btn
            type="submit"
            label="Se connecter"
            color="primary"
            class="w-full bg-indigo-600 hover:bg-indigo-700"
            no-caps
          />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useAuthStore } from "src/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const form = ref({ email: "", mdp: "" });
const q = useQuasar();
const router = useRouter();

const submit = async () => {
  await authStore.auth(form.value, q, router);
};
</script>

<style lang="scss" scoped></style>
