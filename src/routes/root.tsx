import { Container } from '@mui/material'
import { Outlet } from "react-router-dom";
import Appbar from '../components/Appbar'
import { Grid } from '@mui/material'
import Stepper from '../components/Stepper'
import Item from '../components/PaperItem'
import { getHotel } from '../api';
import { Hotel } from '../api/Hotel.interface';
import { useEffect, useState } from 'react'
import { HotelContext, defaultHotelContextObject } from '../context/hotel';

function Root() {

    const [hotelContext, setHotelContext] = useState<Hotel>(defaultHotelContextObject)

    useEffect(() => {
        getHotel().then((hotel) => {
            setHotelContext(hotel)
        })
    }, [])

    return (
        <>
            <HotelContext.Provider value={hotelContext}>
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
            </HotelContext.Provider>
        </>)
}

export default Root