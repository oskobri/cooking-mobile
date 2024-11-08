import { computed, reactive } from 'vue';
import http from '@/services/api';
import type {User} from "@/services/users/types";
import { Device } from '@capacitor/device';

const state = reactive({
    authenticated: false,
    user: null as User | null
})

const getDeviceName = async () => (await Device.getInfo()).name || 'Unknown Device';

export default function useAuth() {
    const authenticated = computed(() => state.authenticated)
    const user = computed(() => state.user)

    const setAuthenticated = (authenticated: boolean) => {
        state.authenticated = authenticated
    }

    const setUser = (user: User | null = null) => {
        state.user = user
    }

    const login = async (credentials: any) => {
        try {
            const response = await http.post('/api/sanctum/token', {
                ...credentials,
                device_name: await getDeviceName()
            });
            localStorage.setItem('token', response.data);

            return attempt();
        } catch (error) {
            throw new Error(`Error when login: ${error}`);
        }
    }

    const logout = async () => {
        try {
            //await http.post('/logout')

            localStorage.removeItem('token');

            setAuthenticated(false)
            setUser()
        } catch (error) {
            throw new Error(`Error when logout: ${error}`);
        }
    }

    const attempt = async () => {
        try {
            if(localStorage.getItem('token') === null) {
                return Promise.resolve();
            }

            let response = await http.get('/api/me')

            setAuthenticated(true)
            setUser(response.data)

            return response
        } catch (e) {
            localStorage.removeItem('token');
            setAuthenticated(false)
            setUser()
        }
    }

    return {
        authenticated,
        user,
        login,
        logout,
        attempt
    }
}