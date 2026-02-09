<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'
import { Search, Eye, X } from 'lucide-vue-next' // Adicionado o ícone X

const props = defineProps(['itensPorPagina'])
const dados = ref([])
const busca = ref('')
const paginaAtual = ref(1)

// Estados para o Modal
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

// Função para abrir o modal
const abrirModal = (anexo) => {
  midiaSelecionada.value = `https://gpsoft.net.br/garantia/${anexo}`
  modalAberto.value = true
}

// Função para fechar o modal
const fecharModal = () => {
  modalAberto.value = false
  midiaSelecionada.value = ''
}

// Função para verificar se é vídeo
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
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-colors">
    <!-- Toolbar -->
    <div class="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="relative w-full max-sm:max-w-sm md:max-w-md">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
        <input v-model="busca" type="text" placeholder="Buscar por cliente, produto, protocolo, etc..." 
          class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-orange-500 transition-colors">
      </div>
      <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        {{ filtrados.length }} registros
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-50 text-gray-400 uppercase text-[11px] font-bold tracking-wider border-b border-gray-100">
            <th class="px-6 py-2">Protocolo</th>
            <th class="px-6 py-2">Data</th>
            <th class="px-6 py-2">Status</th>
            <th class="px-6 py-2">Cliente</th>
            <th class="px-6 py-2">Fabricante</th>
            <th class="px-6 py-2 text-center">Qtd</th>
            <th class="px-6 py-2">Motivo</th>
            <th class="px-6 py-2">Observação</th>
            <th class="px-6 py-2">Ações</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="item in dadosPaginados" :key="item.protocolo" class="hover:bg-gray-50 transition text-gray-700">
            <td class="px-6 py-2 font-medium text-gray-500 text-xs">{{ item.protocolo }}</td>
            <td class="px-6 py-2 text-xs">{{ item.data_cadastro }}</td>
            <td class="px-6 py-2">
              <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-green-100 text-green-600">
                {{ item.status_garantia }}
              </span>
            </td>
            <td class="px-6 py-2 text-xs font-bold">{{ item.codcli }}</td>
            <td class="px-6 py-2 text-[10px] text-gray-500">{{ item.codfab }}</td>
            <td class="px-6 py-2 text-center text-xs font-semibold">{{ item.qtd }}</td>
            <td class="px-6 py-2">
              <div class="text-xs truncate max-w-[150px]" :title="item.motivo">{{ item.motivo }}</div>
            </td>
            <td class="px-6 py-2">
              <div class="text-[10px] text-gray-400 italic truncate max-w-[150px]" :title="item.observacao">
                {{ item.observacao || '---' }}
              </div>
            </td>
            <td class="px-6 py-2">
              <!-- Botão Alterado para abrir o Modal em vez de link externo direto -->
              <button v-if="item.anexo" 
                 @click="abrirModal(item.anexo)"
                 class="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition cursor-pointer">
                <Eye class="w-3.5 h-3.5"/>
              </button>
              <span v-else class="text-gray-300 text-[9px] italic">Sem anexo</span>
            </td>
          </tr>
          <tr v-if="dadosPaginados.length === 0">
            <td colspan="9" class="px-6 py-10 text-center text-gray-400 italic text-sm">
              Nenhum dado encontrado...
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- MODAL DE VISUALIZAÇÃO -->
  <Teleport to="body">
    <div v-if="modalAberto" 
         class="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-all"
         @click.self="fecharModal">
      
      <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-[600px] md:h-[400px] flex flex-col overflow-hidden animate-in zoom-in duration-200">
        
        <!-- Botão Fechar (Posicionado para não ser cortado) -->
        <button @click="fecharModal" 
                class="absolute top-3 right-3 z-10 p-2 bg-white/90 hover:bg-red-500 hover:text-white text-gray-700 rounded-full transition shadow-lg">
          <X class="w-5 h-5" />
        </button>

        <!-- Container da Mídia -->
        <div class="flex-1 flex items-center justify-center bg-gray-100 overflow-hidden">
          
          <!-- Se for vídeo -->
          <video v-if="ehVideo(midiaSelecionada)" 
                 controls 
                 autoplay
                 class="w-full h-full object-contain">
            <source :src="midiaSelecionada" type="video/mp4">
            Seu navegador não suporta vídeos.
          </video>

          <!-- Se for imagem -->
          <img v-else 
               :src="midiaSelecionada" 
               class="w-full h-full object-contain" 
               alt="Visualização do anexo">
        </div>

        <!-- Footer do Modal (Opcional, para garantir espaço do player no mobile) -->
        <div class="bg-white p-2 text-center md:hidden">
          <button @click="fecharModal" class="text-xs font-bold uppercase text-gray-400">Fechar</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* Animação simples para o modal */
.animate-in {
  animation: modal-in 0.2s ease-out;
}

@keyframes modal-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>