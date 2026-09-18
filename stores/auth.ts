// stores/auth.ts
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    currentProfileId: null as string | null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.currentProfileId,
  },

  actions: {
    loginAs(profileId: string) {
      this.currentProfileId = profileId;
      if (process.client) {
        localStorage.setItem("taamjoo_current_profile", profileId);
      }
    },

    logout() {
      this.currentProfileId = null;
      if (process.client) {
        localStorage.removeItem("taamjoo_current_profile");
      }
    },

    init() {
      if (process.client) {
        const saved = localStorage.getItem("taamjoo_current_profile");
        if (saved) this.currentProfileId = saved;
      }
    },
  },
});