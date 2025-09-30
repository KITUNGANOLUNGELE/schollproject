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
import { useEnseignementStore } from "src/stores/enseignement";
import { onMounted, computed } from "vue";

const enseignStore = useEnseignementStore();
const q = useQuasar();
const user = JSON.parse(localStorage.getItem("user"))?._doc;
const nb = computed(() => [
  {
    titre: "Enseignement",
    nombre: enseignStore.getProms.filter((el) => el.enseignant._id == user?._id).length,
    icone: "book-open",
    color: "text-orange-700",
    bgColor: "bg-orange-100",
  },
]);
onMounted(async () => {
  await Promise.all([enseignStore.fetch(q)]);
});
</script>
