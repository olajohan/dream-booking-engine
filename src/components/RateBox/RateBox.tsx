import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, CircularProgress, Divider, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPricing } from "../../api/mewsApi";
import { IRoomCategoryRate } from "../../domain/IRoomCategoryRate";
import { IStaySearch, selectStaySearch } from "../../state/staySearch/staySearchSlice";
import { AppDispatch, RootState } from "../../state/store";
import { ISettings, selectSettings } from '../../state/settings/settingsSlice';
import { IReservation } from '../../domain/IReservation';
import { addReservation, removeReservation } from '../../state/reservation/reservationSlice';
import { IStayOccupancy } from '../../state/stayOccupancy/stayOccupancySlice';


export interface IRateBoxProps {
    rate: IRoomCategoryRate;
    index: number;
    roomCategoryMaxAdults: number;
    roomCategoryId: string;
    availableRoomCount: number;
    adults: number;
    handleAddReservation: (reservation: IReservation) => void;
}

export default function RateBox({ rate, index = 0, roomCategoryMaxAdults, availableRoomCount, roomCategoryId, adults, handleAddReservation }: IRateBoxProps) {

    const settings = useSelector<RootState>(state => selectSettings(state)) as ISettings
    const [pricePerNight, setPricePerNight] = useState(rate.pricePerNight[settings.currencyCode])
    const [priceIsLoading, setPriceIsLoading] = useState(false)
    const search = useSelector<RootState>(state => selectStaySearch(state)) as IStaySearch
    const stayOccupancy = useSelector<RootState>(state => state.stayOccupancy) as IStayOccupancy[]
    const reservations = useSelector<RootState>(state => state.reservations) as IReservation[]

    const FORMATTER = Intl.NumberFormat((settings.languageCode), { style: 'currency', currency: settings.currencyCode })

    useEffect(() => {

        setPriceIsLoading(true)

        if (search.selectedDateRange[0] === null || search.selectedDateRange[1] === null) {
            throw new Error('Date range is not set when trying to get pricing for rate box')
        }

        getPricing({
            startDateISOString: search.selectedDateRange[0],
            endDateISOString: search.selectedDateRange[1],
            categoryIds: [roomCategoryId],
            occupancy: adults,
            currencyCode: settings.currencyCode,
        }, rate.id
        ).then(pricing => {
            setPricePerNight(pricing.averagePricePerNight)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setPriceIsLoading(false)
        })
    }, [adults, settings.currencyCode])

    return (
        <Grid container spacing={2} key={rate.id} marginBottom={2} direction="row" alignItems="center" justifyContent="center">
            {index !== 0 && <Grid item xs={12}><Divider></Divider></Grid>}

            <Grid item xs={6} md={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12} minHeight={40}>
                        <Typography variant={'h6'}>{rate.name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'body1'}>{rate.description}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6} md={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant={'h6'}>Adults</Typography>
                    </Grid>
                    <Grid item xs={12} minHeight={40}>
                        <Typography display={'inline'} variant={'body1'}> {adults} </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6} md={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant={'h6'}>Price</Typography>
                    </Grid>
                    <Grid item xs={12} minHeight={40}>
                        {priceIsLoading && <CircularProgress size={20} />}
                        {!priceIsLoading && <Typography variant={'body1'}>{FORMATTER.format(pricePerNight)} per night</Typography>}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6} md={3}>
                <Grid container>
                    <Grid item xs={12}>
                        <Button 
                            variant={'contained'}
                            onClick={() => handleAddReservation({
                                roomCategoryId: roomCategoryId,
                                startUTC: search.selectedDateRange[0] as string,
                                endUTC: search.selectedDateRange[1] as string,
                                voucherCode: '',
                                rateId: rate.id,
                                adultCount: adults,
                                productIds: [],
                                notes: ''
                            })}
                        >Reserve</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    )
}