import { CalendarState } from "./Calendar";

export default function calendarReducer(state: CalendarState, action: CalendarActions) {

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

export type CalendarActions = {
    type: 'changed_month' |
    'changed_selected_date_range' |
    'update_fully_booked_dates' |
    'update_max_date' |
    'update_is_loading' |
    'update_room_checkbox'
    payload: CalendarState
}