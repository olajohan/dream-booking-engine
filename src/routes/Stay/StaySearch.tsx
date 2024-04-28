import { Button, Grid, Typography } from "@mui/material"
import { DateRange } from "@mui/x-date-pickers-pro"
import dayjs, { Dayjs } from "dayjs"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IApiRoomCategory } from "../../api/IApiHotel"
import { IApiHotelAvailability } from "../../api/IApiHotelAvailability"
import { IHotelRequest, getRoomCategoriesAvailability } from "../../api/mewsApi"
import GlobalSpinner from "../../components/GlobalSpinner/GlobalSpinner"
import OccupancyModal from "../../components/OccupancyModal/OccupancyModal"
import PaperItem from "../../components/PaperItem/PaperItem"
import RoomSelector from "../../components/RoomSelector/RoomSelector"
import StaticBookingCalendar from "../../components/StaticBookingCalendar/StaticBookingCalendar"
import { IHotel } from "../../domain/IHotel"
import { IRoomCategoryWithAvailability } from "../../domain/IRoomCategoryWithAvailability"
import { selectHotel } from "../../state/hotel/hotelSlice"
import { IStayOccupancy, selectRoomsOccupancy } from "../../state/stayOccupancy/stayOccupancySlice"
import { IStaySearch, clearSelectedDateRange, selectStaySearch, setSelectedDateRange } from "../../state/staySearch/staySearchSlice"
import { AppDispatch, RootState } from "../../state/store"
import "./imageGallery.css"
import { Search } from "@mui/icons-material"
import RoomCategoryWithAvailabilityCard from "../../components/RoomCategoryWithAvailabilityCard/RoomCategoryWithAvailabilityCard"
import RoomCategoryCard from "../../components/RoomCategoryCard/RoomCategoryCard"

interface IStaySearchResultState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null,
  result: IRoomCategoryWithAvailability[] | null,
}

const InitialSearchResultState: IStaySearchResultState = {
  status: 'idle',
  error: null,
  result: null,
}

export default function StaySearch() {

  const search = useSelector<RootState>(state => selectStaySearch(state)) as IStaySearch
  const hotel = useSelector<RootState>(state => selectHotel(state)) as IHotel
  const stayOccupancy = useSelector<RootState>(state => selectRoomsOccupancy(state)) as IStayOccupancy[]
  const dispatch = useDispatch<AppDispatch>()

  const [searchResultState, setSearchResultState] = useState<IStaySearchResultState>(InitialSearchResultState)
  const [isOccupancyModalOpen, setIsOccupancyModalOpen] = useState(false)

  useEffect(() => {
    if (search.selectedDateRange[0] !== null && search.selectedDateRange[1] === null) {
      dispatch(clearSelectedDateRange())
    }
  }, [search.selectedRoomCategories])

  useEffect(() => {
    if (search.selectedDateRange[0] !== null && search.selectedDateRange[1] !== null) {

      setSearchResultState({ error: null, status: 'loading', result: null })
      getRoomCategoriesAvailability({
        startDateISOString: search.selectedDateRange[0],
        endDateISOString: search.selectedDateRange[1],
        occupancy: stayOccupancy.reduce((acc, room) => acc + room.occupancy, 0),
        categoryIds: search.selectedRoomCategories,
      } as IHotelRequest

      ).then(result => setSearchResultState({ error: null, status: 'succeeded', result: result })
      ).catch(error => setSearchResultState({ error: error.message, status: 'failed', result: null }))

    } else {
      setSearchResultState(InitialSearchResultState)
    }

  }, [search.selectedDateRange, search.selectedRoomCategories])

  return (
    <Grid container spacing={2} justifyContent={'center'}>
      <Grid item xs={12}>
        <PaperItem>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant={'h2'}>Search</Typography>
            </Grid>
            <Grid item xs={12} justifyContent={'center'}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <PaperItem elevation={5}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Typography variant={'h6'}>Occupancy</Typography>
                        <Typography variant={'body1'}>{stayOccupancy.reduce((acc, room) => acc + room.occupancy, 0)} persons / {stayOccupancy.length} {stayOccupancy.length > 1 ? 'rooms' : 'room'}</Typography>
                        <Button onClick={handleOpenOccupancyModal} variant={'text'}>Change</Button>
                        <OccupancyModal open={isOccupancyModalOpen} handleClose={handleCloseOccupancyModal} />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant={'h6'}>Rooms</Typography>
                        <RoomSelector />
                      </Grid>
                      <Grid item xs={12} md={4} minHeight={450}>

                        {search.selectedDateRange[1] === null &&
                          <StaticBookingCalendar
                            staySearch={search}
                            selectedRoomOccupancy={stayOccupancy}
                            handleOnChange={handleOnCalendarChange}
                          />
                        }
                        {search.selectedDateRange[1] !== null &&
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Typography variant={'h6'}>Selected dates</Typography>
                              <Typography variant={'body1'}>
                                {dayjs(search.selectedDateRange[0]).format('DD.MM.YYYY')} - {dayjs(search.selectedDateRange[1]).format('DD.MM.YYYY')}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Button onClick={() => dispatch(clearSelectedDateRange())} variant={'text'}>Change</Button>
                            </Grid>
                          </Grid>
                        }
                      </Grid>
                    </Grid>
                  </PaperItem>
                </Grid>
                <Grid container spacing={2} marginTop={2} marginBottom={2}>
                  <Grid item xs={12}>
                    <Typography variant={'h2'}>Rooms</Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {searchResultState.status === 'idle' && 
                      hotel.roomCategories.filter((roomCategory) => search.selectedRoomCategories.includes(roomCategory.id))
                      .map((roomCategory) => (<RoomCategoryCard roomCategory={roomCategory} key={roomCategory.id}/>))
                    }
                    {searchResultState.status === 'loading' && <GlobalSpinner />}
                    {searchResultState.status === 'failed' && <Typography variant={'body1'}>Failed to load rooms: {searchResultState.error}</Typography>}
                    {searchResultState.status === 'succeeded' &&
                      searchResultState.result?.toSorted(sortRoomCategoryResult)
                        .filter((roomCategory) => search.selectedRoomCategories.includes(roomCategory.id))
                        .map((roomCategory) => (<RoomCategoryWithAvailabilityCard key={roomCategory.id} roomCategory={roomCategory} />))
                    }
                    
                  </Grid>
                </Grid>
              </Grid>

            </Grid>
          </Grid>
        </PaperItem>
      </Grid>
    </Grid>
  )

  function handleOpenOccupancyModal() {
    dispatch(clearSelectedDateRange())
    setIsOccupancyModalOpen(true)
  }

  function handleCloseOccupancyModal() {
    setIsOccupancyModalOpen(false)
  }

  function handleOnCalendarChange(dateRange: DateRange<Dayjs>) {
    const dateRangeISOString = [dateRange[0]?.toISOString() ?? null, dateRange[1]?.toISOString() ?? null]
    dispatch(setSelectedDateRange(dateRangeISOString))
  }

  /**
   * Sorts the result so that the room categories with available rooms are shown first and the rest are sorted by their ordering.
   * @param a RoomCategory
   * @param b RoomCategory
   * @returns 
   */
  function sortRoomCategoryResult(a: IRoomCategoryWithAvailability, b: IRoomCategoryWithAvailability) {

    if (a.availableRoomCount === b.availableRoomCount) {
      return 0;
    } else if (a.availableRoomCount === 0) {
      return 1;
    } else if (b.availableRoomCount === 0) {
      return -1;
    } else {
      return a.sortOrder - b.sortOrder;
    }
  }
}
