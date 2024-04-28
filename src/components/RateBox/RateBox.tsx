import { Grid, Divider, Typography, IconButton, Button, CircularProgress, LinearProgress } from "@mui/material";
import { IRate } from "../../domain/IRate";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from "react";
import { getPricing } from "../../api/mewsApi";
import { RootState } from "../../state/store";
import { useSelector } from "react-redux";
import { IStaySearch, selectStaySearch } from "../../state/staySearch/staySearchSlice";
import dayjs from "dayjs";


export interface IRateBoxProps {
    rate: IRate;
    index: number;
    roomCategoryMaxAdults: number;
    roomCategoryId: string;
}

export default function RateBox({ rate, index = 0, roomCategoryMaxAdults, roomCategoryId }: IRateBoxProps) {

    const [adults, setAdults] = useState(rate.numberOfAdults)
    const [pricePerNight, setPricePerNight] = useState(rate.pricePerNight.NOK)
    const [priceIsLoading, setPriceIsLoading] = useState(false)
    const search = useSelector<RootState>(state => selectStaySearch(state)) as IStaySearch

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
            rateId: rate.id
        }).then(pricing => {
            setPricePerNight(pricing.averagePricePerNight)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setPriceIsLoading(false)
        })
    }, [adults])

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
                        <IconButton size="small" color="secondary" onClick={handleRemovePerson} disabled={shouldDisableRemoveButton()}>
                            <RemoveIcon />
                        </IconButton>
                        <Typography display={'inline'} variant={'body1'}> {adults} </Typography>
                        <IconButton size="small" color="primary" onClick={handleAddPerson} disabled={shouldDisableAddButton()}>
                            <AddIcon />
                        </IconButton>
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
                        {!priceIsLoading && <Typography variant={'body1'}>{pricePerNight} NOK per night</Typography>}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6} md={3}>
                <Grid container>
                    <Grid item xs={12}>
                        <Button variant={'contained'}>Reserve</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

    function handleAddPerson() {

        setAdults(adults + 1)
    }

    function handleRemovePerson() {
        setAdults(adults - 1)
    }

    function shouldDisableRemoveButton() {
        return adults === 1
    }

    function shouldDisableAddButton() {
        return adults >= roomCategoryMaxAdults
    }
}