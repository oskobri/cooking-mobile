import { useUserStore } from "@/stores/user";

export function useAuth() {
    const userStore = useUserStore();

    return {
        isAuthenticated: userStore.authenticated,
        user: userStore.user
    };
}