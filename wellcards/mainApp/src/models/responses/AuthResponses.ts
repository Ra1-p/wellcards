import { IUser } from '../IUser';
export interface LoginResponse {
    access: string,
    refresh: string,
}

export interface GetMeResponse extends IUser{
    balance: number;
}