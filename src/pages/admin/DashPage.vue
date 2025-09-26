<template>
  <div class="grid grid-cols-1 md:grid-cols-3 text-center gap-2">
    <div
      v-for="item in nb"
      :key="item.titre"
      :class="` ${item.bgColor} ${item.color} min-w-full min-h-full py-14 px-10 rounded-lg`"
    >
      <p>
        <span :class="`fa fa-${item.icone} mr-3`"></span>
        {{ item.titre }}
      </p>

      <p class="text-lg md:text-xl font-semibold">{{ item.nombre }}</p>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useCoursStore } from "src/stores/cours";
import { useEnseignantStore } from "src/stores/enseignant";
import { useEnseignementStore } from "src/stores/enseignement";
import { useStudStore } from "src/stores/etudiant";
import { useInscriptionStore } from "src/stores/inscription";
import { usePromStore } from "src/stores/promotion";
import { onMounted, computed } from "vue";
const promStore = usePromStore();
const studentStore = useStudStore();
const inscrStore = useInscriptionStore();
const coursStore = useCoursStore();
const ensStore = useEnseignantStore();
const enseignStore = useEnseignementStore();
const q = useQuasar();
const nb = computed(() => [
  {
    titre: "Promotion",
    nombre: promStore.getProms.length,
    icone: "landmark",
    color: "text-pink-700",
    bgColor: "bg-pink-100",
  },
  {
    titre: "Etudiant",
    nombre: studentStore.getProms.length,
    icone: "user",
    color: "text-green-700",
    bgColor: "bg-green-100",
  },
  {
    titre: "Inscription",
    nombre: inscrStore.getProms.length,
    icone: "user-graduate",
    color: "text-blue-700",
    bgColor: "bg-blue-100",
  },
  {
    titre: "Enseignant",
    nombre: ensStore.getProms.length,
    icone: "user",
    color: "text-purple-700",
    bgColor: "bg-purple-100",
  },
  {
    titre: "Cours",
    nombre: coursStore.getProms.length,
    icone: "book",
    color: "text-green-700",
    bgColor: "bg-green-100",
  },
  {
    titre: "Enseignement",
    nombre: enseignStore.getProms.length,
    icone: "book-open",
    color: "text-orange-700",
    bgColor: "bg-orange-100",
  },
]);
onMounted(async () => {
  await Promise.all([
    promStore.fetch(q),
    studentStore.fetch(q),
    inscrStore.fetch(q),
    coursStore.fetch(q),
    ensStore.fetch(q),
    enseignStore.fetch(q),
  ]);
});
</script>
