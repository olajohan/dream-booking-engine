import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import RoomCard from '../components/RoomCard'
import { rooms } from '../data/rooms.data'
import Item from '../components/PaperItem'
import Calendar from '../components/Calendar';
import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs'
import { getHotelAvailability } from '../api';
import { AccommodationAvailability } from '../api/AccommodationAvailability.interface';

function Rooms() {

  const [selectedDateRange, setSelectedDateRange] = useState<DateRange<Dayjs>>()
  const [accommodationAvailability, setAccommodationAvailability] = useState<AccommodationAvailability>()

  const setSelectedDateRangeHandler = (dateRange: DateRange<Dayjs> | undefined) => {
      setSelectedDateRange(dateRange)
  }

  useEffect(() => {
    const arrivalDate = selectedDateRange?.[0]
    const departureDate = selectedDateRange?.[1]

    if (arrivalDate && departureDate) {
      getHotelAvailability(arrivalDate, departureDate).then((availability) => setAccommodationAvailability(availability))
    }
  }, [selectedDateRange])

  const CalendarOrSelectedDates = () => {
    if (selectedDateRange === undefined) {
      return (
        <Calendar setSelectedDateRange={setSelectedDateRangeHandler} />
      )
    } else {
      return (
        <Grid item>
          <h3>Arrival date:<br /> {selectedDateRange?.[0]?.toString()}</h3>
          <h3>Departure date:<br /> {selectedDateRange?.[1]?.toString()}</h3>
          <Button onClick={() => { setSelectedDateRangeHandler(undefined) }}>Clear</Button>
        </Grid>
      )
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item md={12} xs={12} lg={4}>
        <Item>
          <CalendarOrSelectedDates />
        </Item>
      </Grid>
      <Grid item md={12} xs={12} lg={8}>
        <Item>
          <Grid container spacing={2}>
            {rooms.map((room) => 
            <Grid item key={room.id} lg={6}>
              <RoomCard {...room}/>
            </Grid>
            )}
          </Grid>
        </Item>
      </Grid>

    </Grid>
  )
}

export default Rooms;
