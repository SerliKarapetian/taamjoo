// stores/dropdown.ts
import { defineStore } from "pinia";

export const useDropdownStore = defineStore("dropdown", {
  state: () => ({
    openId: null as string | null,
  }),

  actions: {
    toggle(id: string) {
      this.openId = this.openId === id ? null : id;
    },
    close() {
      this.openId = null;
    },
    isOpen(id: string) {
      return this.openId === id;
    },
  },
});