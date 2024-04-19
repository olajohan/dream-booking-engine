import { createContext, useReducer } from 'react';
import { useImmerReducer } from 'use-immer';
import dayjs, { Dayjs } from 'dayjs';
import React, { useContext } from 'react'

export interface AccommodationSearchState {
    isLoading: boolean,
    fullyBookedDates: Dayjs[],
    selectedMonth: Dayjs,
    selectedDateRange: {
        arrival: Dayjs | null,
        departure: Dayjs | null
    },
    maxDate: Dayjs | null,
    selectedRoomTypes: {
        [roomType: string]: boolean
    }
}

export type AccommodationSearchActions = {
    type: 'changed_month' |
    'changed_selected_date_range' |
    'update_fully_booked_dates' |
    'update_max_date' |
    'update_is_loading' |
    'update_room_checkbox',
    payload: AccommodationSearchState
}

const initialAccommodationSearchState: AccommodationSearchState = {
    isLoading: true,
    fullyBookedDates: [],
    selectedMonth: dayjs().startOf('month'),
    selectedDateRange: {
        arrival: null,
        departure: null
    },
    maxDate: null,
    selectedRoomTypes: {
        skySuite: true,
        igloo180: true,
        igloo360: true,
        seaCabin: true
    }
}

function accommodationSearchReducer(state: AccommodationSearchState, action: AccommodationSearchActions) {

    switch (action.type) {

        case ('changed_month'):
            return {
                ...state,
                selectedMonth: action.payload.selectedMonth
            }

        case ('changed_selected_date_range'):
            return {
                ...state,
                selectedDateRange: action.payload.selectedDateRange,
                maxDate: action.payload.maxDate,
            }

        case ('update_fully_booked_dates'):
            return {
                ...state,
                fullyBookedDates: action.payload.fullyBookedDates
            }

        case ('update_max_date'):
            return {
                ...state,
                maxDate: action.payload.maxDate
            }
        case ('update_is_loading'):
            return {
                ...state,
                isLoading: action.payload.isLoading
            }

        case ('update_room_checkbox'):
            return {
                ...state,
                selectedRoomTypes: action.payload.selectedRoomTypes
            }
        default:
            return {
                ...state,
            }
    }

}

export const AccommodationSearchContext = createContext<AccommodationSearchState>(initialAccommodationSearchState)
export const AccommodationSearchDispatchContext = createContext<React.Dispatch<AccommodationSearchActions>>((value) => null)

export function AccommodationSearchProvider({children}: React.PropsWithChildren ) {
    
    const [accommodationSearch, dispatch] = useReducer(
        accommodationSearchReducer,
        initialAccommodationSearchState
    )

    return(
        <AccommodationSearchContext.Provider value={accommodationSearch}>
            <AccommodationSearchDispatchContext.Provider value={dispatch}>
                {children}
            </AccommodationSearchDispatchContext.Provider>
        </AccommodationSearchContext.Provider>
    )
}

export function useAccommodationSearchContext() {
    return useContext(AccommodationSearchContext)
}

export function useAccommodationSearchDispatchContext() {
    return useContext(AccommodationSearchDispatchContext)
}