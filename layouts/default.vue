<!-- layouts/default.vue -->
<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100"
    :dir="isRtl ? 'rtl' : 'ltr'"
  >
    <header
      class="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between"
      >
        <NuxtLink :to="localePath('/')" class="font-bold text-lg">
          🍽️ {{ $t("app.title") }}
        </NuxtLink>

        <div class="text-xs text-gray-500">
          {{ $t("app.tagline") }}
        </div>
      </div>
    </header>

    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const localePath = useLocalePath();

const isRtl = computed(() => locale.value === "fa");

// Ensure document direction is correct
watch(
  locale,
  (newLocale) => {
    if (process.client) {
      const rtl = newLocale === "fa";
      document.documentElement.dir = rtl ? "rtl" : "ltr";
      document.documentElement.lang = newLocale;
    }
  },
  { immediate: true },
);

onMounted(() => {
  if (process.client) {
    const rtl = locale.value === "fa";
    document.documentElement.dir = rtl ? "rtl" : "ltr";
    document.documentElement.lang = locale.value;
  }
});
</script>
