import { createSlice } from '@reduxjs/toolkit';


export interface IStaySearch {
    selectedDateRange: [string | null, string | null];
    selectedRoomCategories: string[];
}

const initialState: IStaySearch = {
    selectedDateRange: [null, null],
    selectedRoomCategories: [
        '9eb71fa5-2653-4c21-8c12-b13400aacfbe',
        '4e4082b5-71ac-4ea4-b107-b1340150f566',
        'a0ecba10-b527-4874-924c-b13400aacfbe',
        '92ac9460-d3a0-43af-a33f-b13400aacfbe',
        '1314e78d-a97e-42c9-883a-b13400aacfbe',
    ]
}

const staySearchSlice = createSlice({
    name: 'staySearch',
    initialState,
    reducers: {
        setSelectedDateRange(state, action) {
            state.selectedDateRange = action.payload
        },
        clearSelectedDateRange(state) {
            state.selectedDateRange = [null, null]
        },
        setSelectedRoomCategories(state, action) {
            state.selectedRoomCategories = action.payload
        },
        selectRoomCategory(state, action) {
            state.selectedRoomCategories.push(action.payload)
        },
        unselectRoomCategory(state, action) {
            state.selectedRoomCategories = state.selectedRoomCategories.filter(roomCategory => roomCategory !== action.payload)
        }
    }
})

export const selectStaySearch = (state: { staySearch: IStaySearch }) => state.staySearch
export const { setSelectedDateRange, clearSelectedDateRange, setSelectedRoomCategories, selectRoomCategory, unselectRoomCategory } = staySearchSlice.actions
export default staySearchSlice.reducer