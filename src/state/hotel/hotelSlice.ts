import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHotel } from "../../api/mewsApi";
import { IApiHotel } from "../../api/IApiHotel";
import { IHotel } from "../../domain/IHotel";

interface IHotelState {
    hotel: IHotel | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: IHotelState = {
    hotel: null,
    status: "idle",
    error: null
}

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    setHotelState(state, action) {
      state.hotel = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchHotel.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchHotel.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.hotel = action.payload
      })
      .addCase(fetchHotel.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message?? null
      })
  },
})

export const fetchHotel = createAsyncThunk('hotel/fetchHotel', async () => {
    const response = await getHotel()
    return response
})
export const selectHotel = (state: { hotelState: IHotelState }) => state.hotelState.hotel
export const { setHotelState } = hotelSlice.actions
export default hotelSlice.reducer