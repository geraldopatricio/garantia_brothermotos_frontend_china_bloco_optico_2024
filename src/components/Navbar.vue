<script setup>
import { User, Menu } from 'lucide-vue-next'
defineEmits(['toggleSidebar', 'logout'])
</script>

<template>
  <header class="h-16 bg-white border-b border-gray-100 px-4 md:px-8 flex justify-between items-center sticky top-0 z-30 transition-all">
    <div class="flex items-center gap-4">
      <!-- Botão Hamburger: Aparece APENAS em Mobile/Tablet (lg:hidden oculta em desktop) -->
      <button 
        @click="$emit('toggleSidebar')"
        class="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-all lg:hidden active:scale-90"
      >
        <Menu class="w-6 h-6" />
      </button>

      <div class="flex flex-col">
        <h1 class="text-[10px] md:text-[11px] font-black text-gray-800 uppercase tracking-tighter">Gerenciador - Garantias</h1>
        <p class="text-[9px] text-gray-400 uppercase font-medium">Gestão de Garantias - Bloco Óptico</p>
      </div>
    </div>

    <!-- Info Usuário -->
    <div class="flex items-center gap-6">
      <div class="flex items-center gap-3 border-l pl-4 md:pl-6 border-gray-100">
        <div class="flex flex-col items-end hidden sm:flex">
          <span class="text-[10px] md:text-xs font-bold text-gray-600">Brother Motos</span>
          <span class="text-[8px] text-green-500 font-bold uppercase">Online</span>
        </div>
        <div class="w-8 h-8 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 shadow-inner">
          <User class="w-5 h-5" />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Transição suave para a navbar */
header {
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.95);
}
</style>