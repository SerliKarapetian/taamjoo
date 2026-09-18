// composables/useProfile.ts
import type { Profile, BusinessProfile, UserProfile } from "~/types";

export const useProfile = () => {
  const profilesStore = useProfilesStore();
  const authStore = useAuthStore();

  const currentProfile = computed<Profile | null>(() => {
    if (!authStore.currentProfileId) return null;
    return profilesStore.getProfileById(authStore.currentProfileId);
  });

  const currentBusiness = computed<BusinessProfile | null>(() => {
    const p = currentProfile.value;
    return p && p.type === "business" ? p : null;
  });

  const currentUser = computed<UserProfile | null>(() => {
    const p = currentProfile.value;
    return p && p.type === "user" ? p : null;
  });

  const isOwnProfile = (id: string | Ref<string>) => {
    const idRef = isRef(id) ? id : ref(id);
    return computed(() => authStore.currentProfileId === idRef.value);
  };

  return {
    currentProfile,
    currentBusiness,
    currentUser,
    isOwnProfile,
  };
};