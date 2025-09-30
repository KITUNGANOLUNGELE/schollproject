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
        {{ dialog.form.inscription }}
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
            icon="book"
            color="primary"
            @click="openAddDialog(props.row)"
          />
          <q-btn dense flat icon="list" color="green" @click="openConfirm(props.row)" />
        </div>
      </template>
    </q-table>

    <!-- Add/Edit Dialog -->
    <q-dialog v-model="dialog.show">
      <q-card class="w-full md:w-2/3 lg:w-1/2">
        <q-card-section>
          <div class="text-lg font-semibold">Ajouter des côtes</div>
        </q-card-section>

        <q-card-section>
          <div class="grid grid-cols-1 gap-3">
            <q-input
              v-model="dialog.form.points"
              type="number"
              step="0.1"
              label="Points"
            />
            <q-input v-model="dialog.form.annee" label="Année" />
            <div class="flex justify-between">
              <q-select
                filled
                v-model="insc"
                use-input
                input-debounce="0"
                label="Etudiant"
                :options="options"
                @filter="filterFn"
                style="width: 250px"
                behavior="menu"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" @click="closeDialog" />
          <q-btn label="Sauvegarder" color="primary" @click="saveItem" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Visionner les cotes -->
    <q-dialog v-model="confirm">
      <q-card>
        <q-card-section>
          <div v-for="item in lesCotes" :key="item.id">
            <div
              class="bg-blue-200 p-3 rounded-lg flex justify-center gap-3 items-center"
            >
              <p>
                {{
                  item?.inscription?.etudiant?.nom +
                  " " +
                  item?.inscription?.etudiant?.postnom
                }}
              </p>
              <p
                :class="
                  item?.points > 10
                    ? 'text-green-500 font-bold text-base'
                    : 'text-red-500 font-bold text-base'
                "
              >
                {{ item?.points + "/" + item?.max }}
              </p>
              <button class="px-2 py-1 rounded-lg bg-red-100">
                <i class="fas fa-trash text-red-600"></i>
              </button>
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
import { useEnseignementStore } from "src/stores/enseignement";
import { useInscriptionStore } from "src/stores/inscription";
import { ref, computed, onMounted } from "vue";
const inscrStore = useInscriptionStore();
const enseignStore = useEnseignementStore();
const et = ref(null);
const coteStore = useCoteStore();
const insc = ref(null);
const rows = computed(() =>
  enseignStore.getProms.map((el) => ({
    _id: el?._id,
    annee: el?.annee,
    nom: el?.enseignant?.nom,
    postnom: el?.enseignant?.postnom,
    cours: el?.cours?.designation,
    coursId: el?.cours?._id,
    promotion: el?.cours?.promotion,
  }))
);

const options = ref([]);
const lesCotes = ref([]);

const filter = ref("");
const confirm = ref(false);
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
  return rows.value.filter(
    (r) =>
      r?.cours?.toLowerCase()?.includes(q) ||
      r?.annee?.toString()?.toLowerCase()?.includes(q)
  );
});

const dialog = ref({
  show: false,
  mode: "add",
  form: { points: "", max: "", inscription: null, cours: null, annee: "" },
});

function openAddDialog(row) {
  //lecture des inscriptions
  et.value = inscrStore.getProms
    .filter((el) => el?.promotion?._id == row?.promotion)
    ?.map((el) => ({
      id: el?._id,
      nom: el?.etudiant?.nom,
      postnom: el?.etudiant?.postnom,
    }));
  //initialisation des options
  options.value = et.value?.map((el) => ({
    value: el?.id,
    label: el?.nom + " " + el?.postnom,
  }));
  dialog.value = {
    show: true,
    mode: "add",
    form: {
      points: "",
      max: 20,
      inscription: null,
      cours: row.coursId,
      annee: row.annee,
    },
  };
}

function closeDialog() {
  dialog.value.show = false;
}

function saveItem() {
  const f = dialog.value.form;
  console.log("inscription", insc.value);
  const fc = {
    annee: f.annee,
    inscription: insc.value.value,
    cours: f.cours,
    points: f.points,
    max: f.max,
  };
  console.log(fc);
  if (dialog.value.mode === "add") {
    coteStore.add(q, fc).then();
  } else {
    const idx = rows.value.findIndex((r) => r.id === f.id);
    if (idx !== -1) rows.value[idx] = { ...f };
  }
  closeDialog();
}
const openConfirm = (row) => {
  confirm.value = !confirm.value;
  lesCotes.value = coteStore.getProms.filter((el) => el?.cours?._id == row.coursId);
  console.log(lesCotes);
};

// filtrer enseignant

function filterFn(val, update) {
  if (val === "") {
    update(() => {
      options.value = et.value.map((el) => ({
        value: el?.id,
        label: el?.nom + " " + el?.postnom,
      }));
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = et.value
      .filter((v) => (v?.nom + " " + v?.postnom)?.toLocaleLowerCase()?.includes(needle))
      .map((el) => ({
        value: el?.id,
        label: el?.nom + " " + el?.postnom,
      }));
  });
}

//filtrer cours
onMounted(async () => {
  await Promise.all([inscrStore.fetch(q), enseignStore.fetch(q), coteStore.fetch(q)]);
});

defineOptions({ name: "AdminPromPage" });
</script>

<style scoped>
.q-table__bottom {
  display: none;
}
</style>
