<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
import GarantiaList from './components/GarantiaList.vue'
import Footer from './components/Footer.vue'
import Dashboard from './components/Dashboard.vue'
import Login from './components/Login.vue'

// --- ESTADOS DE AUTENTICAÇÃO ---
const isAutenticado = ref(false)

// --- ESTADOS DA TABELA E NAVEGAÇÃO ---
const viewAtual = ref('garantias')
const datagridRef = ref(null)
const itensPorPagina = ref(10)

// Verifica se o usuário já estava logado ao carregar/atualizar a página
onMounted(() => {
  const logado = localStorage.getItem('autenticado')
  if (logado === 'true') {
    isAutenticado.value = true
  }
})

// Função chamada quando o Login.vue emite sucesso
const handleLoginSucesso = () => {
  isAutenticado.value = true
}

// Função de Logout (Limpa o acesso e volta para a tela de login)
const logout = () => {
  localStorage.removeItem('autenticado')
  isAutenticado.value = false
  // Resetamos para a view inicial para o próximo login
  viewAtual.value = 'garantias' 
}

// Função para controlar a paginação do componente filho (GarantiaList)
const mudarPagina = (p) => { 
  if (datagridRef.value) {
    datagridRef.value.paginaAtual = p 
  }
}
</script>

<template>
  <!-- TELA DE LOGIN: Aparece se não estiver autenticado -->
  <Login v-if="!isAutenticado" @login-sucesso="handleLoginSucesso" />

  <!-- SISTEMA PRINCIPAL: Só renderiza se estiver autenticado -->
  <div v-else class="flex min-h-screen bg-[#f8f9fa] transition-colors duration-300">
    
    <!-- SIDEBAR: Adicionado o ouvinte @logout para disparar a função logout -->
    <Sidebar 
      @changeView="v => viewAtual = v" 
      @logout="logout" 
    />

    <div class="flex-1 flex flex-col">
      <!-- NAVBAR: Também mantém o logout caso haja botão lá -->
      <Navbar @logout="logout" />

      <main class="p-8">
        <!-- CABEÇALHO DA PÁGINA -->
        <div class="flex justify-between items-center mb-6">
          <div class="flex flex-col">
             <h2 class="text-xl font-black text-slate-800 uppercase tracking-tighter">
               Gestão de Garantias
             </h2>
             <p class="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
               Fila de processos concluídos (Garantia System)
             </p>
          </div>
          
          <!-- SELETOR DE QUANTIDADE POR PÁGINA -->
          <div class="mb-4 flex justify-end">
            <select 
                v-model.number="itensPorPagina" 
                class="text-[10px] font-black p-2 rounded border border-gray-200 bg-white outline-none focus:border-orange-500"
              >
              <option :value="10">Exibir 10</option>
              <option :value="50">Exibir 50</option>
              <option :value="100">Exibir 100</option>
              <option :value="100000">Todos os registros</option>
            </select>
          </div>
        </div>

        <!-- CONTEÚDO DINÂMICO (DASHBOARD OU LISTA) -->
        <Dashboard v-if="viewAtual === 'dashboard'" />

        <div v-else>
          <!-- LISTAGEM DE DADOS -->
          <GarantiaList 
            ref="datagridRef" 
            :itensPorPagina="itensPorPagina" 
          />
          
          <!-- RODAPÉ COM PAGINAÇÃO NUMÉRICA -->
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

<style>
/* Estilos globais se necessário */
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
}
</style>