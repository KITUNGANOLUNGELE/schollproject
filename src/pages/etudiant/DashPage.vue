<template>
  <div class="grid grid-cols-1 md:grid-cols-3 text-center gap-2">
    <div
      v-for="item in nb"
      :key="item.titre"
      :class="` ${item.bgColor} ${item.color} min-w-full min-h-full py-14 px-10 rounded-lg relative`"
    >
      <div class="absolute top-0 right-0">
        <button
          class="bg-blue-300 rounded-lg border px-2 py-1"
          @click="showDetails(item?.nombre)"
        >
          <i class="fas fa-eye text-white"></i>
        </button>
      </div>
      <p>
        <span :class="`fa fa-${item.icone} mr-3`"></span>
        {{ item.titre }}
      </p>

      <p class="text-lg md:text-xl font-semibold">{{ item.nombre?.length }}</p>
    </div>

    <q-dialog v-model="confirm" position="standard">
      <q-card>
        <q-card-section class="row items-center">
          <div v-for="item in details" :key="item.id">
            <div
              v-if="item?.points"
              class="flex justify-center items-center gap-3 p-2 rounded-lg bg-blue-50 border-gray-100 my-1"
            >
              <p>
                {{ item?.cours?.designation }}
              </p>
              <p
                :class="
                  item?.points >= item?.points / item?.max
                    ? 'font-bold text-green-600 text-base'
                    : 'font-bold text-red-600 text-base'
                "
              >
                {{ item?.points + "/" + item?.max }}
              </p>
            </div>
            <div
              v-else
              class="flex justify-center items-center gap-3 p-2 rounded-lg bg-green-50 border-2 border-gray-400 my-1"
            >
              {{ item?.designation }}
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useCoteStore } from "src/stores/cote";
import { useCoursStore } from "src/stores/cours";
import { useInscriptionStore } from "src/stores/inscription";
import { onMounted, computed, ref } from "vue";

const q = useQuasar();
const user = JSON.parse(localStorage.getItem("user"))?._doc;
const inscrStore = useInscriptionStore();
const coursStore = useCoursStore();
const coteStore = useCoteStore();
const confirm = ref(false);
const details = ref([]);
const promotion = computed(
  () => inscrStore.getProms.find((el) => el?.etudiant?._id == user?._id)?.promotion
);

const nb = computed(() => [
  {
    titre: "Cours",
    nombre: coursStore.getProms.filter(
      (el) => el?.promotion?._id == promotion.value?._id
    ),
    icone: "book-open",
    color: "text-orange-700",
    bgColor: "bg-orange-100",
  },
  {
    titre: "Cotes",
    nombre: coteStore.getProms.filter(
      (el) => el?.inscription?.etudiant?._id == user?._id
    ),
    icone: "book-open",
    color: "text-green-700",
    bgColor: "bg-green-100",
  },
]);
const showDetails = (tab) => {
  confirm.value = !confirm.value;
  details.value = tab;
};
onMounted(async () => {
  await Promise.all([inscrStore.fetch(q), coursStore.fetch(q), coteStore.fetch(q)]);
});
</script>
