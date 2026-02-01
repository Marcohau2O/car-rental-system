<template>
  <div class="min-h-screen flex bg-gray-100">

    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
      @click="isSidebarOpen = false"
    />

    <!-- Sidebar -->
    <aside
      class="fixed md:static inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transform transition-transform duration-300
             md:translate-x-0"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <Sidebar @close="isSidebarOpen = false" />
    </aside>

    <!-- Contenido -->
    <div class="flex-1 flex flex-col">
      <Topbar @toggle-sidebar="isSidebarOpen = true" />
      <main class="flex-1 p-5 md:p-7 bg-gray-100">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from './Sidebar.vue'
import Topbar from './Topbar.vue'

const isSidebarOpen = ref(false)
</script>