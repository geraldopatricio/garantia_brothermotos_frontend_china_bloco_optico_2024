<script setup>
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps(['paginaAtual', 'totalPaginas'])
const emit = defineEmits(['mudarPagina'])

// Lógica para mostrar bloco de 5 páginas
const paginasVisiveis = computed(() => {
  const total = props.totalPaginas
  const atual = props.paginaAtual
  const maxBotoes = 5
  
  let inicio = Math.max(1, atual - 2)
  let fim = Math.min(total, inicio + maxBotoes - 1)

  if (fim - inicio < maxBotoes - 1) {
    inicio = Math.max(1, fim - maxBotoes + 1)
  }

  const paginas = []
  for (let i = inicio; i <= fim; i++) {
    paginas.push(i)
  }
  return paginas
})
</script>

<template>
  <!-- Alterado para bg-white e bordas mais suaves para combinar com os cards -->
  <div class="p-4 bg-white border border-gray-100 rounded-xl shadow-sm flex items-center justify-between mt-4">
    
    <!-- Info da Página -->
    <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest select-none">
      Página <span class="text-gray-700">{{ paginaAtual }}</span> de <span class="text-gray-700">{{ totalPaginas }}</span>
    </div>

    <div class="flex items-center gap-1">
      <!-- Botão Anterior -->
      <button 
        @click="emit('mudarPagina', paginaAtual - 1)"
        :disabled="paginaAtual === 1"
        class="p-2 rounded-lg transition-all cursor-pointer hover:bg-gray-50 disabled:opacity-20 disabled:cursor-not-allowed"
      >
        <ChevronLeft class="w-4 h-4 text-gray-600" />
      </button>

      <!-- Números das Páginas -->
      <div class="flex items-center gap-1">
        <button 
          v-for="p in paginasVisiveis" 
          :key="p"
          @click="emit('mudarPagina', p)"
          :class="[
            'w-8 h-8 rounded-lg text-[11px] font-bold transition-all cursor-pointer select-none',
            paginaAtual === p 
              ? 'bg-[#f37021] text-white shadow-md shadow-orange-200' 
              : 'text-gray-500 hover:bg-gray-50 border border-transparent hover:border-gray-100'
          ]"
        >
          {{ p }}
        </button>
      </div>

      <!-- Botão Próximo -->
      <button 
        @click="emit('mudarPagina', paginaAtual + 1)"
        :disabled="paginaAtual === totalPaginas"
        class="p-2 rounded-lg transition-all cursor-pointer hover:bg-gray-50 disabled:opacity-20 disabled:cursor-not-allowed"
      >
        <ChevronRight class="w-4 h-4 text-gray-600" />
      </button>
    </div>
  </div>
</template>