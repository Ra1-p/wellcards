import {configureStore} from "@reduxjs/toolkit"
import cardSliceReducer from "./slices/cardSlice"
import userSliceReducer from "./slices/userSlice"
import appReducer from "./slices/appSlice"
import { TypedUseSelectorHook } from "react-redux"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

export const store = configureStore({
    reducer: {
        cardSliceReducer,
        userSliceReducer,
        appReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector