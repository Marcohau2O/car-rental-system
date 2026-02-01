<template>
  <header class="bg-white border-b border-gray-200 px-4 md:px-8 py-4 flex justify-between items-center w-full">
    <!-- Izquierda -->
    <div class="flex items-center gap-4">
      <!-- Botón menú móvil -->
      <button
        class="md:hidden text-2xl"
        @click="$emit('toggle-sidebar')"
      >
        ☰
      </button>

      <input
        type="text"
        placeholder="Buscar..."
        class="hidden md:block border border-gray-300 rounded px-3 py-2 w-64"
      />
    </div>

    <!-- Derecha -->
    <div class="flex items-center gap-4 md:gap-6">
      <button class="text-gray-600 hover:text-gray-900 relative hidden sm:block">
        <span class="text-2xl">🔔</span>
        <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          3
        </span>
      </button>

      <div class="flex items-center gap-3 pl-4 md:pl-6 border-l border-gray-200">
        <div class="text-right hidden sm:block">
          <p class="text-sm font-semibold text-gray-900">
            Hola {{ user?.nombre }}
          </p>
          <p class="text-xs text-gray-600">
            {{ user?.rol?.nombre }}
          </p>
        </div>

        <div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg">
          👤
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth.store'

const auth = useAuthStore()
const user = computed(() => auth.user)
</script>