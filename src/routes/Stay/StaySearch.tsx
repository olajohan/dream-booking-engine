import { Button, Grid, Typography } from "@mui/material"
import { DateRange } from "@mui/x-date-pickers-pro"
import dayjs, { Dayjs } from "dayjs"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IHotel, RoomCategory } from "../../api/IHotel"
import { IHotelAvailability } from "../../api/IHotelAvailability"
import GlobalSpinner from "../../components/GlobalSpinner/GlobalSpinner"
import OccupancyModal from "../../components/OccupancyModal/OccupancyModal"
import PaperItem from "../../components/PaperItem/PaperItem"
import RoomSelector from "../../components/RoomSelector/RoomSelector"
import StaticBookingCalendar from "../../components/StaticBookingCalendar/StaticBookingCalendar"
import { selectHotel } from "../../state/hotel/hotelSlice"
import { IStaySearch, clearSelectedDateRange, selectStaySearch, setSelectedDateRange } from "../../state/staySearch/staySearchSlice"
import { IStayOccupancy, selectRoomsOccupancy } from "../../state/stayOccupancy/stayOccupancySlice"
import { AppDispatch, RootState } from "../../state/store"
import "./imageGallery.css"
import { IGetHotelAvailabilityRequest, getHotel, getHotelAvailability } from "../../api/mewsApi"
import ReactImageGallery from "react-image-gallery"
import SearchResultCard from "../../components/SearchResultCard/SearchResultCard"

interface IStaySearchResultState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null,
  result: IHotelAvailability | null,
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
      console.log('searching for rooms')
      setSearchResultState({ error: null, status: 'loading', result: null })
      getHotelAvailability({
        startDateISOString: search.selectedDateRange[0],
        endDateISOString: search.selectedDateRange[1],
        occupancy: stayOccupancy.reduce((acc, room) => acc + room.occupancy, 0),
        categoryIds: search.selectedRoomCategories,
      } as IGetHotelAvailabilityRequest

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

                      <Typography variant={'body1'}>Select dates and room categories to see available rooms</Typography>
                    
                    }
                    {searchResultState.status === 'loading' && <GlobalSpinner />}
                    {searchResultState.status === 'failed' && <Typography variant={'body1'}>Failed to load rooms</Typography>}
                    {searchResultState.status === 'succeeded' &&
                      [...hotel.RoomCategories].sort((a, b) => sortRoomCategoryResult(a, b, searchResultState.result))
                        .filter(room => search.selectedRoomCategories.includes(room.Id)).map((roomCategory) => {
                          return (
                            <SearchResultCard
                              description={roomCategory.Description["en-US"]}
                              id={roomCategory.Id}
                              imageUrls={roomCategory.ImageIds.map(imageId => `${hotel.ImageBaseUrl}/${imageId}`)}
                              name={roomCategory.Name["en-US"]}
                              availablity={getRoomAvailabilityFromResult(roomCategory.Id, searchResultState.result)}
                            />
                          )
                        })

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

  function getRoomAvailabilityFromResult(roomCategoryId: string, availabilityResult: IHotelAvailability | null) {
    return availabilityResult?.RoomCategoryAvailabilities.find(roomCategoryAvailability => roomCategoryAvailability.RoomCategoryId === roomCategoryId)?.AvailableRoomCount?? 0
  }

  /**
   * Sorts the result so that the room categories with available rooms are shown first and the rest are sorted by their ordering.
   * @param a RoomCategory
   * @param b RoomCategory
   * @returns 
   */
  function sortRoomCategoryResult(a: RoomCategory, b: RoomCategory, availabilityResult: IHotelAvailability | null) {
    if (availabilityResult === null) {
      return 0
    }
    const aAvailableRoomCount = availabilityResult.RoomCategoryAvailabilities.find((roomCategoryAvailability) => {
      return roomCategoryAvailability.RoomCategoryId === a.Id
    })?.AvailableRoomCount ?? 0

    const bAvailableRoomCount = availabilityResult.RoomCategoryAvailabilities.find((roomCategoryAvailability) => {
      return roomCategoryAvailability.RoomCategoryId === b.Id
    })?.AvailableRoomCount ?? 0

    if (aAvailableRoomCount === bAvailableRoomCount) {
      return 0;
    } else if (aAvailableRoomCount === 0) {
      return 1;
    } else if (bAvailableRoomCount === 0) {
      return -1;
    } else {
      return a.Ordering - b.Ordering;
    }
  }
}
