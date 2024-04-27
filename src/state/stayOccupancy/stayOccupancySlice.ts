import { createSlice } from "@reduxjs/toolkit";

export interface IStayOccupancy {
    occupancy: number;
}

const initialState: IStayOccupancy[] = [{ occupancy: 2 }]

const stayOccupancySlice = createSlice({
    name: 'stayOccupancy',
    initialState,
    reducers: {
        addRoom(state) {
            state.push({ occupancy: 0 })
        },
        removeRoom(state) {
            state.pop()
        },
        changeOccupancyOfRoom(state, action) { 
            const { roomIndex, occupancy } = action.payload
            state[roomIndex].occupancy = occupancy
        }
    }
})

export const selectRoomsOccupancy = (state: { stayOccupancy: IStayOccupancy[] }) => state.stayOccupancy
export const { addRoom, removeRoom, changeOccupancyOfRoom } = stayOccupancySlice.actions
export default stayOccupancySlice.reducer