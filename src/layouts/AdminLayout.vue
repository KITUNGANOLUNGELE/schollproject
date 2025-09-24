<template>
  <div class="min-h-screen min-w-full">
    <div
      class="bg-pink-50 min-w-full text-center min-h-16 flex justify-center items-center sticky top-0 z-50 text-gray-800 text-2xl"
    >
      <i class="fas fa-graduation-cap mr-2"></i> School APP
    </div>
    <div class="min-h-screen grid grid-cols-1 md:grid-cols-[1fr_3fr]">
      <!-- Sidebar sur desktop -->
      <app-navbar :list="list" />
      <app-navbar ref="navRef" v-if="$q.platform.is.mobile" :list="list" />
      <!-- Main content -->
      <div class="h-full">
        <!-- Bouton menu mobile -->
        <div
          :class="`mb-3 flex justify-between items-center ${
            $q.platform.is.mobile ? 'bg-purple-50 px-1 py-2 sticky top-0 z-50' : ''
          }`"
        >
          <q-btn
            color="black"
            icon="menu"
            size="lg md:xl"
            dense
            flat
            @click="toggleMenu"
            v-if="$q.platform.is.mobile"
          />
          <div class="text-lg md:text-xl font-bold text-gray-400">Espace admin</div>
          <div class>
            <q-btn color="primary" dense flat icon="logout" />
          </div>
        </div>

        <main>
          <div class="flex justify-between items-center ml-3 px-2"></div>
          <div
            class="mt-4 py-1 pr-1 border w-[97%] mx-auto md:w-full md:border-none rounded-md"
          >
            <router-view></router-view>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AppNavbar from "components/AppNavbar.vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const navRef = ref(null);
const list = [
  { icone: "dashboard", titre: "Dashboard", lien: "/dashboard" },
  { icone: "landmark", titre: "Promotion", lien: "/promotion" },
  { icone: "user", titre: "Etudiant", lien: "/etudiant" },
  { icone: "user-graduate", titre: "Inscription", lien: "/inscription" },
  { icone: "user", titre: "Enseignant", lien: "/enseignant" },
  { icone: "book", titre: "Cours", lien: "/cours" },
  { icone: "book-open", titre: "Enseignement", lien: "/enseignement" },
];

const toggleMenu = () => {
  navRef.value.toggleMenu();
};
</script>
