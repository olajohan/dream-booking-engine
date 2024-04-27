import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import hotelReducer from "./hotel/hotelSlice";
import staySearchReducer from "./staySearch/staySearchSlice";
import stayOccupancyReducer from "./stayOccupancy/stayOccupancySlice";
import sessionStorage from 'redux-persist/lib/storage/session'



const reducers = combineReducers({
    hotelState: hotelReducer,
    stayOccupancy: stayOccupancyReducer,
    staySearch: staySearchReducer,
})

const persistConfig = {
    key: 'root',
    storage: sessionStorage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
