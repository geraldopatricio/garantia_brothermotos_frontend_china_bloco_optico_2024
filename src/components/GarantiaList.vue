<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'
import { Search, Eye, X } from 'lucide-vue-next'

const props = defineProps(['itensPorPagina'])
const dados = ref([])
const busca = ref('')
const paginaAtual = ref(1)
const modalAberto = ref(false)
const midiaSelecionada = ref('')

const fetchDados = async () => {
  try {
    const url = import.meta.env.VITE_API_URL || 'http://localhost:3001'
    const response = await axios.get(`${url}/api/garantias`)
    dados.value = response.data
  } catch (error) { 
    console.error("Erro ao buscar dados:", error) 
  }
}

const abrirModal = (anexo) => {
  midiaSelecionada.value = `https://gpsoft.net.br/garantia/${anexo}`
  modalAberto.value = true
}

const fecharModal = () => {
  modalAberto.value = false
  midiaSelecionada.value = ''
}

const ehVideo = (url) => {
  const extensoesVideo = ['.mp4', '.webm', '.ogg', '.mov']
  return extensoesVideo.some(ext => url.toLowerCase().endsWith(ext))
}

const filtrados = computed(() => {
  return dados.value.filter(d => 
    Object.values(d).some(v => String(v).toLowerCase().includes(busca.value.toLowerCase()))
  )
})

const totalPaginas = computed(() => Math.ceil(filtrados.value.length / props.itensPorPagina))

watch([busca, () => props.itensPorPagina], () => {
  paginaAtual.value = 1
})

const dadosPaginados = computed(() => {
  const itens = Number(props.itensPorPagina)
  const inicio = (paginaAtual.value - 1) * itens
  const fim = inicio + itens
  return filtrados.value.slice(inicio, fim)
})

defineExpose({ paginaAtual, totalPaginas, filtrados })
onMounted(fetchDados)
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    
    <!-- Toolbar Responsiva -->
    <div class="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div class="relative w-full sm:max-w-xs md:max-w-md">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
        <input v-model="busca" type="text" placeholder="Buscar..." 
          class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-orange-500 transition-colors">
      </div>
      <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
        {{ filtrados.length }} registros
      </div>
    </div>

    <!-- Container da Tabela com Scroll Horizontal Suave -->
    <div class="overflow-x-auto w-full">
      <table class="w-full text-left border-collapse min-w-[320px]">
        <thead>
          <tr class="bg-gray-50 text-gray-400 uppercase text-[10px] md:text-[11px] font-bold tracking-wider border-b border-gray-100">
            <th class="px-3 md:px-6 py-3">Protocolo</th>
            <th class="hidden md:table-cell px-6 py-3">Data</th> <!-- Oculto no Mobile -->
            <th class="hidden md:table-cell px-6 py-3">Status</th> <!-- Oculto no Mobile -->
            <th class="hidden md:table-cell px-6 py-3">Cliente</th> <!-- Oculto no Mobile -->
            <th class="px-3 md:px-6 py-3">Fab</th>
            <th class="px-2 md:px-6 py-3 text-center">Qtd</th>
            <th class="px-3 md:px-6 py-3">Motivo</th>
            <th class="hidden md:table-cell px-6 py-3">Obs</th> <!-- Oculto no Mobile -->
            <th class="px-3 md:px-6 py-3 text-center">Ações</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="item in dadosPaginados" :key="item.protocolo" class="hover:bg-gray-50/50 transition text-gray-700">
            
            <!-- Protocolo -->
            <td class="px-3 md:px-6 py-3 font-medium text-gray-500 text-[11px] md:text-xs">
              {{ item.protocolo }}
            </td>

            <!-- Data (Somente Tablet/Desktop) -->
            <td class="hidden md:table-cell px-6 py-3 text-xs italic text-gray-400">
              {{ item.data_cadastro }}
            </td>

            <!-- Status (Somente Tablet/Desktop) -->
            <td class="hidden md:table-cell px-6 py-3">
              <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-green-100 text-green-600">
                {{ item.status_garantia }}
              </span>
            </td>

            <!-- Cliente (Somente Tablet/Desktop) -->
            <td class="hidden md:table-cell px-6 py-3 text-xs font-bold truncate max-w-[120px]">
              {{ item.codcli }}
            </td>

            <!-- Fabricante (Sempre visível) -->
            <td class="px-3 md:px-6 py-3 text-[10px] md:text-xs text-gray-600 font-semibold">
              {{ item.codfab }}
            </td>
            
            <!-- Qtd (Sempre visível) -->
            <td class="px-2 md:px-6 py-3 text-center text-[11px] md:text-xs font-bold">
              {{ item.qtd }}
            </td>

            <!-- Motivo (Sempre visível, mas bem truncado no mobile) -->
            <td class="px-3 md:px-6 py-3">
              <div class="text-[10px] md:text-xs truncate max-w-[80px] md:max-w-[150px]" :title="item.motivo">
                {{ item.motivo }}
              </div>
            </td>

            <!-- Obs (Somente Tablet/Desktop) -->
            <td class="hidden md:table-cell px-6 py-3">
              <div class="text-[10px] text-gray-400 italic truncate max-w-[120px]" :title="item.observacao">
                {{ item.observacao || '---' }}
              </div>
            </td>

            <!-- Ações -->
            <td class="px-3 md:px-6 py-3 text-center">
              <button v-if="item.anexo" 
                 @click="abrirModal(item.anexo)"
                 class="inline-flex items-center justify-center w-8 h-8 md:w-7 md:h-7 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition">
                <Eye class="w-4 h-4 md:w-3.5 md:h-3.5"/>
              </button>
              <span v-else class="text-gray-300 text-[9px] italic">---</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- MODAL DE VISUALIZAÇÃO (Ficou igual ao anterior, super responsivo) -->
  <Teleport to="body">
    <div v-if="modalAberto" 
         class="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-2 md:p-4"
         @click.self="fecharModal">
      
      <div class="relative bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-[600px] h-auto md:h-[400px] flex flex-col overflow-hidden animate-in zoom-in duration-200">
        
        <button @click="fecharModal" 
                class="absolute top-2 right-2 z-10 p-2 bg-white/90 hover:bg-red-500 hover:text-white text-gray-700 rounded-full transition shadow-lg">
          <X class="w-5 h-5" />
        </button>

        <div class="flex-1 flex items-center justify-center bg-gray-100 min-h-[300px]">
          <video v-if="ehVideo(midiaSelecionada)" controls autoplay class="w-full h-full object-contain">
            <source :src="midiaSelecionada" type="video/mp4">
          </video>
          <img v-else :src="midiaSelecionada" class="w-full h-full object-contain shadow-inner" alt="Anexo">
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* Remove a barra de rolagem lateral visualmente, mas mantém a funcionalidade */
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: #e2e8f0 transparent;
}

.animate-in {
  animation: modal-in 0.2s ease-out;
}

@keyframes modal-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>