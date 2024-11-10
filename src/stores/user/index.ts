import {defineStore} from "pinia";
import {ref} from "vue";
import type {
    User,
} from "@/services/users/types.d";
import {API} from "@/services";

export const useUserStore = defineStore("userStore", () => {
    const authenticated = ref<boolean>(false);
    const user = ref<User | null>(null);

    const login = async (credentials: any) => {
        try {
            const response = await API.user.getToken(credentials);
            localStorage.setItem('token', response.data);

            return attempt();
        } catch (error) {
            throw new Error(`Error when login: ${error}`);
        }
    }

    const logout = async () => {
        try {
            localStorage.removeItem('token');

            authenticated.value = false;
            user.value = null;
        } catch (error) {
            throw new Error(`Error when logout: ${error}`);
        }
    }

    const attempt = async () => {
        try {
            if(localStorage.getItem('token') === null) {
                return Promise.resolve();
            }

            const response = await API.user.me();


            authenticated.value = true;
            user.value = response.data;

            return response
        } catch (e) {
            localStorage.removeItem('token');
            authenticated.value = false;
            user.value = null;
        }
    }


    return {
        authenticated,
        user,
        login,
        logout,
        attempt
    };

});