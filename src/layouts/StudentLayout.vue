<template>
  <div class="min-h-screen flex flex-col bg-white">
    <app-navbar />

    <main class="flex-1 p-4 md:p-6 lg:p-8">
      <router-view />
    </main>

    <app-footer />
  </div>
</template>

<script setup>
defineOptions({ name: 'StudentLayout' })
import AppNavbar from 'components/AppNavbar.vue'
import AppFooter from 'components/AppFooter.vue'
</script>
