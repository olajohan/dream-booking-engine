import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@mui/material"
import { DateRange } from "@mui/x-date-pickers-pro"
import dayjs, { Dayjs } from "dayjs"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IApiHotel } from "../../api/IApiHotel"
import { getRoomCategoriesAvailability } from "../../api/mewsApi"
import GlobalSpinner from "../../components/GlobalSpinner/GlobalSpinner"
import OccupancyModal from "../../components/OccupancyModal/OccupancyModal"
import PaperItem from "../../components/PaperItem/PaperItem"
import RoomCategoryCard from "../../components/RoomCategoryCard/RoomCategoryCard"
import RoomCategoryWithAvailabilityCard from "../../components/RoomCategoryWithAvailabilityCard/RoomCategoryWithAvailabilityCard"
import RoomSelector from "../../components/RoomSelector/RoomSelector"
import StaticBookingCalendar from "../../components/StaticBookingCalendar/StaticBookingCalendar"
import { IReservation } from "../../domain/IReservation"
import { IRoomCategoryWithAvailability } from "../../domain/IRoomCategoryWithAvailability"
import { selectHotel } from "../../state/hotel/hotelSlice"
import { addReservation, clearAllReservations } from "../../state/reservation/reservationSlice"
import { ISettings } from "../../state/settings/settingsSlice"
import { IStayOccupancy, selectRoomsOccupancy } from "../../state/stayOccupancy/stayOccupancySlice"
import { IStaySearch, clearSelectedDateRange, selectStaySearch, setSelectedDateRange } from "../../state/staySearch/staySearchSlice"
import { AppDispatch, RootState } from "../../state/store"
import "./imageGallery.css"

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
  const hotel = useSelector<RootState>(state => selectHotel(state)) as IApiHotel
  const stayOccupancy = useSelector<RootState>(state => selectRoomsOccupancy(state)) as IStayOccupancy[]
  const settings = useSelector<RootState>(state => state.settings) as ISettings
  const reservations = useSelector<RootState>(state => state.reservations) as IReservation[]
  const dispatch = useDispatch<AppDispatch>()

  const [searchResultState, setSearchResultState] = useState<IStaySearchResultState>(InitialSearchResultState)
  const [isOccupancyModalOpen, setIsOccupancyModalOpen] = useState(false)
  const [isResetDateRangeDialogOpen, setIsResetDateRangeDialogOpen] = useState(false)
  const [isResetRoomOccupancyDialogOpen, setIsResetRoomOccupancyDialogOpen] = useState(false)

  const roomRef = useRef<HTMLDivElement>(null)

  const executeScrollToRooms = () => {
    if (roomRef && roomRef.current) {
      roomRef.current.scrollIntoView({ behavior: 'smooth', block: 'start'})
    }
  }

  
  useEffect(() => {
    if (search.selectedDateRange[0] !== null && search.selectedDateRange[1] === null) {
      resetSearchAndReservations()
    }
  }, [search.selectedRoomCategories])

  useEffect(() => {
    if (search.selectedDateRange[0] !== null && search.selectedDateRange[1] !== null) {

      setSearchResultState({ error: null, status: 'loading', result: null })
      getRoomCategoriesAvailability({
        startDateISOString: search.selectedDateRange[0],
        endDateISOString: search.selectedDateRange[1],
        occupancy: stayOccupancy[reservations.length].occupancy,
        categoryIds: search.selectedRoomCategories,
        currencyCode: settings.currencyCode,
        languageCode: settings.languageCode
      }

      ).then((result) => { 
        setSearchResultState({ error: null, status: 'succeeded', result: result }) 
      }
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
                        <Button onClick={() => setIsResetRoomOccupancyDialogOpen(true)} variant={'text'}>Change</Button>
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
                              <Button onClick={() => setIsResetDateRangeDialogOpen(true)} variant={'text'}>Change</Button>
                            </Grid>
                          </Grid>
                        }
                      </Grid>
                    </Grid>
                  </PaperItem>
                </Grid>
                <Grid container spacing={2} marginTop={2} marginBottom={2}>
                  <Grid item xs={12} ref={roomRef}>
                    {searchResultState.status === 'succeeded' &&
                      <>
                        <Typography variant={'h2'}>Room {reservations.length + 1} of {stayOccupancy.length}</Typography>
                        <Typography variant={'body1'}>Only showing rooms that can accommodate {stayOccupancy[reservations.length].occupancy} {stayOccupancy[reservations.length].occupancy === 1? 'adult' : 'adults'}</Typography>
                      </>
                    }
                    {searchResultState.status === 'idle' &&
                      <Typography variant={'h2'}>Rooms</Typography>
                    }

                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {searchResultState.status === 'idle' &&
                      hotel.RoomCategories.filter((roomCategory) => search.selectedRoomCategories.includes(roomCategory.Id))
                        .map((roomCategory) => (<RoomCategoryCard roomCategory={roomCategory} key={roomCategory.Id} />))
                    }
                    {searchResultState.status === 'loading' && <GlobalSpinner />}
                    {searchResultState.status === 'failed' && <Typography variant={'body1'}>Failed to load rooms: {searchResultState.error}</Typography>}
                    {searchResultState.status === 'succeeded' &&
                      searchResultState.result?.toSorted(sortRoomCategoryResult)
                        .filter((roomCategory) => {
                          return search.selectedRoomCategories.includes(roomCategory.Id) && roomCategory.NormalBedCount >= stayOccupancy[reservations.length].occupancy
                        })
                        .map((roomCategory) => (<RoomCategoryWithAvailabilityCard key={roomCategory.Id} adults={stayOccupancy[reservations.length].occupancy} roomCategory={roomCategory} handleAddReservation={handleAddReservation} />))
                    }

                  </Grid>
                </Grid>
              </Grid>

            </Grid>
          </Grid>
        </PaperItem>
      </Grid>

      <Dialog
        open={isResetDateRangeDialogOpen}
        onClose={handleOnCloseResetDateRangeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Reset search and reservations?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Changing the dates will reset your reservations and search results
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnCloseResetDateRangeDialog}>Cancel</Button>
          <Button onClick={handleOnConfirmResetDateRangeDialog} autoFocus>
            Reset
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isResetRoomOccupancyDialogOpen}
        onClose={handleOnCloseResetRoomOccupancyDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Reset search and reservations?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Changing room occupancy will reset your reservations and search results
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnCloseResetRoomOccupancyDialog}>Cancel</Button>
          <Button onClick={handleOnConfirmResetRoomOccupancyDialog} autoFocus>
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )

  function openRoomOccupancyModal() {
    setIsOccupancyModalOpen(true)
  }

  function handleAddReservation(roomReservation: IReservation) {
    
    if (reservations.length < stayOccupancy.length) {
      dispatch(addReservation(roomReservation))
      executeScrollToRooms()

    } else {
      console.log('Cannot add more reservations than there are rooms selected')
    }
  }

  function handleCloseOccupancyModal() {
    setIsOccupancyModalOpen(false)
  }

  function handleOnConfirmResetDateRangeDialog() {
    resetSearchAndReservations()
    setIsResetDateRangeDialogOpen(false)
  }

  function handleOnCloseResetDateRangeDialog() {
    setIsResetDateRangeDialogOpen(false)
  }

  function handleOnConfirmResetRoomOccupancyDialog() {
    resetSearchAndReservations()
    setIsResetRoomOccupancyDialogOpen(false)
    openRoomOccupancyModal()
  }

  function handleOnCloseResetRoomOccupancyDialog() {
    setIsResetRoomOccupancyDialogOpen(false)
  }

  function handleOnCalendarChange(dateRange: DateRange<Dayjs>) {
    const dateRangeISOString = [dateRange[0]?.toISOString() ?? null, dateRange[1]?.toISOString() ?? null]
    dispatch(setSelectedDateRange(dateRangeISOString))
  }

  function resetSearchAndReservations() {
    dispatch(clearSelectedDateRange())
    dispatch(clearAllReservations())
    setSearchResultState(InitialSearchResultState)
  }

  /**
   * Sorts the result so that the room categories with available rooms are shown first and the rest are sorted by their ordering.
   * @param a RoomCategory
   * @param b RoomCategory
   * @returns 
   */
  function sortRoomCategoryResult(a: IRoomCategoryWithAvailability, b: IRoomCategoryWithAvailability) {

    if (a.availableRoomCount === b.availableRoomCount && a.NormalBedCount === b.NormalBedCount) {
      return 0;
    } else if (a.availableRoomCount === 0 || a.NormalBedCount < stayOccupancy[reservations.length].occupancy) {
      return 1;
    } else if (b.availableRoomCount === 0 || b.NormalBedCount < stayOccupancy[reservations.length].occupancy) {
      return -1;
    } else {
      return a.Ordering - b.Ordering;
    }
  }
}
