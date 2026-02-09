<script setup>
import { LayoutDashboard, Filter, Wrench, Settings, HelpCircle, LogOut } from 'lucide-vue-next'

// Adicionado 'logout' aos emits
defineEmits(['changeView', 'logout'])
</script>

<template>
  <aside class="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 z-20">
    <div class="p-6">
      <img src="../assets/logo.png" alt="LubConsulta" class="h-10">
    </div>

    <nav class="flex-1 px-4 space-y-4 overflow-y-auto">
      <div>
        <p class="text-[10px] font-bold text-gray-400 uppercase px-3 py-2 tracking-widest">Menu</p>
        <button @click="$emit('changeView', 'dashboard')" class="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition">
          <LayoutDashboard class="w-4 h-4 mr-3"/> Dashboard
        </button>
        <button @click="$emit('changeView', 'garantias')" class="w-full flex items-center px-3 py-2 bg-orange-50 text-[#f37021] rounded-lg font-bold text-sm mt-1">
          <Filter class="w-4 h-4 mr-3"/> Garantias 2024
        </button>
      </div>

      <div>
        <p class="text-[10px] font-bold text-gray-400 uppercase px-3 py-2 tracking-widest">Ferramentas</p>
        <button class="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition">
          <Wrench class="w-4 h-4 mr-3"/> chat
        </button>
      </div>

      <div>
        <p class="text-[10px] font-bold text-gray-400 uppercase px-3 py-2 tracking-widest">Configurações</p>
        <button class="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition">
          <Settings class="w-4 h-4 mr-3"/> Ajustes
        </button>
      </div>
    </nav>

    <div class="p-4 border-t border-gray-100 space-y-1">
      <button class="w-full flex items-center px-3 py-2 text-sm text-gray-500 hover:text-orange-500 transition">
        <HelpCircle class="w-4 h-4 mr-3"/> Ajuda
      </button>
      
      <!-- BOTÃO SAIR ATUALIZADO -->
      <button 
        @click="$emit('logout')" 
        class="w-full flex items-center px-3 py-2 text-sm text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition font-bold"
      >
        <LogOut class="w-4 h-4 mr-3"/> Sair
      </button>
    </div>
  </aside>
</template>