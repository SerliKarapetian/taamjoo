// stores/profiles.ts
import { defineStore } from "pinia";
import type {
  Profile,
  BusinessProfile,
  UserProfile,
  Comment,
  Recommendation,
} from "~/types";

const uid = (prefix: string) =>
  `${prefix}_${Math.random().toString(36).slice(2, 9)}`;

const now = () => new Date().toISOString();

export const useProfilesStore = defineStore("profiles", {
  state: () => ({
    profiles: [] as Profile[],
    isLoaded: false,
  }),

  getters: {
    businessProfiles: (state): BusinessProfile[] =>
      state.profiles.filter((p) => p.type === "business") as BusinessProfile[],

    userProfiles: (state): UserProfile[] =>
      state.profiles.filter((p) => p.type === "user") as UserProfile[],

    getProfileById: (state) => {
      return (id: string): Profile | null =>
        state.profiles.find((p) => p.id === id) || null;
    },

    searchBusinesses: (state) => {
      return (query: string, category?: string): BusinessProfile[] => {
        const businesses = state.profiles.filter(
          (p) => p.type === "business"
        ) as BusinessProfile[];

        const q = query.trim().toLowerCase();

        return businesses.filter((b) => {
          const matchesQuery =
            !q ||
            b.displayName.toLowerCase().includes(q) ||
            b.address.city.toLowerCase().includes(q) ||
            b.category.toLowerCase().includes(q);

          const matchesCategory = !category || b.category === category;

          return matchesQuery && matchesCategory;
        });
      };
    },
  },

  actions: {
    /* ---------------- Persistence ---------------- */

    save() {
      if (process.client) {
        localStorage.setItem("taamjoo_profiles", JSON.stringify(this.profiles));
      }
    },

    load() {
      if (!process.client) return;

      const raw = localStorage.getItem("taamjoo_profiles");
      if (raw) {
        try {
          this.profiles = JSON.parse(raw);
        } catch (e) {
          console.warn("Failed to parse profiles, seeding…", e);
          this.seed();
        }
      } else {
        this.seed();
      }
      this.isLoaded = true;
    },

    /* ---------------- CRUD ---------------- */

    addProfile(profile: Profile) {
      this.profiles.push(profile);
      this.save();
      return profile;
    },

    updateProfile(id: string, patch: Partial<Profile>) {
      const idx = this.profiles.findIndex((p) => p.id === id);
      if (idx === -1) return false;
      this.profiles[idx] = {
        ...this.profiles[idx],
        ...patch,
        updatedAt: now(),
      } as Profile;
      this.save();
      return true;
    },

    removeProfile(id: string) {
      this.profiles = this.profiles.filter((p) => p.id !== id);
      this.save();
    },

    /* ---------------- Comments ---------------- */

    addComment(
      businessId: string,
      comment: Omit<Comment, "id" | "createdAt">
    ) {
      const business = this.profiles.find(
        (p) => p.id === businessId && p.type === "business"
      ) as BusinessProfile | undefined;
      if (!business) return null;

      const newComment: Comment = {
        ...comment,
        id: uid("comment"),
        createdAt: now(),
      };
      business.comments.push(newComment);
      this.save();
      return newComment;
    },

    removeComment(businessId: string, commentId: string) {
      const business = this.profiles.find(
        (p) => p.id === businessId && p.type === "business"
      ) as BusinessProfile | undefined;
      if (!business) return false;

      business.comments = business.comments.filter((c) => c.id !== commentId);
      this.save();
      return true;
    },

    /* ---------------- Recommendations ---------------- */

    addRecommendation(
      businessId: string,
      recommendation: Omit<Recommendation, "id" | "createdAt">
    ) {
      const business = this.profiles.find(
        (p) => p.id === businessId && p.type === "business"
      ) as BusinessProfile | undefined;
      if (!business) return null;

      const newRec: Recommendation = {
        ...recommendation,
        id: uid("rec"),
        createdAt: now(),
      };
      business.recommendations.push(newRec);
      this.save();
      return newRec;
    },

    /* ---------------- Seed ---------------- */

    seed() {
      const restaurant: BusinessProfile = {
        id: "biz_1",
        type: "business",
        displayName: "The Green Olive",
        avatar:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200",
        bio: "Authentic Mediterranean cuisine in the heart of the city.",
        category: "restaurant",
        isVerified: true,
        createdAt: now(),
        updatedAt: now(),
        phone: "+1 555 123 4567",
        website: "https://greenolive.example.com",
        address: {
          street: "123 Main Street",
          city: "Tehran",
          country: "Iran",
          coordinates: { lat: 35.6892, lng: 51.389 },
        },
        gallery: [],
        menuItems: [
          {
            id: "item_1",
            businessId: "biz_1",
            name: "Hummus Plate",
            description: "Creamy chickpea dip with olive oil",
            price: 8,
            currency: "USD",
            category: "Appetizer",
          },
          {
            id: "item_2",
            businessId: "biz_1",
            name: "Grilled Chicken Kebab",
            description: "Served with saffron rice",
            price: 15,
            currency: "USD",
            category: "Main",
          },
        ],
        recommendations: [
          {
            id: "rec_1",
            businessId: "biz_1",
            title: "Summer Special",
            description: "Fresh summer salads and cold drinks",
            offer: "20% off",
            createdAt: now(),
          },
        ],
        comments: [],
        rating: 4.5,
        ratingCount: 12,
      };

      const cafe: BusinessProfile = {
        id: "biz_2",
        type: "business",
        displayName: "Blue Bean Cafe",
        avatar:
          "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200",
        bio: "Cozy cafe with specialty coffee and pastries.",
        category: "cafe",
        isVerified: false,
        createdAt: now(),
        updatedAt: now(),
        address: {
          street: "456 Elm Avenue",
          city: "Tehran",
          country: "Iran",
          coordinates: { lat: 35.7, lng: 51.42 },
        },
        menuItems: [],
        recommendations: [],
        comments: [],
        rating: 4.8,
        ratingCount: 5,
      };

      const user: UserProfile = {
        id: "user_1",
        type: "user",
        displayName: "Sara",
        avatar: "https://i.pravatar.cc/150?img=45",
        bio: "Food lover and coffee addict ☕",
        createdAt: now(),
        updatedAt: now(),
        city: "Tehran",
        savedBusinessIds: ["biz_1"],
        favorites: [],
        recommendations: [],
        comments: [],
      };

      this.profiles = [restaurant, cafe, user];
      this.save();
    },

    reset() {
      this.profiles = [];
      this.seed();
    },
  },
});