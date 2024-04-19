import { useContext, useEffect } from 'react'
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { pickersLayoutClasses } from '@mui/x-date-pickers/PickersLayout';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { DateRange } from '@mui/x-date-pickers-pro';
import utc from 'dayjs/plugin/utc';
import updateLocale from 'dayjs/plugin/updateLocale';
import { ServiceAvailability } from '../../api/ServiceAvailability.interface';
import { getAccommodationServiceAvailability } from '../../api';
import CircularProgress from '@mui/material/CircularProgress';
import {
    DateRangePickerDay as MuiDateRangePickerDay,
    DateRangePickerDayProps,
} from '@mui/x-date-pickers-pro/DateRangePickerDay';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { AccommodationSearchContext, AccommodationSearchDispatchContext, useAccommodationSearchContext, useAccommodationSearchDispatchContext } from '../../contexts/accommodationSearch';

dayjs.extend(utc);
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
    weekStart: 1,

})

const DateRangePickerDay = styled(MuiDateRangePickerDay)(
    ({
        theme,
        isHighlighting,
        isStartOfHighlighting,
        isEndOfHighlighting,
        outsideCurrentMonth,
        isFirstVisibleCell,
        isLastVisibleCell,
        isStartOfPreviewing,
        isPreviewing,
        selected,
        disabled
    }) => ({

        ...(disabled &&
            !isStartOfPreviewing &&
            !isPreviewing && {
            background: 'rgba(255, 0, 0, 0.2)',
        }),

        ...(isFirstVisibleCell && {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
        }),

        ...(isLastVisibleCell && {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
        }),

        ...(!outsideCurrentMonth &&
            isHighlighting && {
            borderRadius: 0,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            '&:hover, &:focus': {
                backgroundColor: theme.palette.primary.dark,
            },
        }),
        ...(isStartOfHighlighting && {
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
        }),
        ...(isEndOfHighlighting && {
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '50%',
        }),
    }),
) as React.ComponentType<DateRangePickerDayProps<Dayjs>>;


const Calendar: React.FC = () => {

    const dispatch = useAccommodationSearchDispatchContext()
    const accommodationSearchState = useAccommodationSearchContext()

    console.log(accommodationSearchState)

    // Fetch the fully booked dates for each selected month
    useEffect(() => {
        updateIsLoading(true)
        updateFullyBookedDates()
    }, [accommodationSearchState.selectedMonth, accommodationSearchState.selectedRoomTypes])

    useEffect(() => {
        updateMaxDate(accommodationSearchState.selectedDateRange.arrival, accommodationSearchState.fullyBookedDates)
        return () => { 
            updateIsLoading(false) 
        }
    }, [accommodationSearchState.fullyBookedDates, accommodationSearchState.selectedDateRange.arrival])

    return (
        <>
            <FormControl component="fieldset">
                <FormLabel component="legend"><b>Accommodation type</b></FormLabel>
                <br />
                <FormGroup aria-label="accommodation" row>
                    <FormControlLabel
                        control={<Checkbox onChange={handleOnRoomCheckboxChange} defaultChecked value='skySuite' />}
                        label="Sky Suite"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={handleOnRoomCheckboxChange} defaultChecked value="igloo180" />}
                        label="Igloo 180º"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={handleOnRoomCheckboxChange} defaultChecked value="igloo360" />}
                        label="Igloo 360º"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={handleOnRoomCheckboxChange} defaultChecked value="seaCabin" />}
                        label="Cabin"
                        labelPlacement="top"
                    />
                </FormGroup>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en'>
                <StaticDateRangePicker
                    disablePast={true}
                    displayWeekNumber={true}
                    showDaysOutsideCurrentMonth={true}
                    loading={accommodationSearchState.isLoading}
                    maxDate={accommodationSearchState.maxDate ? accommodationSearchState.maxDate : undefined}
                    timezone='UTC'
                    disableHighlightToday={true}
                    disableAutoMonthSwitching={true}
                    onMonthChange={handleCalendarOnMonthChange}
                    onChange={handleCalendarOnChange}
                    rangePosition={getRangePosition()}
                    value={[accommodationSearchState.selectedDateRange.arrival, accommodationSearchState.selectedDateRange.departure]}
                    shouldDisableDate={handleCalendarShouldDisableDate}
                    renderLoading={() => <CircularProgress />}
                    slotProps={{
                        toolbar: { hidden: true },
                        actionBar: { actions: ['clear'] },
                    }}
                    slots={{
                        day: DateRangePickerDay,
                    }}
                    sx={{
                        [`.${pickersLayoutClasses.contentWrapper}`]: {
                            alignItems: 'center',
                        }
                    }}
                />
            </LocalizationProvider>
        </>
    )

    function getRangePosition(): 'start' | 'end' {
        if (accommodationSearchState.selectedDateRange.arrival !== null &&
            accommodationSearchState.selectedDateRange.departure === null) {
            return 'end'
        } else {
            return 'start'
        }
    }

    async function updateFullyBookedDates() {
        const endDate = accommodationSearchState.selectedMonth.add(1, 'month').endOf('month').startOf('date')
        const startDate = accommodationSearchState.selectedMonth.subtract(1, 'month').startOf('month').startOf('date')
        const serviceAvailability = await getAccommodationServiceAvailability(startDate, endDate, accommodationSearchState.selectedRoomTypes)
        const newListOfFullyBookedDates = getFullyBookedDatesFromServiceAvailability(serviceAvailability)
        dispatch({
            type: 'update_fully_booked_dates',
            payload: {
                ...accommodationSearchState,
                fullyBookedDates: newListOfFullyBookedDates,
            }
        })
    }

    function updateMaxDate(arrivalDate: Dayjs | null, fullyBookedDates: Dayjs[]) {
        dispatch({
            type: 'update_max_date',
            payload: {
                ...accommodationSearchState,
                maxDate: getNextFullyBookedDate(arrivalDate, fullyBookedDates)
            }
        })
    }

    function clearSelectedRange() {
        dispatch({
            type: 'changed_selected_date_range',
            payload: {
                ...accommodationSearchState,
                selectedDateRange: {
                    arrival: null,
                    departure: null
                }
            }
        })
    }

    function updateIsLoading(isLoading: boolean) {
        dispatch({
            type: 'update_is_loading',
            payload: {
                ...accommodationSearchState,
                isLoading: isLoading
            }
        })
    }

    function handleOnRoomCheckboxChange(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
        clearSelectedRange()
        dispatch({
            type: 'update_room_checkbox',
            payload: {
                ...accommodationSearchState,
                selectedRoomTypes: {
                    ...accommodationSearchState.selectedRoomTypes,
                    [event.target.value]: checked
                }
            }
        }) 
    }

    function handleCalendarOnChange(dateRange: DateRange<Dayjs>) {
        dispatch({
            type: 'changed_selected_date_range',
            payload: {
                ...accommodationSearchState,
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
                ...accommodationSearchState,
                selectedMonth: month
            }
        })
    }

    function handleCalendarShouldDisableDate(dateToBeChecked: Dayjs, position: 'start' | 'end'): boolean {
        const arrivalDate = accommodationSearchState.selectedDateRange.arrival
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
        return accommodationSearchState.fullyBookedDates.filter((date) => {
            return date.isSame(dateToBeChecked, 'date')
        }).length > 0
    }

    function checkIfDateIsPossibleDepartureDate(dateToBeChecked: Dayjs, arrivalDate: Dayjs | null): boolean {
        const nextFullyBookedDate = getNextFullyBookedDate(arrivalDate, accommodationSearchState.fullyBookedDates)
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