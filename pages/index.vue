<!-- pages/index.vue — TEMPORARY TEST -->
<template>
  <div class="max-w-4xl mx-auto p-6 lg:p-10">
    <h1 class="text-3xl font-bold mb-6">Section 1 — Store Test</h1>

    <div class="space-y-4">
      <div
        class="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800"
      >
        <div>
          <strong>Profiles loaded:</strong> {{ profilesStore.isLoaded }}
        </div>
        <div>
          <strong>Total profiles:</strong> {{ profilesStore.profiles.length }}
        </div>
        <div>
          <strong>Businesses:</strong>
          {{ profilesStore.businessProfiles.length }}
        </div>
        <div>
          <strong>Users:</strong> {{ profilesStore.userProfiles.length }}
        </div>
      </div>

      <div
        class="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800"
      >
        <h2 class="font-bold mb-2">Businesses:</h2>
        <ul class="space-y-2">
          <li
            v-for="b in profilesStore.businessProfiles"
            :key="b.id"
            class="border p-3 rounded"
          >
            <div>
              <strong>{{ b.displayName }}</strong> ({{ b.category }})
            </div>
            <div class="text-sm text-gray-500">
              {{ b.address.city }} — {{ b.address.coordinates.lat }},
              {{ b.address.coordinates.lng }}
            </div>
          </li>
        </ul>
      </div>

      <div
        class="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800"
      >
        <h2 class="font-bold mb-2">Search "cafe":</h2>
        <ul>
          <li v-for="b in profilesStore.searchBusinesses('cafe')" :key="b.id">
            {{ b.displayName }}
          </li>
        </ul>
      </div>

      <div
        class="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800"
      >
        <h2 class="font-bold mb-2">Auth state:</h2>
        <div>
          Current profile id: {{ authStore.currentProfileId || "none" }}
        </div>
        <div class="flex flex-wrap gap-2 mt-3">
          <button
            v-for="p in profilesStore.profiles"
            :key="p.id"
            @click="authStore.loginAs(p.id)"
            class="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Login as {{ p.displayName }}
          </button>
          <button
            @click="authStore.logout()"
            class="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      <button
        @click="profilesStore.reset()"
        class="bg-red-500 text-white px-4 py-2 rounded-xl"
      >
        Reset Seed Data
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const profilesStore = useProfilesStore();
const authStore = useAuthStore();

definePageMeta({ layout: "default" });
</script>
