import { computed, reactive } from 'vue';
import http from '@/services/api';

const state = reactive({
    authenticated: false,
    user: {}
})

export default function useAuth() {
    const authenticated = computed(() => state.authenticated)
    const user = computed(() => state.user)

    const setAuthenticated = (authenticated) => {
        state.authenticated = authenticated
    }

    const setUser = (user) => {
        state.user = user
    }

    const login = async (credentials) => {
        await http.get('/sanctum/csrf-cookie');

        try {
            await http.post('/login', credentials);
            return attempt();
        } catch (e) {
            return Promise.reject(e.response.data.errors)
        }
    }

    const logout = async () => {
        await http.get('/sanctum/csrf-cookie')

        try {
            await http.post('/logout')
            setAuthenticated(false)
            setUser({})
        } catch (e) {
            return Promise.reject(e.response.data.errors)
        }
    }

    const attempt = async () => {
        try {
            let response = await http.get('/api/me')

            setAuthenticated(true)
            setUser(response.data)

            return response
        } catch (e) {
            setAuthenticated(false)
            setUser({})
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