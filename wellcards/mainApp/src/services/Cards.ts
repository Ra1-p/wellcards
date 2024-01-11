import { ICard } from './../models/ICard';
import { AxiosResponse } from 'axios';
import { api } from '../api/api';
import { ICardDetails } from '../models/ICardDetails';
export default class CardService {
    static async getAllCards(): Promise<AxiosResponse<ICard[]>> {
        const cards = api.get<ICard[]>("/cards/all/");
        return cards
    }
    static async getCardsDetails(): Promise<AxiosResponse<ICardDetails[]>> {
        const cardsDetails = api.get<ICardDetails[]>("/cards/card/detail/");
        return cardsDetails;
    }

    static async addCard(limitAllTime: number): Promise<AxiosResponse<ICard>> {
        const newCard = api.post<ICard>("cards/card/add/", {"limit_all_time": limitAllTime})
        return newCard;
    }

    static async closeCard(cardId: number): Promise<AxiosResponse<string>> {
        const res = api.put<string>("cards/card/close/", {"card_id": cardId});
        return res;
    }

}