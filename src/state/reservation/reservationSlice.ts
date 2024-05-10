import { createSlice } from "@reduxjs/toolkit";
import { IReservation } from "../../domain/IReservation";

const initialState: IReservation[] = []

const reservationSlice = createSlice({
    name: 'reservations',
    initialState,
    reducers: {
        setReservations(state, action) {
            state = action.payload;
        },
        addReservation(state, action) {
            state.push(action.payload as IReservation);
        },
        removeReservation(state, action) {
            return state.filter(reservation => reservation.roomCategoryId !== action.payload.roomCategoryId || reservation.rateId !== action.payload.rateId)
        },
        clearAllReservations(state) {
            return []
        },
    }
});

export const { 
    setReservations, 
    addReservation, 
    removeReservation,
    clearAllReservations
} = reservationSlice.actions;

export default reservationSlice.reducer;
export const selectAllReservations = (state: IReservation[] ) => state