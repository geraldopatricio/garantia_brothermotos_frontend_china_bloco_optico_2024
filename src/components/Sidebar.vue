<script setup>
import { LayoutDashboard, Filter, Wrench, Settings, HelpCircle, LogOut } from 'lucide-vue-next'

defineProps(['recolhida'])
defineEmits(['changeView', 'logout'])

const baseBtn = "w-full flex items-center transition-all duration-200 rounded-lg py-2 mt-1"
const btnNormal = "text-gray-600 hover:bg-gray-100"
const btnActive = "bg-orange-50 text-[#f37021] font-bold shadow-sm"
</script>

<template>
  <aside 
    :class="[
      recolhida ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'translate-x-0 w-64',
      'fixed lg:relative inset-y-0 left-0 z-50 bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300 ease-in-out'
    ]"
  >
    <!-- Logo Dinâmica -->
    <div class="p-6 flex justify-center h-24 items-center">
      <!-- Em telas grandes, alterna entre logo e ícone. No mobile aberto, mostra sempre logo full -->
      <img v-if="!recolhida" src="../assets/logo.png" alt="Logo" class="h-10">
      <img v-else src="../assets/ico.png" alt="Ícone" class="h-8 hidden lg:block">
    </div>

    <!-- Navegação -->
    <nav class="flex-1 px-3 space-y-1 overflow-y-auto">
      <div>
        <p v-if="!recolhida" class="text-[10px] font-bold text-gray-400 uppercase px-3 py-2 tracking-widest text-center lg:text-left">Menu</p>
        
        <button @click="$emit('changeView', 'dashboard')" 
          :class="[baseBtn, btnNormal, recolhida ? 'lg:justify-center px-3 lg:px-0' : 'px-3 justify-start']">
          <LayoutDashboard class="w-5 h-5 shrink-0" :class="!recolhida ? 'mr-3' : 'lg:mr-0 mr-3'"/> 
          <span :class="recolhida ? 'lg:hidden block' : 'block'" class="text-sm">Dashboard</span>
        </button>

        <button @click="$emit('changeView', 'garantias')" 
          :class="[baseBtn, btnActive, recolhida ? 'lg:justify-center px-3 lg:px-0' : 'px-3 justify-start']">
          <Filter class="w-5 h-5 shrink-0" :class="!recolhida ? 'mr-3' : 'lg:mr-0 mr-3'"/> 
          <span :class="recolhida ? 'lg:hidden block' : 'block'" class="text-sm">Garantias 2024</span>
        </button>
      </div>

      <div class="pt-4">
        <p v-if="!recolhida" class="text-[10px] font-bold text-gray-400 uppercase px-3 py-2 tracking-widest text-center lg:text-left">Ferramentas</p>
        <button :class="[baseBtn, btnNormal, recolhida ? 'lg:justify-center px-3 lg:px-0' : 'px-3 justify-start']">
          <Wrench class="w-5 h-5 shrink-0" :class="!recolhida ? 'mr-3' : 'lg:mr-0 mr-3'"/> 
          <span :class="recolhida ? 'lg:hidden block' : 'block'" class="text-sm">Chat</span>
        </button>
      </div>

      <div class="pt-4">
        <p v-if="!recolhida" class="text-[10px] font-bold text-gray-400 uppercase px-3 py-2 tracking-widest text-center lg:text-left">Configurações</p>
        <button :class="[baseBtn, btnNormal, recolhida ? 'lg:justify-center px-3 lg:px-0' : 'px-3 justify-start']">
          <Settings class="w-5 h-5 shrink-0" :class="!recolhida ? 'mr-3' : 'lg:mr-0 mr-3'"/> 
          <span :class="recolhida ? 'lg:hidden block' : 'block'" class="text-sm">Ajustes</span>
        </button>
      </div>
    </nav>

    <!-- Rodapé -->
    <div class="p-4 border-t border-gray-100 space-y-1">
      <button :class="[baseBtn, 'text-gray-500 hover:text-orange-500', recolhida ? 'lg:justify-center px-3 lg:px-0' : 'px-3 justify-start']">
        <HelpCircle class="w-5 h-5 shrink-0" :class="!recolhida ? 'mr-3' : 'lg:mr-0 mr-3'"/> 
        <span :class="recolhida ? 'lg:hidden block' : 'block'" class="text-sm font-medium">Ajuda</span>
      </button>
      
      <button @click="$emit('logout')" 
        :class="[baseBtn, 'text-red-500 bg-red-50 hover:bg-red-100 font-bold', recolhida ? 'lg:justify-center px-3 lg:px-0' : 'px-3 justify-start']">
        <LogOut class="w-5 h-5 shrink-0" :class="!recolhida ? 'mr-3' : 'lg:mr-0 mr-3'"/> 
        <span :class="recolhida ? 'lg:hidden block' : 'block'" class="text-sm">Sair</span>
      </button>
    </div>
  </aside>
</template>