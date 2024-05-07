import { Container, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";
import Appbar from '../components/Appbar/Appbar';
import GlobalSpinner from '../components/GlobalSpinner/GlobalSpinner';
import PaperItem from '../components/PaperItem/PaperItem';
import Stepper from '../components/Stepper/Stepper';
import { fetchHotel } from '../state/hotel/hotelSlice';
import { AppDispatch, RootState } from '../state/store';


function Root() {

    const dispatch = useDispatch<AppDispatch>()
    const hotelStatus = useSelector<RootState>(state => state.hotelState.status)

    useEffect(() => {
        if (hotelStatus === 'idle') {
            dispatch(fetchHotel())
        }
    }, [hotelStatus, dispatch])

    let content

    if (hotelStatus === 'loading') {
        content = (<GlobalSpinner />)
    } else if (hotelStatus === 'succeeded') {
        content = (
            <Container className='root-container' maxWidth="xl" style={{ backgroundColor: "#b3b3b3", padding: 0 }}>
                <Grid container>
                    <Grid container>
                        <Grid item xs={12}>
                            <Appbar />
                        </Grid>
                        <Grid item xs={12}>
                            <PaperItem>
                                <Stepper />
                            </PaperItem>
                        </Grid>
                    </Grid>
                    <Grid container padding={2}>
                        <Outlet />
                    </Grid>
                </Grid>
            </Container>
        )
    } else {
        content = (<h1>Error</h1>)
    }

    return (<>{content}</>)
}

export default Root