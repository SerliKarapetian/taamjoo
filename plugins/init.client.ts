// plugins/init.client.ts
export default defineNuxtPlugin(() => {
    const profilesStore = useProfilesStore();
    const menuStore = useMenuStore();
    const authStore = useAuthStore();

    profilesStore.load();
    menuStore.load();
    authStore.init();
});