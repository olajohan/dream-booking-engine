import { useReducer, useEffect, useState } from 'react'
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { pickersLayoutClasses } from '@mui/x-date-pickers/PickersLayout';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { DateRange } from '@mui/x-date-pickers-pro';
import utc from 'dayjs/plugin/utc';
import { ServiceAvailability } from '../../api/ServiceAvailability.interface';
import { getAccommodationServiceAvailability } from '../../api';
import calendarReducer from './calendarReducer';
dayjs.extend(utc);


export interface ICalendarProps {
    setSelectedDateRange: (dateRange: DateRange<Dayjs>) => void
}
const Calendar: React.FC<ICalendarProps> = ({ ...props }) => {

    const [calendarState, dispatch] = useReducer(calendarReducer, initialCalendarState)

    // Fetch the fully booked dates for each selected month
    useEffect(() => {
        updateFullyBookedDates(calendarState.selectedMonth)
    }, [calendarState.selectedMonth])


    useEffect(() => {
        updateMaxDate(calendarState.selectedDateRange.arrival, calendarState.fullyBookedDates)
    }, [calendarState.fullyBookedDates, calendarState.selectedDateRange.arrival])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDateRangePicker
                disablePast={true}
                displayWeekNumber={true}
                loading={calendarState.isLoading}
                maxDate={calendarState.maxDate? calendarState.maxDate : undefined}
                timezone='UTC'

                disableAutoMonthSwitching={true}
                onMonthChange={handleCalendarOnMonthChange}
                onChange={handleCalendarOnChange}
                shouldDisableDate={handleCalendarShouldDisableDate}
                slotProps={{
                    toolbar: { hidden: false },
                    actionBar: { actions: ['clear'] },
                }}
                sx={{
                    [`.${pickersLayoutClasses.contentWrapper}`]: {
                        alignItems: 'center',
                    },

                }}
            />
        </LocalizationProvider>
    )

    async function updateFullyBookedDates(month: Dayjs) {
        const endDate = month.endOf('month').startOf('date')
        const startDate = month.startOf('month').startOf('date').isBefore(dayjs()) ? dayjs() : month.startOf('month').startOf('date')
        const serviceAvailability = await getAccommodationServiceAvailability(startDate, endDate)
        const newListOfFullyBookedDates = getFullyBookedDatesFromServiceAvailability(serviceAvailability)
        dispatch({
            type: 'update_fully_booked_dates',
            payload: {
                ...calendarState,
                fullyBookedDates: newListOfFullyBookedDates,
            }
        })
    }

    function updateMaxDate(arrivalDate: Dayjs | null, fullyBookedDates: Dayjs[]) {
        dispatch({
            type: 'update_max_date',
            payload: {
                ...calendarState,
                maxDate: getNextFullyBookedDate(arrivalDate, fullyBookedDates) 
            }
        })
    }

    function updateIsLoading(isLoading: boolean) {
        dispatch({
            type: 'update_is_loading',
            payload: {
                ...calendarState,
                isLoading: isLoading
            }
        })
    }

    function handleCalendarOnChange(dateRange: DateRange<Dayjs>) {
        
        dispatch({
            type: 'changed_selected_date_range',
            payload: {
                ...calendarState,
                selectedDateRange: {
                    arrival: dateRange[0],
                    departure: dateRange[1]
                }
            }
        })
    }

    function handleCalendarOnMonthChange(month: Dayjs) {
        dispatch({
            type: 'changed_month',
            payload: {
                ...calendarState,
                selectedMonth: month
            }
        })
    }

    function handleCalendarShouldDisableDate(dateToBeChecked: Dayjs, position: 'start' | 'end'): boolean {
        const arrivalDate = calendarState.selectedDateRange.arrival
        const isDateFullyBooked = checkIfDateFullyBooked(dateToBeChecked)
        const isBeforeArrivalDate = checkIfDateIsBeforeArrivalDate(dateToBeChecked, arrivalDate)
        const isDatePossibleDepartureDate = checkIfDateIsPossibleDepartureDate(dateToBeChecked, arrivalDate)
        const isStayOverDayInPackageTourSeason = checkIfStayOverDayInPackageTourSeason(dateToBeChecked)

        if (arrivalDate !== null) {
            if (isBeforeArrivalDate) return true
            if (isDatePossibleDepartureDate) return false
        }

        return isDateFullyBooked || isStayOverDayInPackageTourSeason

    }

    function checkIfStayOverDayInPackageTourSeason(dateToBeChecked: Dayjs): boolean {
        const packageTourMonths = [11, 0, 1, 2]
        const stayOverDays = [0, 2, 4, 6]

        for (let packageSeasonMonth of packageTourMonths) {
            if (dateToBeChecked.month() == packageSeasonMonth) {

                for (let changingDay of stayOverDays) {

                    if (dateToBeChecked.day() == changingDay) {
                        return true
                    }
                }

            }
        }
        return false
    }

    function checkIfDateFullyBooked(dateToBeChecked: Dayjs): boolean {
        return calendarState.fullyBookedDates.filter((date) => {
            return date.isSame(dateToBeChecked, 'date')
        }).length > 0
    }

    function checkIfDateIsPossibleDepartureDate(dateToBeChecked: Dayjs, arrivalDate: Dayjs | null): boolean {
        const nextFullyBookedDate = getNextFullyBookedDate(arrivalDate, calendarState.fullyBookedDates)
        return dateToBeChecked.isSame(nextFullyBookedDate, 'date')
    }

    function checkIfDateIsBeforeArrivalDate(dateToBeChecked: Dayjs, arrivalDate: Dayjs | null): boolean {
        return dateToBeChecked.isBefore(arrivalDate, 'date') || dateToBeChecked.isSame(arrivalDate, 'date')
    }

    function getNextFullyBookedDate(arrivalDate: Dayjs | null, fullyBookedDates: Dayjs[]): Dayjs | null {

        if (arrivalDate !== null) {
            for (let fullyBookedDate of fullyBookedDates) {
                if (fullyBookedDate.isAfter(arrivalDate)) {
                    return fullyBookedDate
                }
            }
        }
        return null
    }


    function getFullyBookedDatesFromServiceAvailability(accommodationServiceAvailability: ServiceAvailability): Dayjs[] {

        return accommodationServiceAvailability.TimeUnitStartsUtc.filter((timeUnit, index) => {
            let totalAvailability = 0
            accommodationServiceAvailability.CategoryAvailabilities.forEach((category) => {
                totalAvailability += category.Availabilities[index]
            })
            if (totalAvailability == 0) {
                return true
            }
        }).map((filteredDay) => dayjs(filteredDay).add(dayjs(filteredDay).utcOffset(), 'minutes').utc())
    }
}

export default Calendar


export interface CalendarState {
    isLoading: boolean,
    fullyBookedDates: Dayjs[],
    selectedMonth: Dayjs,
    selectedDateRange: {
        arrival: Dayjs | null,
        departure: Dayjs | null
    },
    maxDate: Dayjs | null
}

const initialCalendarState: CalendarState = {
    isLoading: true,
    fullyBookedDates: [],
    selectedMonth: dayjs().startOf('month'),
    selectedDateRange: {
        arrival: null,
        departure: null
    },
    maxDate: null
}