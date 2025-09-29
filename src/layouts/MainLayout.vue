<template>
  <div class="min-h-screen min-w-full flex flex-col bg-blue-300">
    <header class="w-full">
      <div
        class="bg-pink-50 min-w-full text-center min-h-16 flex justify-center items-center sticky top-0 z-50 text-gray-800 text-2xl"
      >
        <i class="fas fa-graduation-cap mr-2"></i> School APP
      </div>
    </header>

    <main class="">
      <router-view />
    </main>

    <footer class="w-full">
      <!-- footer content (optional) -->
    </footer>
  </div>
</template>
