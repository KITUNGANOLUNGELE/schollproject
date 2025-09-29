<template>
  <div class="p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
      <div class="flex items-center gap-2 w-full md:w-1/2">
        <q-input
          dense
          debounce="300"
          v-model="filter"
          placeholder="Rechercher..."
          class="w-full"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <q-table
      :rows="filteredRows"
      :columns="columns"
      row-key="id"
      flat
      bordered
      class="bg-white shadow-sm rounded-lg overflow-hidden"
    >
      <template v-slot:body-cell-actions="props">
        <div class="flex items-center gap-2">
          <q-btn
            dense
            flat
            icon="edit"
            color="primary"
            @click="openEditDialog(props.row)"
          />
          <q-btn
            dense
            flat
            icon="delete"
            color="negative"
            @click="confirmDelete(props.row)"
          />
        </div>
      </template>
    </q-table>

    <!-- Add/Edit Dialog -->
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useEnseignementStore } from "src/stores/enseignement";
import { ref, computed, onMounted } from "vue";

const enseignStore = useEnseignementStore();
const user = JSON.parse(localStorage.getItem("user"))?._doc;
const rows = computed(() =>
  enseignStore.getProms
    .filter((el) => el?.enseignant?._id == user?._id)
    .map((el) => ({
      _id: el?._id,
      annee: el?.annee,
      nom: el?.enseignant?.nom,
      postnom: el?.enseignant?.postnom,
      cours: el?.cours?.designation,
    }))
);

const filter = ref("");
const q = useQuasar();
const columns = [
  { name: "_id", label: "ID", field: "_id", sortable: true, align: "center" },
  {
    name: "nom",
    label: "Nom",
    field: "nom",
    sortable: true,
    align: "center",
  },
  {
    name: "postnom",
    label: "Postom",
    field: "postnom",
    sortable: true,
    align: "center",
  },
  {
    name: "cours",
    label: "Cours",
    field: "cours",
    sortable: true,
    align: "center",
  },
  {
    name: "actions",
    label: "Actions",
    field: "actions",
    sortable: false,
    align: "center",
  },
];

const filteredRows = computed(() => {
  if (!filter.value) return rows.value;
  const q = filter.value.toLowerCase();
  return rows.value.filter((r) => (r?.nom + " " + r.postnom)?.toLowerCase()?.includes(q));
});

onMounted(async () => {
  await Promise.all([enseignStore.fetch(q)]);

  // initialize select options after fetch
});

defineOptions({ name: "AdminPromPage" });
</script>

<style scoped>
.q-table__bottom {
  display: none;
}
</style>
