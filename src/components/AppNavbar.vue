<template>
  <div
    :class="`border border-gray-300 shadow-lg px-4 py-6 overflow-auto ${
      t
        ? 'block absolute text-center z-10 bg-blue-100/90 min-w-[97%] mx-auto min-h-[100%] md:relative md:px-12 md:min-h-[97%] md:w-[25%] md:mx-0 rounded-lg transition-all duration-150'
        : 'hidden'
    }`"
  >
    <div class="absolute top-1 right-1">
      <q-btn
        color="red"
        icon="close"
        dense
        flat
        @click="toggleMenu"
        v-if="$q.platform.is.mobile"
      />
    </div>
    <router-link
      @click="toggleMenu"
      v-for="l in props.list"
      :key="l.titre"
      :to="l.lien"
      class="py-1 px-1"
    >
      <div
        class="bg-pink-50 border border-spacing-1 border-gray-200 shadow-sm px-2 py-1 text-gray-700 rounded-sm hover:bg-purple-300 hover:text-white"
      >
        <p><i :class="`fas fa-${l.icone}`"></i></p>
        <p>{{ l.titre }}</p>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { ref, defineExpose } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const t = ref($q.platform.is.mobile ? false : true);

// Méthode exposée pour le parent
const toggleMenu = () => {
  if ($q.platform.is.mobile) {
    t.value = !t.value;
  }
};

defineExpose({ toggleMenu });
const props = defineProps(["list"]);

// Liste des items du menu
</script>
