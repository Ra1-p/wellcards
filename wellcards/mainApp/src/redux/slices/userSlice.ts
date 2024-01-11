import AuthService from './../../services/Auth';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginRequestData } from '../../models/requests/LoginRequest';
import { RegisterRequestData } from '../../models/requests/RegisterRequest';
import UserInteract from '../../services/UserInteract';
import { ChangeMe } from '../../models/req_res/ChangeMe';
import { setLoading } from './appSlice';

export interface UserSliceInitialState {
    username: string,
    firstName: string,
    lastName: string,
    balance: Balance,
    telegram: string,
    isAuth: boolean;
}

export interface Balance {
    available: number,
    spend: number,
    reserved: number,
}

interface ChangeField {
    field: "telegram" | "firstName" | "lastName",
    value: string,
}

const initialState: UserSliceInitialState = {
    username: "",
    firstName: "",
    lastName: "",
    telegram: "",
    balance: {available: 0, spend: 0, reserved: 0},
    isAuth: false,
}

export const login = createAsyncThunk(
    "user/login",
    async (data: LoginRequestData, {rejectWithValue}) => {
        const {username, password} = data;
        try {
            const tokenResponse = await AuthService.login(username, password);
            localStorage.setItem("access", tokenResponse.data.access);
            localStorage.setItem("refresh", tokenResponse.data.refresh);

            const accountResponse = await AuthService.getMe()
            return accountResponse.data;
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)

export const register = createAsyncThunk(
    "user/register",
    async (data: RegisterRequestData, {rejectWithValue}) => {
        const {username, password, telegram} = data
        try {
            const response = await AuthService.register(username, password, telegram)
            return response.data
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)

export const checkAuth = createAsyncThunk(
    "user/getAccessToken",
    async (refresh: string, {rejectWithValue, dispatch}) => {
        dispatch(setLoading(true))
        try {
            const response = await AuthService.getAccessToken(refresh)
            localStorage.setItem("access", response.data.access)

            const accoutResponse = await AuthService.getMe()
            return accoutResponse.data;
        } catch (e: any) {
            return rejectWithValue(e.message)
        } finally {
            dispatch(setLoading(false));
        }
    }
)

export const changeMe = createAsyncThunk(
    "user/changeMe",
    async (data: ChangeMe, {rejectWithValue}) => {
        try {
            const {telegram, first_name, last_name} = data;
            const response = await UserInteract.changeMe(telegram, first_name, last_name);
            return response.data
        } catch(e: any) {
            return rejectWithValue(e.message)
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        changeField: (state: UserSliceInitialState, action: PayloadAction<ChangeField>) => {
            switch (action.payload.field) {
                case "telegram": {
                    state.telegram = action.payload.value;
                    break;
                }
                case "firstName": {
                    state.firstName = action.payload.value;
                    break;
                }
                case "lastName": {
                    state.lastName = action.payload.value;
                    break;
                }
            }
        },
        // setUser: (state: UserSliceInitialState, action: PayloadAction<UserSliceInitialState>) => {
        //     state = action.payload;
        // },
        logout: (state: UserSliceInitialState) => {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            state.isAuth = false;
            state.balance = {available: 0, spend: 0, reserved: 0};
            state.firstName = "";
            state.lastName = "";
            state.telegram = "";
            state.username = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state: UserSliceInitialState, action) => {
            const {username, firstName, lastName, balance} = action.payload;
            state.username = username;
            state.balance = {available: balance, spend: 0, reserved: 0};// For a little time
            state.isAuth = true;
            firstName && (state.firstName = firstName);
            lastName && (state.lastName = lastName);
        })
        builder.addCase(register.fulfilled, (state: UserSliceInitialState, action) => {
            const {username, firstName, lastName} = action.payload;
            state.username = username;
            state.isAuth = true;
            firstName && (state.firstName = firstName);
            lastName && (state.lastName = lastName);
        })
        builder.addCase(checkAuth.fulfilled, (state: UserSliceInitialState, action) => {
            const {username, firstName, lastName, balance} = action.payload;
            state.username = username;
            state.balance = {available: balance, spend: 0, reserved: 0};// For a little time
            state.isAuth = true;
            firstName && (state.firstName = firstName);
            lastName && (state.lastName = lastName);
        })
        builder.addCase(changeMe.fulfilled, (state: UserSliceInitialState, action) => {
            const {telegram, first_name, last_name} = action.payload;
            state.telegram = telegram;
            state.firstName = first_name;
            state.lastName = last_name;
        })
    }
})

export default userSlice.reducer;
export const {changeField, logout} = userSlice.actions