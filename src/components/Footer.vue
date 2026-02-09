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

  // Ajusta o início se estivermos perto do fim
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
  <div class="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
    <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
      Página {{ paginaAtual }} de {{ totalPaginas }}
    </div>

    <div class="flex items-center gap-1">
      <!-- Botão Anterior -->
      <button 
        @click="emit('mudarPagina', paginaAtual - 1)"
        :disabled="paginaAtual === 1"
        class="p-2 rounded-lg hover:bg-white hover:shadow-sm disabled:opacity-30 transition-all"
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
            'w-8 h-8 rounded-lg text-[11px] font-bold transition-all',
            paginaAtual === p 
              ? 'bg-orange-500 text-white shadow-md shadow-orange-200' 
              : 'text-gray-500 hover:bg-white hover:shadow-sm'
          ]"
        >
          {{ p }}
        </button>
      </div>

      <!-- Botão Próximo -->
      <button 
        @click="emit('mudarPagina', paginaAtual + 1)"
        :disabled="paginaAtual === totalPaginas"
        class="p-2 rounded-lg hover:bg-white hover:shadow-sm disabled:opacity-30 transition-all"
      >
        <ChevronRight class="w-4 h-4 text-gray-600" />
      </button>
    </div>
  </div>
</template>