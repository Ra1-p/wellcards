import { LoginResponse, GetMeResponse } from '../models/responses/AuthResponses';
import { AxiosResponse } from "axios";
import { api } from "../api/api";
import { IUser } from '../models/IUser';

export default class AuthService {
    static async login(username: string, password: string): Promise<AxiosResponse<LoginResponse>> {
        const tokens = api.post<LoginResponse>("users/token/", {username, password})
        return tokens
    }
    static async register(username: string, password: string, telegram: string): Promise<AxiosResponse<IUser>> {
        const userData = api.post<IUser>("users/register/", {username, password, telegram})
        return userData
    }
    static async getMe(): Promise<AxiosResponse<GetMeResponse>> {
        const userData = api.get<GetMeResponse>("users/me/");
        return userData
    }
    static async getAccessToken(refresh: string): Promise<AxiosResponse<{access: string}>> {
        return api.post<{access: string}>("users/token/refresh/", {refresh})
    }
}