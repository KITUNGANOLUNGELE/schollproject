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

      <div class="flex items-center gap-2">
        <q-btn
          color="primary"
          label="Ajouter"
          icon="add"
          dense
          flat
          @click="openAddDialog"
        />
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
    <q-dialog v-model="dialog.show">
      <q-card class="w-full md:w-2/3 lg:w-1/2">
        <q-card-section>
          <div class="text-lg font-semibold">
            {{ dialog.mode === "add" ? "Ajouter un item" : "Modifier l'item" }}
          </div>
        </q-card-section>

        <q-card-section>
          <div class="grid grid-cols-1 gap-3">
            <q-input v-model="dialog.form.designation" label="Designation" />
            <q-input v-model="dialog.form.annee" label="Année" />
            <div class="flex justify-between">
              <q-select
                filled
                v-model="dialog.form.enseignant"
                use-input
                input-debounce="0"
                label="Enseignant"
                :options="options"
                @filter="filterFn"
                style="width: 250px"
                behavior="menu"
              />
              <q-select
                filled
                v-model="dialog.form.cours"
                use-input
                input-debounce="0"
                label="Cours"
                :options="PromOptions"
                @filter="filterp"
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

    <!-- Confirm Delete -->
    <q-dialog v-model="confirm.show">
      <q-card>
        <q-card-section>
          <div class="text-lg font-semibold">Confirmer la suppression</div>
        </q-card-section>
        <q-card-section>
          Voulez-vous vraiment supprimer "{{ confirm.row?.title }}" ?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Annuler" @click="confirm.show = false" />
          <q-btn color="negative" label="Supprimer" @click="deleteItem" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useCoursStore } from "src/stores/cours";
import { useEnseignantStore } from "src/stores/enseignant";
import { useEnseignementStore } from "src/stores/enseignement";
import { ref, computed, onMounted } from "vue";
const ensStore = useEnseignantStore();
const coursStore = useCoursStore();
const enseignStore = useEnseignementStore();
const et = computed(() => ensStore.getProms);
const prom = computed(() => coursStore.getProms);
const rows = computed(() =>
  enseignStore.getProms.map((el) => ({
    _id: el?._id,
    annee: el?.annee,
    nom: el?.enseignant?.nom,
    postnom: el?.enseignant?.postnom,
    cours: el?.cours?.designation,
  }))
);

const options = ref([]);
const PromOptions = ref([]);

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

const dialog = ref({
  show: false,
  mode: "add",
  form: { id: null, designation: "", cours: null, enseignant: null, annee: "" },
});
const confirm = ref({ show: false, row: null });

function openAddDialog() {
  dialog.value = {
    show: true,
    mode: "add",
    form: { id: null, designation: "", cours: null, enseignant: null, annee: "" },
  };
}

function openEditDialog(row) {
  dialog.value = { show: true, mode: "edit", form: { ...row } };
}

function closeDialog() {
  dialog.value.show = false;
}

function saveItem() {
  const f = dialog.value.form;
  const fc = { annee: f.annee, enseignant: f.enseignant.value, cours: f.cours.value };
  if (dialog.value.mode === "add") {
    enseignStore.add(q, fc).then();
  } else {
    const idx = rows.value.findIndex((r) => r.id === f.id);
    if (idx !== -1) rows.value[idx] = { ...f };
  }
  closeDialog();
}

function confirmDelete(row) {
  confirm.value = { show: true, row };
}

function deleteItem() {
  const id = confirm.value.row.id;
  rows.value = rows.value.filter((r) => r.id !== id);
  confirm.value = { show: false, row: null };
}

// filtrer enseignant

function filterFn(val, update) {
  if (val === "") {
    update(() => {
      options.value = et.value.map((el) => ({
        value: el?._id,
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
        value: el?._id,
        label: el?.nom + " " + el?.postnom,
      }));
  });
}

//filtrer cours

function filterp(val, update) {
  if (val === "") {
    update(() => {
      PromOptions.value = prom.value.map((el) => ({
        value: el?._id,
        label: el?.designation,
      }));
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    PromOptions.value = prom.value
      .filter((v) => v?.designation?.toLocaleLowerCase()?.includes(needle))
      .map((el) => ({
        value: el?._id,
        label: el?.designation,
      }));
  });
}

onMounted(async () => {
  await Promise.all([ensStore.fetch(q), coursStore.fetch(q), enseignStore.fetch(q)]);

  // initialize select options after fetch
  options.value = et.value.map((el) => ({
    value: el?._id,
    label: el?.nom + " " + el?.postnom,
  }));
  PromOptions.value = prom.value.map((el) => ({
    value: el?._id,
    label: el?.designation,
  }));
});

defineOptions({ name: "AdminPromPage" });
</script>

<style scoped>
.q-table__bottom {
  display: none;
}
</style>
