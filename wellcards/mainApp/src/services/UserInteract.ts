import { ChangeMe } from './../models/req_res/ChangeMe';
import { AxiosResponse } from 'axios';
import { api } from './../api/api';

export default class UserInteract {
    static async changeMe(telegram: string, firstName: string, lastName: string): Promise<AxiosResponse<ChangeMe>> {
        const me = api.put<ChangeMe>("users/change/account/me/", {telegram, first_name: firstName, last_name: lastName})
        return me;
    }
}
