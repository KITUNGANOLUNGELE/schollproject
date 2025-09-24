<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Mes Cours</h1>
    <Card>
      <p class="text-sm text-gray-700">Liste des cours auxquels vous êtes inscrit.</p>
    </Card>
  </div>
</template>

<script setup>
defineOptions({ name: 'StudentCourses' })
import Card from 'components/Card.vue'
</script>
