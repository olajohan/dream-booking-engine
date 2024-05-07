import { createSlice } from "@reduxjs/toolkit";


export interface ISettings {
    languageCode: string;
    currencyCode: string;
}

const initialState: ISettings = {
    languageCode: 'en-US',
    currencyCode: 'NOK'
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setLanguage(state, action) {
            state.languageCode = action.payload;
        },
        setCurrency(state, action) {
            state.currencyCode = action.payload;
        }
    }
});

export const { setLanguage, setCurrency } = settingsSlice.actions;
export default settingsSlice.reducer;
export const selectSettings  = (state: { settings: ISettings }) => state.settings;
