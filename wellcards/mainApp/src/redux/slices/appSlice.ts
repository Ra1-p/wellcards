import { checkAuth } from './userSlice';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppSliceInitialState {
    isLoading: boolean,
}

const initialState: AppSliceInitialState = {
    isLoading: false,
}

const app = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoading: (state: AppSliceInitialState, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(checkAuth.pending, (state: AppSliceInitialState) => {
            state.isLoading = true;
        })
        builder.addCase(checkAuth.fulfilled, (state: AppSliceInitialState) => {
            state.isLoading = false;
        })
    }
})

export default app.reducer;
export const {setLoading} = app.actions