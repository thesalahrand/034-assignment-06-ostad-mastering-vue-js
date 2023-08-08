<script setup>
import { useAuthStore } from '@/stores/authStore'

const store = useAuthStore()
store.reset()
store.init()
</script>

<template>
  <div class="container py-20">
    <div
      class="w-full sm:w-[480px] mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <form @submit.prevent="store.login()">
        <legend class="text-gray-900 dark:text-gray-300 font-bold text-xl mb-6 text-center">
          Login Now!
        </legend>
        <div class="mb-6">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your email</label
          >
          <input
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="johndoe@example.com"
            v-model="store.email"
            required
          />
          <p v-show="store.loginErrMsg" class="text-red-500 mt-2 text-sm">
            {{ store.loginErrMsg }}
          </p>
        </div>
        <div class="mb-6">
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your password</label
          >
          <input
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            v-model="store.password"
            required
          />
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
        <p class="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Don't have an account?
          <span
            @click="store.setPage('register')"
            class="cursor-pointer font-medium underline underline-offset-4"
            >Register now</span
          >
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
