import { CircularProgress, styled } from "@mui/material";
import {
    DateRange,
    DateRangePickerDayProps,
    LocalizationProvider,
    DateRangePickerDay as MuiDateRangePickerDay,
    StaticDateRangePicker,
    pickersLayoutClasses
} from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from "react";
import { IApiServiceAvailability } from "../../api/IApiServiceAvailability";
import { IGeneralApiRequest, getStayServiceAvailability } from "../../api/mewsApi";
import { IStayOccupancy } from "../../state/stayOccupancy/stayOccupancySlice";
import { IStaySearch } from "../../state/staySearch/staySearchSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { IApiHotel } from "../../api/IApiHotel";
import { IHotel } from "../../domain/IHotel";

dayjs.extend(utc);
dayjs.extend(updateLocale)
dayjs.updateLocale('en', { weekStart: 1, })


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
        className,
        isPreviewing,
        selected,
        day,
        disabled
    }) => ({

        ...(disabled &&
            !isStartOfPreviewing &&
            !isPreviewing && {
            background: 'rgba(255, 0, 0, 0.2)',
        }),

        ...((day.month() == 11 || day.month() == 0 || day.month() == 1 || day.month() == 2) &&
            (day.day() == 0 || day.day() == 2 || day.day() == 4 || day.day() == 6) &&
            !isStartOfPreviewing &&
            !isPreviewing &&
        {
            background: 'rgba(255, 244, 0, 0.2)'
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

export interface IInputCalendarProps {
    selectedRoomOccupancy: IStayOccupancy[]
    staySearch: IStaySearch
    handleOnChange: (dateRange: DateRange<Dayjs>) => void
}

export default function StaticBookingCalendar(props: IInputCalendarProps) {

    const {
        selectedRoomOccupancy,
        staySearch,
        handleOnChange
    } = props

    const [isLoading, setIsLoading] = useState(true)
    const [fullyBookedDates, setFullyBookedDates] = useState<Dayjs[]>([])
    const [maxDate, setMaxDate] = useState<Dayjs | null>(null)
    const [selectedMonth, setSelectedMonth] = useState(dayjs())
    const hotel = useSelector<RootState>((state) => state.hotelState.hotel) as IHotel

    useEffect(() => {
        setIsLoading(true)
        updateFullyBookedDates()
    }, [selectedMonth, staySearch.selectedRoomCategories, selectedRoomOccupancy])

    useEffect(() => {
        updateMaxDate(dayjs(staySearch.selectedDateRange[0]), fullyBookedDates)
        return () => { setIsLoading(false) }
    }, [staySearch.selectedDateRange, fullyBookedDates])


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDateRangePicker
                calendars={1}
                sx={{

                    [`.${pickersLayoutClasses.contentWrapper} `]: {
                        justifyContent: 'center',
                        margin: '0 auto !important',
                    },
                    [`.MuiPickersCalendarHeader-label`]: {
                        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                        fontSize: '1.25rem',
                        letterSpacing: '0.0075em',
                    },
                    [`.${pickersLayoutClasses.actionBar}`]: {
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '0 16px',
                    },
                    [`.MuiPickersCalendarHeader-root`]: {
                        textAlign: 'center',
                        marginTop: 0
                    },

                }}
                disablePast={true}
                showDaysOutsideCurrentMonth={true}
                loading={isLoading}
                maxDate={maxDate ?? undefined}
                timezone='UTC'
                displayWeekNumber={true}
                disableHighlightToday={true}
                rangePosition={staySearch.selectedDateRange[0] ? 'end' : 'start'}

                disableAutoMonthSwitching={true}
                onMonthChange={handleCalendarOnMonthChange}
                onChange={handleOnChange}
                value={[
                    dayjs(staySearch.selectedDateRange[0]),
                    dayjs(staySearch.selectedDateRange[1])
                ]}
                shouldDisableDate={handleCalendarShouldDisableDate}
                renderLoading={() => <CircularProgress />}
                slotProps={{
                    actionBar: { actions: ['clear'] },
                    toolbar: { hidden: true }
                }}
                slots={{
                    day: DateRangePickerDay,
                }}

            />
        </LocalizationProvider>
    )

    function handleCalendarOnMonthChange(month: Dayjs) {
        setSelectedMonth(month)
    }

    async function updateFullyBookedDates() {
        const endDate = selectedMonth.add(1, 'month').endOf('month').startOf('date')
        const startDate = selectedMonth.subtract(1, 'month').startOf('month').startOf('date')
        const request = {
            startDateISOString: startDate.toISOString(),
            endDateISOString: endDate.toISOString(),
            categoryIds: staySearch.selectedRoomCategories,
        } as IGeneralApiRequest

        const serviceAvailability = await getStayServiceAvailability(request)
        const newListOfFullyBookedDates = getFullyBookedDatesFromServiceAvailability(serviceAvailability)

        setFullyBookedDates(newListOfFullyBookedDates)
    }

    function updateMaxDate(arrivalDate: Dayjs | null, fullyBookedDates: Dayjs[]) {
        setMaxDate(getNextFullyBookedDate(arrivalDate, fullyBookedDates))
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

    function getFullyBookedDatesFromServiceAvailability(accommodationServiceAvailability: IApiServiceAvailability): Dayjs[] {

        return accommodationServiceAvailability.TimeUnitStartsUtc.filter((timeUnit, index) => {
            let totalAvailability = 0
            let moreThanTwoBedAvailability = 0

            accommodationServiceAvailability.CategoryAvailabilities.forEach((category) => {
                totalAvailability += category.Availabilities[index]
                if (hotel.roomCategories.find(hotelCategory => hotelCategory.id === category.CategoryId && hotelCategory.maxOccupancy > 2)) {
                    moreThanTwoBedAvailability += category.Availabilities[index]
                }
            })

            if (totalAvailability <= 0 ||
                totalAvailability < selectedRoomOccupancy.length ||
                moreThanTwoBedAvailability < selectedRoomOccupancy.filter(occupancy => occupancy.occupancy > 2).length) {
                
                    return true
            }
        }).map((filteredDay) => dayjs(filteredDay).add(dayjs(filteredDay).utcOffset(), 'minutes').utc())
    }

    function handleCalendarShouldDisableDate(dateToBeChecked: Dayjs, position: 'start' | 'end'): boolean {
        const selectedArrivalDate = staySearch.selectedDateRange[0] ? dayjs(staySearch.selectedDateRange[0]) : null
        const isDateFullyBooked = checkIfDateFullyBooked(dateToBeChecked)
        const isBeforeArrivalDate = checkIfDateIsBeforeArrivalDate(dateToBeChecked, selectedArrivalDate)
        const isDatePossibleDepartureDate = checkIfDateIsPossibleDepartureDate(dateToBeChecked, selectedArrivalDate)
        const isStayOverDayInPackageTourSeason = checkIfStayOverDayInPackageTourSeason(dateToBeChecked)

        if (selectedArrivalDate !== null) {
            if (isBeforeArrivalDate) return true
            if (isDatePossibleDepartureDate) return false
        }
        return isDateFullyBooked || isStayOverDayInPackageTourSeason

    }

    function checkIfDateFullyBooked(dateToBeChecked: Dayjs): boolean {
        return fullyBookedDates.filter((date) => {
            return date.isSame(dateToBeChecked, 'date')
        }).length > 0
    }

    function checkIfDateIsPossibleDepartureDate(dateToBeChecked: Dayjs, arrivalDate: Dayjs | null): boolean {
        const nextFullyBookedDate = getNextFullyBookedDate(arrivalDate, fullyBookedDates)
        return dateToBeChecked.isSame(nextFullyBookedDate, 'date')
    }
}