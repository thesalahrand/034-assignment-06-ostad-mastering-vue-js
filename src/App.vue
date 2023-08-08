<script setup>
import NavigationBar from '@/components/NavigationBar.vue'
import RegisterComp from '@/components/RegisterComp.vue'
import LoginComp from '@/components/LoginComp.vue'
import DashboardComp from '@/components/DashboardComp.vue'

import { useAuthStore } from '@/stores/authStore'
const store = useAuthStore()
</script>

<template>
  <div>
    <NavigationBar />
    <LoginComp v-if="store.page === 'login'" />
    <RegisterComp v-if="store.page === 'register'" />
    <DashboardComp v-if="store.page === 'dashboard'" />
  </div>
</template>

<style scoped></style>
