import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import RoomCard from '../components/RoomCard'
import { rooms } from '../data/rooms.data'
import Item from '../components/PaperItem'
import Calendar from '../components/Calendar/Calendar';
import { getHotelAvailability } from '../api';
import { AccommodationAvailability } from '../api/AccommodationAvailability.interface';
import { useAccommodationSearchContext } from '../contexts/accommodationSearch';

function Rooms() {

  const [accommodationAvailability, setAccommodationAvailability] = useState<AccommodationAvailability>()
  const accommodationSearchState = useAccommodationSearchContext()

  useEffect(() => {
    if (accommodationSearchState.selectedDateRange.arrival && accommodationSearchState.selectedDateRange.departure) {

    }
  }, [accommodationSearchState.selectedDateRange])

  return (
    <Grid container spacing={2}>
      <Grid item md={12} xs={12} lg={4}>
        <Item>
          <Calendar />
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
