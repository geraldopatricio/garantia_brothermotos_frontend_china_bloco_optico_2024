<script setup>
import { ref } from 'vue'
import { Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-vue-next'
import logoUrl from '../assets/logo.png' 

const emit = defineEmits(['login-sucesso'])

// Credenciais de teste
const CREDENCIAIS = {
  usuario: 'master',
  senha: '123456'
}

const usuario = ref('')
const senha = ref('')
const verSenha = ref(false)
const erro = ref('')
const carregando = ref(false)

const realizarLogin = () => {
  erro.value = ''
  carregando.value = true

  // Simulamos um pequeno delay para parecer um sistema real
  setTimeout(() => {
    const userDigitado = usuario.value.trim()
    const senhaDigitada = senha.value.trim()

    if (userDigitado !== CREDENCIAIS.usuario) {
      // 1. Valida se o login existe
      erro.value = 'Este login não existe no sistema.'
    } else if (senhaDigitada !== CREDENCIAIS.senha) {
      // 2. Se o login existe, valida se a senha está certa
      erro.value = 'A senha informada está incorreta.'
    } else {
      // 3. Sucesso
      localStorage.setItem('autenticado', 'true')
      emit('login-sucesso')
    }
    
    carregando.value = false
  }, 500) 
}
</script>

<template>
  <div class="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4 font-sans">
    <div class="w-full max-w-md">
      
      <!-- Card Principal -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        <!-- Header com Logo -->
        <div class="p-8 pb-4 text-center">
          <img :src="logoUrl" alt="Logo" class="h-16 mx-auto mb-4 object-contain">
          <h2 class="text-xl font-black text-slate-800 uppercase tracking-tighter">Acesso Restrito</h2>
          <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Imagens Bloco Optico - Garantia 2024</p>
        </div>

        <!-- Formulário -->
        <form @submit.prevent="realizarLogin" class="p-8 pt-4 space-y-5">
          
          <!-- Input Login -->
          <div class="space-y-1">
            <label class="text-[10px] font-black text-gray-400 uppercase ml-1">Usuário</label>
            <div class="relative">
              <User class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input 
                v-model="usuario"
                type="text" 
                placeholder="Ex: master"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-gray-700"
              >
            </div>
          </div>

          <!-- Input Senha -->
          <div class="space-y-1">
            <label class="text-[10px] font-black text-gray-400 uppercase ml-1">Senha</label>
            <div class="relative">
              <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input 
                v-model="senha"
                :type="verSenha ? 'text' : 'password'" 
                placeholder="••••••"
                class="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-gray-700"
              >
              <button 
                type="button" 
                @click="verSenha = !verSenha"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
              >
                <Eye v-if="!verSenha" class="w-4 h-4" />
                <EyeOff v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Alerta de Erro -->
          <Transition name="fade">
            <div v-if="erro" class="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 animate-shake">
              <AlertCircle class="w-4 h-4 shrink-0" />
              <span class="text-[11px] font-bold uppercase tracking-tight">{{ erro }}</span>
            </div>
          </Transition>

          <!-- Botão Entrar -->
          <button 
            type="submit"
            :disabled="carregando"
            class="w-full bg-slate-900 hover:bg-orange-600 text-white font-black py-4 rounded-xl transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-gray-200 text-xs uppercase tracking-widest"
          >
            {{ carregando ? 'Validando...' : 'Entrar no Sistema' }}
          </button>

        </form>

        <div class="bg-gray-50 p-4 border-t border-gray-100 text-center">
          <p class="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">© 2026 BROTHER SYSTEM - GARANTIAS</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-shake {
  animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-3px, 0, 0); }
  40%, 60% { transform: translate3d(3px, 0, 0); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>