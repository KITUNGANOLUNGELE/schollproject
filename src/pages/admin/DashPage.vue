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
const nb = [
  {
    titre: "Promotion",
    nombre: 12,
    icone: "landmark",
    color: "text-pink-700",
    bgColor: "bg-pink-100",
  },
  {
    titre: "Etudiant",
    nombre: 12,
    icone: "user",
    color: "text-green-700",
    bgColor: "bg-green-100",
  },
  {
    titre: "Inscription",
    nombre: 12,
    icone: "user-graduate",
    color: "text-blue-700",
    bgColor: "bg-blue-100",
  },
  {
    titre: "Enseignant",
    nombre: 12,
    icone: "user",
    color: "text-purple-700",
    bgColor: "bg-purple-100",
  },
  {
    titre: "Cours",
    nombre: 12,
    icone: "book",
    color: "text-green-700",
    bgColor: "bg-green-100",
  },
  {
    titre: "Enseignement",
    nombre: 12,
    icone: "book-open",
    color: "text-orange-700",
    bgColor: "bg-orange-100",
  },
];
</script>
