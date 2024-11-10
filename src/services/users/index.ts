import http from "../api";
import type {APIResponse} from "../types.d";
import type {User} from "./types.d";
import {Device} from "@capacitor/device";

const apiUrl = 'api/users';

const getDeviceName = async () => (await Device.getInfo()).name || 'Unknown Device';

async function getToken(credentials: any): Promise<APIResponse<string>> {
    try {
        return await http.post(`api/sanctum/token`, {
            ...credentials,
            device_name: await getDeviceName()
        });
    } catch(error) {
        throw new Error(`Error when fetching user: ${error}`);
    }
}

async function me(): Promise<APIResponse<User>> {
    try {
        const response =  await http.get<APIResponse<User>>(`${apiUrl}/me`);
        return response.data;
    } catch(error) {
        throw new Error(`Error when fetching user: ${error}`);
    }
}

export default {
    getToken,
    me
};