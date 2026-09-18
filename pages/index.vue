<!-- pages/index.vue -->
<template>
  <div class="max-w-4xl mx-auto p-6 lg:p-10">
    <div class="text-center py-20">
      <div class="text-7xl mb-6">🍽️</div>
      <h1 class="text-4xl sm:text-5xl font-bold mb-4">
        {{ $t("app.title") }}
      </h1>
      <p class="text-lg text-gray-500">
        {{ $t("app.tagline") }}
      </p>

      <div class="mt-10 flex flex-wrap items-center justify-center gap-3">
        <NuxtLink
          :to="localePath('/en')"
          class="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-2xl font-medium hover:scale-105 active:scale-95 transition"
        >
          English
        </NuxtLink>
        <NuxtLink
          :to="localePath('/fa')"
          class="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-2xl font-medium hover:scale-105 active:scale-95 transition"
        >
          فارسی
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();

definePageMeta({
  layout: "default",
});
</script>
