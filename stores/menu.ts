// stores/menu.ts
import { defineStore } from "pinia";
import type { SavedMenu } from "~/types";

const uid = () => `menu_${Math.random().toString(36).slice(2, 9)}`;
const now = () => new Date().toISOString();

/** Extract a clean name from a URL */
const nameFromUrl = (url: string): string => {
  try {
    const { hostname, pathname } = new URL(url);
    const clean = hostname.replace(/^www\./, "");
    const firstPath = pathname.split("/").filter(Boolean)[0] || "";
    const candidate = firstPath ? `${clean} - ${firstPath}` : clean;
    return candidate
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .slice(0, 60);
  } catch {
    return url.slice(0, 40);
  }
};

const isValidUrl = (url: string) => {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

export const useMenuStore = defineStore("menu", {
  state: () => ({
    menus: [] as SavedMenu[],
    isLoaded: false,
  }),

  actions: {
    /* ---------------- Persistence ---------------- */

    save() {
      if (process.client) {
        localStorage.setItem("taamjoo_menus", JSON.stringify(this.menus));
      }
    },

    load() {
      if (!process.client) return;
      const raw = localStorage.getItem("taamjoo_menus");
      if (raw) {
        try {
          this.menus = JSON.parse(raw);
        } catch {
          this.menus = [];
        }
      }
      this.isLoaded = true;
    },

    /* ---------------- CRUD ---------------- */

    addMenu(url: string) {
      if (!isValidUrl(url)) return null;

      const existing = this.menus.find((m) => m.url === url);
      if (existing) {
        existing.lastVisited = now();
        this.save();
        return { menu: existing, isDuplicate: true };
      }

      const menu: SavedMenu = {
        id: uid(),
        name: nameFromUrl(url),
        url,
        addedAt: now(),
        lastVisited: now(),
      };

      this.menus.push(menu);
      this.save();
      return { menu, isDuplicate: false };
    },

    addMultipleMenus(urls: string[]) {
      const added: SavedMenu[] = [];
      const duplicates: SavedMenu[] = [];
      let failed = 0;

      for (const url of urls) {
        const result = this.addMenu(url);
        if (!result) {
          failed++;
        } else if (result.isDuplicate) {
          duplicates.push(result.menu);
        } else {
          added.push(result.menu);
        }
      }

      return { added, duplicates, failed };
    },

    removeMenu(id: string) {
      this.menus = this.menus.filter((m) => m.id !== id);
      this.save();
    },

    updateMenu(updated: SavedMenu) {
      const idx = this.menus.findIndex((m) => m.id === updated.id);
      if (idx === -1) return false;
      this.menus[idx] = updated;
      this.save();
      return true;
    },

    updateLastVisited(id: string) {
      const menu = this.menus.find((m) => m.id === id);
      if (menu) {
        menu.lastVisited = now();
        this.save();
      }
    },

    reset() {
      this.menus = [];
      this.save();
    },
  },
});