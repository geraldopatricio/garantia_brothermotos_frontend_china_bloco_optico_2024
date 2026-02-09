<script setup>
import { 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from 'lucide-vue-next'
</script>

<template>
  <div class="space-y-6">
    <!-- Linha de Cards de Resumo -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs text-gray-400 font-bold uppercase">Total Garantias</p>
            <h3 class="text-2xl font-bold text-gray-700 dark:text-white">1.284</h3>
          </div>
          <div class="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-lg">
            <BarChart3 class="w-6 h-6" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs text-gray-400 font-bold uppercase">Concluídas</p>
            <h3 class="text-2xl font-bold text-verde-texto dark:text-verde-claro">932</h3>
          </div>
          <div class="p-3 bg-verde-claro dark:bg-verde-texto/20 text-verde-texto rounded-lg">
            <CheckCircle2 class="w-6 h-6" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs text-gray-400 font-bold uppercase">Em Análise</p>
            <h3 class="text-2xl font-bold text-orange-500">312</h3>
          </div>
          <div class="p-3 bg-orange-50 dark:bg-orange-900/20 text-orange-500 rounded-lg">
            <Clock class="w-6 h-6" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs text-gray-400 font-bold uppercase">Pendentes</p>
            <h3 class="text-2xl font-bold text-red-500">40</h3>
          </div>
          <div class="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg">
            <AlertCircle class="w-6 h-6" />
          </div>
        </div>
      </div>

    </div>

    <!-- Espaço para Gráficos Futuros -->
    <div class="bg-white dark:bg-slate-900 p-8 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm h-64 flex items-center justify-center">
      <p class="text-gray-400 italic">Espaço reservado para gráficos de desempenho (Chart.js)</p>
    </div>
  </div>
</template>