import { Container } from '@mui/material'
import { Outlet } from "react-router-dom";
import Appbar from '../components/Appbar'
import { Grid } from '@mui/material'
import Stepper from '../components/Stepper'
import Item from '../components/PaperItem'
import { getHotel } from '../api';
import { Hotel } from '../api/Hotel.interface';
import { useEffect, useState } from 'react'
import { HotelContext, initialHotelContextState } from '../contexts/hotel';
import { AccommodationSearchProvider } from '../contexts/accommodationSearch';

function Root() {

    const [hotelContext, setHotelContext] = useState<Hotel>(initialHotelContextState)

    useEffect(() => {
        getHotel().then((hotel) => {
            setHotelContext(hotel)
        })
    }, [])

    return (
        <>
            <HotelContext.Provider value={hotelContext}>
                <AccommodationSearchProvider>
                    <Container className='root-container' maxWidth={false} style={{ backgroundColor: "#b3b3b3", margin: 0 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Appbar />
                            </Grid>
                            <Grid item xs={12} marginBottom={2}>
                                <Item>
                                    <Stepper />
                                </Item>
                            </Grid>
                        </Grid>
                        <Outlet />
                    </Container>
                </AccommodationSearchProvider>
            </HotelContext.Provider>
        </>)
}

export default Root