import { ICardDetails } from './ICardDetails';
import { IUser } from './IUser';

export interface ICard extends ICardDetails {
    card_id: string,
    created_at: string,
    closed_at: string,
    mask_number: string,
    nick_name: string,
    status: string,
    brand: string,
    is_autolimit: string,
    is_withdrawable: string,
    user: IUser,
    available: number,
}