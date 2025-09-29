<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6"
  >
    <div
      class="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
    >
      <!-- Hero / Illustration -->
      <div
        class="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-500 text-white p-10"
      >
        <div class="text-4xl font-extrabold mb-4">Bienvenue chez SchoolProject</div>
        <p class="mb-6 text-indigo-100/90 text-center max-w-xs">
          Accédez à votre espace élève, enseignant ou administration rapidement et en
          toute sécurité.
        </p>

        <div class="flex items-center gap-4 mt-4">
          <div
            class="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-2xl"
          >
            <i class="fa fa-book-open"></i>
          </div>
          <div
            class="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-2xl"
          >
            <i class="fa fa-user-graduate"></i>
          </div>
          <div
            class="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-2xl"
          >
            <i class="fa fa-landmark"></i>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="p-8 md:p-12">
        <div class="max-w-md mx-auto">
          <div class="mb-6 text-center">
            <h2 class="text-2xl font-bold text-gray-800">Se connecter</h2>
            <p class="text-sm text-gray-500 mt-2">
              Utilisez votre compte Gmail ou vos identifiants.
            </p>
          </div>

          <div class="flex flex-col gap-3">
            <q-btn
              unelevated
              color="white"
              class="border border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-3 shadow-sm"
              @click="signinWithGoogle"
            >
              <i class="fa fa-google text-red-500"></i>
              <span class="text-gray-700 font-medium">Se connecter avec Google</span>
            </q-btn>

            <div class="flex items-center justify-center gap-3 my-2">
              <span class="flex-1 h-px bg-gray-200"></span>
              <span class="text-xs text-gray-400">ou</span>
              <span class="flex-1 h-px bg-gray-200"></span>
            </div>

            <q-form @submit.prevent="submit">
              <div class="space-y-4">
                <q-input
                  dense
                  v-model="form.email"
                  label="Adresse Gmail"
                  type="email"
                  :rules="[
                    (val) => !!val || 'Email requis',
                    (val) => emailValid(val) || 'Email invalide',
                  ]"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <i class="fa fa-envelope text-gray-400"></i>
                  </template>
                </q-input>

                <q-input
                  dense
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  label="Mot de passe"
                  :rules="[
                    (val) => !!val || 'Mot de passe requis',
                    (val) => val.length >= 6 || 'Minimum 6 caractères',
                  ]"
                  lazy-rules
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
                  />
                </div>
              </div>
            </q-form>

            <div class="text-center mt-4 text-sm text-gray-400">
              Vous n'avez pas de compte ?
              <a class="text-indigo-600 hover:underline" @click.prevent="goRegister"
                >Créer un compte</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";

defineOptions({ name: "AuthPage" });

const q = useQuasar();

const form = ref({ email: "", password: "" });
const remember = ref(false);
const showPassword = ref(false);

function emailValid(val) {
  if (!val) return true;
  return /^\S+@\S+\.\S+$/.test(val);
}

function togglePassword() {
  showPassword.value = !showPassword.value;
}

function signinWithGoogle() {
  // placeholder: real OAuth flow should be implemented
  q.notify({ type: "info", message: "Redirection vers Google (simulé)..." });
}

function forgotPassword() {
  q.notify({
    type: "warning",
    message: "Procédure de récupération de mot de passe (non implémentée).",
  });
}

function goRegister() {
  q.notify({ type: "positive", message: "Redirection vers l'inscription (simulé)." });
}

function submit() {
  // Basic client-side validation
  if (!form.value.email || !emailValid(form.value.email)) {
    q.notify({
      type: "negative",
      message: "Veuillez renseigner une adresse email valide.",
    });
    return;
  }
  if (!form.value.password || form.value.password.length < 6) {
    q.notify({ type: "negative", message: "Mot de passe invalide (6 caractères min)." });
    return;
  }

  // Simulate auth
  q.notify({ type: "positive", message: "Connexion réussie (simulation)." });
  // Here you would call your auth API and handle tokens/redirects
}
</script>

<style scoped>
.fa {
  font-size: 1rem;
}
</style>
