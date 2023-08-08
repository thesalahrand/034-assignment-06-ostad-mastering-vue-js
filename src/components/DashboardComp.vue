<script setup>
import { useAuthStore } from '@/stores/authStore'

const store = useAuthStore()
store.reset()
store.init()
</script>

<template>
  <div class="container py-20 mx-auto">
    <div class="w-full mx-auto sm:w-[480px]">
      <h6 class="text-lg font-bold text-gray-500 dark:text-gray-400 mb-4">
        Assalamu 'alaikum,
        <span
          class="text-purple-500 underline decoration-2 underline-offset-2 decoration-purple-500"
          >{{ store.loggedInUser.name }}</span
        >
      </h6>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Welcome to <span class="font-semibold">Simple Auth App</span>. This app uses local storage
        to store the registered users. Once a login entry matches with any of the registered users,
        it lets the user to login. The user is automatically remembered for the next visits until
        the local storage is cleaned up.
      </p>
    </div>
  </div>
</template>

<style scoped></style>
