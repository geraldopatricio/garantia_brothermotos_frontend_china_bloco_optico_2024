<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
import GarantiaList from './components/GarantiaList.vue'
import Footer from './components/Footer.vue'
import Dashboard from './components/Dashboard.vue'
import Login from './components/Login.vue'

const isAutenticado = ref(false)
// Alterado para começar no 'dashboard' para combinar com o fluxo natural
const viewAtual = ref('dashboard') 
const datagridRef = ref(null)
const itensPorPagina = ref(10)

// Sidebar começa fechada no mobile e aberta no desktop
const sidebarRecolhida = ref(window.innerWidth < 1024)

const toggleSidebar = () => {
  sidebarRecolhida.value = !sidebarRecolhida.value
}

onMounted(() => {
  const logado = localStorage.getItem('autenticado')
  if (logado === 'true') isAutenticado.value = true
  
  window.addEventListener('resize', () => {
    if (window.innerWidth < 1024) sidebarRecolhida.value = true
  })
})

const handleLoginSucesso = () => isAutenticado.value = true

const logout = () => {
  localStorage.removeItem('autenticado')
  isAutenticado.value = false
}

const mudarPagina = (p) => { 
  if (datagridRef.value) datagridRef.value.paginaAtual = p 
}
</script>

<template>
  <Login v-if="!isAutenticado" @login-sucesso="handleLoginSucesso" />

  <div v-else class="flex h-screen bg-[#f8f9fa] overflow-hidden">
    
    <!-- Overlay Mobile -->
    <div 
      v-if="!sidebarRecolhida" 
      class="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
      @click="toggleSidebar"
    ></div>

    <!-- 1. PASSAMOS A viewAtual PARA O SIDEBAR SABER QUEM DESTACAR -->
    <Sidebar 
      :recolhida="sidebarRecolhida"
      :viewAtiva="viewAtual"
      @changeView="v => { viewAtual = v; if(window.innerWidth < 1024) sidebarRecolhida = true }" 
      @logout="logout" 
    />

    <div class="flex-1 flex flex-col min-w-0 h-full">
      
      <Navbar @toggleSidebar="toggleSidebar" @logout="logout" />

      <main class="flex-1 overflow-y-auto p-4 md:p-8">
        
        <!-- CABEÇALHO DINÂMICO CONFORME A VIEW -->
        <div class="flex flex-row justify-between items-center mb-6 gap-2">
          
          <div class="flex flex-col">
             <h2 class="text-base md:text-xl font-black text-slate-800 uppercase tracking-tighter leading-tight">
               {{ viewAtual === 'dashboard' ? 'Dashboard de Performance' : 'Garantias' }}
             </h2>
             <p class="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-tight">
               {{ viewAtual === 'dashboard' ? 'Análise de dados geral' : 'Bloco Optical 2024' }}
             </p>
          </div>

          <!-- Select só aparece se estiver na lista de garantias -->
          <div v-if="viewAtual === 'garantias'" class="flex-shrink-0">
            <select 
              v-model.number="itensPorPagina" 
              class="text-[9px] md:text-[10px] font-black p-1.5 md:p-2 rounded border border-gray-200 bg-white shadow-sm outline-none focus:border-orange-500"
            >
              <option :value="10">Exibir 10</option>
              <option :value="50">Exibir 50</option>
              <option :value="100">Exibir 100</option>
              <option :value="100000">Todos</option>
            </select>
          </div>
          
        </div>

        <!-- Troca de Componentes -->
        <Dashboard v-if="viewAtual === 'dashboard'" />

        <div v-else-if="viewAtual === 'garantias'" class="space-y-4 pb-10">
          <GarantiaList ref="datagridRef" :itensPorPagina="itensPorPagina" />
          
          <Footer 
            v-if="datagridRef && datagridRef.filtrados"
            :paginaAtual="datagridRef.paginaAtual"
            :totalPaginas="datagridRef.totalPaginas"
            @mudarPagina="mudarPagina"
          />
        </div>
      </main>
    </div>
  </div>
</template>