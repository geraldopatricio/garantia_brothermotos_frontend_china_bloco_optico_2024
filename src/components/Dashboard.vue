<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { 
  BarChart3, 
  Users, 
  Factory, 
  CheckCircle2,
  Loader2
} from 'lucide-vue-next'
import Chart from 'chart.js/auto'

const dados = ref([])
const loading = ref(true)
const canvasClientes = ref(null)
const canvasFabricantes = ref(null)
let chartClientes = null
let chartFabricantes = null

// Buscar dados do backend
const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/garantias')
    dados.value = await response.json()
  } catch (error) {
    console.error("Erro ao buscar dados:", error)
  } finally {
    loading.value = false
  }
}

// 1. Quantidade total de garantias (soma do campo qtd)
const totalQtd = computed(() => {
  return dados.value.reduce((acc, item) => acc + Number(item.qtd || 0), 0)
})

// Função auxiliar para agrupar e somar volumes
const agruparPor = (campo) => {
  const grupos = dados.value.reduce((acc, item) => {
    const chave = item[campo]
    acc[chave] = (acc[chave] || 0) + Number(item.qtd || 0)
    return acc
  }, {})
  
  return Object.entries(grupos)
    .map(([label, total]) => ({ label, total }))
    .sort((a, b) => b.total - a.total)
}

// 2. Código do cliente com maior volume
const topClienteInfo = computed(() => {
  const lista = agruparPor('codcli')
  return lista.length > 0 ? lista[0] : { label: '---', total: 0 }
})

// 3. Código do fabricante com maior volume
const topFabricanteInfo = computed(() => {
  const lista = agruparPor('codfab')
  return lista.length > 0 ? lista[0] : { label: '---', total: 0 }
})

// 4. Quantidade total de status concluído (contagem de registros)
// Como o backend já filtra por "Concluido", é o tamanho do array
const totalConcluidos = computed(() => dados.value.length)

// Configuração dos Gráficos
const renderCharts = () => {
  if (chartClientes) chartClientes.destroy()
  if (chartFabricantes) chartFabricantes.destroy()

  const top10Clientes = agruparPor('codcli').slice(0, 10)
  const top10Fabricantes = agruparPor('codfab').slice(0, 10)

  const chartConfig = (labels, data, label, color) => ({
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label,
        data,
        backgroundColor: color,
        borderRadius: 6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, grid: { display: false } }, x: { grid: { display: false } } }
    }
  })

  chartClientes = new Chart(canvasClientes.value, chartConfig(
    top10Clientes.map(i => `Cli: ${i.label}`),
    top10Clientes.map(i => i.total),
    'Qtd por Cliente',
    '#3b82f6'
  ))

  chartFabricantes = new Chart(canvasFabricantes.value, chartConfig(
    top10Fabricantes.map(i => `Fab: ${i.label}`),
    top10Fabricantes.map(i => i.total),
    'Qtd por Fabricante',
    '#10b981'
  ))
}

onMounted(async () => {
  await fetchData()
  renderCharts()
})
</script>

<template>
  <div class="space-y-6 p-6 bg-gray-50 min-h-screen">
    
    <!-- Loader -->
    <div v-if="loading" class="flex flex-col items-center justify-center h-64 text-gray-500">
      <Loader2 class="w-10 h-10 animate-spin mb-2" />
      <p>Carregando dados do servidor...</p>
    </div>

    <template v-else>
      <!-- Linha de Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <!-- Card 1: Total Qtd -->
        <div class="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gray-500 font-bold uppercase tracking-wider">Volume Total (Qtd)</p>
              <h3 class="text-2xl font-bold text-slate-800">{{ totalQtd.toLocaleString() }}</h3>
            </div>
            <div class="p-3 bg-blue-50 text-blue-500 rounded-lg">
              <BarChart3 class="w-6 h-6" />
            </div>
          </div>
        </div>

        <!-- Card 2: Top Cliente -->
        <div class="bg-white p-6 rounded-xl border border-indigo-100 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gray-500 font-bold uppercase tracking-wider">Top Cliente (Cód)</p>
              <h3 class="text-2xl font-bold text-indigo-600">{{ topClienteInfo.label }}</h3>
              <p class="text-[10px] text-gray-400">Volume: {{ topClienteInfo.total }}</p>
            </div>
            <div class="p-3 bg-indigo-50 text-indigo-500 rounded-lg">
              <Users class="w-6 h-6" />
            </div>
          </div>
        </div>

        <!-- Card 3: Top Fabricante -->
        <div class="bg-white p-6 rounded-xl border border-amber-100 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gray-500 font-bold uppercase tracking-wider">Top Fabricante (Cód)</p>
              <h3 class="text-2xl font-bold text-amber-600">{{ topFabricanteInfo.label }}</h3>
              <p class="text-[10px] text-gray-400">Volume: {{ topFabricanteInfo.total }}</p>
            </div>
            <div class="p-3 bg-amber-50 text-amber-500 rounded-lg">
              <Factory class="w-6 h-6" />
            </div>
          </div>
        </div>

        <!-- Card 4: Total Concluídos -->
        <div class="bg-white p-6 rounded-xl border border-emerald-100 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gray-500 font-bold uppercase tracking-wider">Itens Concluídos</p>
              <h3 class="text-2xl font-bold text-emerald-600">{{ totalConcluidos }}</h3>
            </div>
            <div class="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <CheckCircle2 class="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <!-- Área de Gráficos -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Gráfico Clientes -->
        <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h4 class="text-sm font-bold text-gray-700 mb-4 uppercase tracking-tighter">Top 10 Clientes por Volume</h4>
          <div class="h-72">
            <canvas ref="canvasClientes"></canvas>
          </div>
        </div>

        <!-- Gráfico Fabricantes -->
        <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h4 class="text-sm font-bold text-gray-700 mb-4 uppercase tracking-tighter">Top 10 Fabricantes por Volume</h4>
          <div class="h-72">
            <canvas ref="canvasFabricantes"></canvas>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>