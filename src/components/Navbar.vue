<script setup>
import { Sun, Moon, User } from 'lucide-vue-next'
import { ref } from 'vue'

const isDark = ref(false)
const emit = defineEmits(['toggleDark'])

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
  emit('toggleDark', isDark.value)
}
</script>

<template>
  <!-- Removido o fundo escuro, agora é bg-white sempre, a menos que o dark mode seja ativado no HTML -->
  <header class="h-16 bg-white border-b border-gray-100 px-8 flex justify-between items-center sticky top-0 z-50">
    <div class="flex flex-col">
      <h1 class="text-[10px] font-black text-gray-800 uppercase tracking-tighter">Gerenciador - Garantias</h1>
      <p class="text-[9px] text-gray-400 uppercase font-medium">Gestão de Garantias - Bloco Óptico</p>
    </div>

    <div class="flex items-center gap-6">
      <div class="flex items-center gap-3 border-l pl-6 border-gray-100">
        <span class="text-xs font-bold text-gray-600">Brother Motos</span>
        <div class="w-8 h-8 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center text-gray-400">
          <User class="w-5 h-5" />
        </div>
      </div>
    </div>
  </header>
</template>