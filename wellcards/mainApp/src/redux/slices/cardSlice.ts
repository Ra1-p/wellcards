import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard } from "../../models/ICard";
import CardService from "../../services/Cards";

export type CardSliceInitialState = {
    cards: CardInfo[],
    searchFields: SearchFields,
    currentStatus: Status,
    selection: Selection
}

interface Selection {
    isAllSelected: boolean,
    selectedCount: number,
    maxSelectedCount: number;
}

export interface CardInfo extends ICard {
    number: number,
    isSelected: boolean,
    isShown: boolean,
}

export interface SearchFields {
    user: string | null,
    bin: number | null,
    status: string | null
    main: number | string | null
}

export type Status = "active" | "freeze" | "closed"

const initialState: CardSliceInitialState = {
    cards: [],
    searchFields: {
        user: null,
        bin: null,
        status: null,
        main: null,
    },
    selection: {
        isAllSelected: false,
        selectedCount: 0,
        maxSelectedCount: 0,
    },
    currentStatus: "active",
}

export const getCards = createAsyncThunk(
    "cards/getAll",
    async (_, {rejectWithValue}) => {
        try {
            const mainCardsDataResponse = await CardService.getAllCards()
            const detailCardsDataResponse = await CardService.getCardsDetails();

            return {
                mainCardsData: mainCardsDataResponse.data,
                detailCardsData: detailCardsDataResponse.data
            };
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)

export const addCard = createAsyncThunk(
    "cards/addCard",
    async (limit_all_time: string, {rejectWithValue, dispatch}) => {
        try {
            const response = await CardService.addCard(Number(limit_all_time));
            dispatch(getCards());
            return response.data
        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    } 
)

const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        // search: (state: CardSliceInitialState) => {
        //     const { searchFields, cards } = state;
        //     state.selection.selectedCount = 0;
        //     state.selection.isAllSelected = false;

        //     cards.forEach((card) => {
        //         const { bin, owner, status, memo, number } = card;
        //         card.isSelected = false
        //         const isBinMatched = searchFields.bin === null || searchFields.bin === bin; // check if the bin field is suitable for this case
        //         const isOwnerMatched = searchFields.user === null || searchFields.user === owner; // check if the user field suitable for this case
        //         const isStatusMatched = searchFields.status === null || searchFields.status.toLowerCase() === status; // check if the status field suitable for this case
        //         const isMainMatched = // check if main field fuitable for this case
        //             searchFields.main === null ||
        //             (typeof searchFields.main === 'string' && memo.includes(searchFields.main)) || // if string we check memo of card
        //             (typeof searchFields.main === 'number' && number === searchFields.main); // if number we check card number

        //         card.isShown = isBinMatched && isOwnerMatched && isStatusMatched && isMainMatched; // if all fields suitable, show the card info
        //     })

        //     resetSelection(state, cards.filter(c => c.isShown).length)
        // },
        clearSearchFileds: (state: CardSliceInitialState) => {
            state.searchFields.bin = null
            state.searchFields.user = null
            state.searchFields.status = null
            state.cards.forEach(c => {
                c.isShown = true
                return c;
            })

            resetSelection(state, state.cards.length)
        },
        changeCurrentStatus: (state: CardSliceInitialState, action: PayloadAction<Status>) => {
            state.currentStatus = action.payload
        },
        changeCardsStatus: (state: CardSliceInitialState) => {
            state.cards.forEach(c => {
                if (c.isSelected) {
                    c.status = state.currentStatus
                }
                return c;
            })
        },
        initMaxSelectedCount: (state: CardSliceInitialState) => {
            state.selection.maxSelectedCount = state.cards.length;
        },
        changeSelected: (state: CardSliceInitialState, action: PayloadAction<CardInfo>) => {
            const cards = state.cards
            cards.forEach(c => {
                c.isSelected = c.number === action.payload.number ? !c.isSelected : c.isSelected;
                return c;
            })

            state.selection.isAllSelected = !(cards.filter(c => c.isSelected).length < cards.filter(c => c.isShown).length)
        },
        changeAllSelected: (state: CardSliceInitialState) => {
            state.cards.forEach(c => {
                c.isSelected = state.selection.isAllSelected ? false : true;
                return c;
            })
            state.selection.isAllSelected = !state.selection.isAllSelected
        },
        changeSelectNumber: (state: CardSliceInitialState, action: PayloadAction<boolean | "all">) => {
            if (action.payload === "all") {
                let {isAllSelected, selectedCount} = state.selection
                isAllSelected ? selectedCount = state.cards.filter(c => c.isShown).length : selectedCount = 0;
                state.selection.selectedCount = selectedCount
            } else {
                action.payload ? state.selection.selectedCount-- : state.selection.selectedCount++
            }
        },
        changeSearchField: (state: CardSliceInitialState, action: PayloadAction<{ field: string, value: string | null }>) => {
            switch (action.payload.field) {
                case "bin": {
                    state.searchFields.bin = action.payload.value ? parseInt(action.payload.value) : null
                    break
                }
                case "user": {
                    state.searchFields.user = action.payload.value
                    break
                }
                case "status": {
                    state.searchFields.status = action.payload.value && action.payload.value;
                    break;
                }
                case "main": {
                    if (!isNaN(Number(action.payload.value)) && action.payload.value?.length === 4) {
                        state.searchFields.main = parseInt(action.payload.value)
                    } else if (isNaN(Number(action.payload.value))) {
                        state.searchFields.main = action.payload.value
                    } else {
                        state.searchFields.main = null
                    }
                    break;
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCards.fulfilled, (state: CardSliceInitialState, action) => {
            const {mainCardsData, detailCardsData} = action.payload;
            const cards = [] as CardInfo[];
            for (let i = 0; i < mainCardsData.length; i++) {
                let card:CardInfo = {...mainCardsData[i],
                            ...detailCardsData[i],
                            status: mainCardsData[i].status.toLocaleLowerCase(),
                            isShown: true,
                            isSelected: false,
                            number: i
                        };
                
                cards.push(card);
            }
            state.cards = cards;
        })
    }
})

const resetSelection = (state: CardSliceInitialState, maxSelectedCount: number) => {
    state.cards.forEach(c => c.isSelected = false)
    state.selection.isAllSelected = false
    state.selection.selectedCount = 0
    state.selection.maxSelectedCount = maxSelectedCount;
}

export default cardSlice.reducer
export const {
    // search,
    changeCardsStatus,
    changeCurrentStatus,
    changeSelected,
    changeAllSelected,
    changeSearchField,
    clearSearchFileds,
    changeSelectNumber,
    initMaxSelectedCount
} = cardSlice.actions