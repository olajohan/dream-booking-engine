import { useSelector } from "react-redux"
import { IApiHotel } from "../../api/IApiHotel"
import { IReservation } from "../../domain/IReservation"
import { ISettings } from "../../state/settings/settingsSlice"
import { RootState } from "../../state/store"
import { Button, Checkbox, Divider, FormControlLabel, FormGroup, Grid, Typography } from "@mui/material"
import PaperItem from "../../components/PaperItem/PaperItem"
import ReactImageGallery from "react-image-gallery"

const MEALS_CATEGORY = '0c8ab6ea-0c25-4a8d-8ce8-b13500c10d6e'
const VEGAN_MEALS_CATEGORY = '063b510d-73dc-42cc-a755-b16a00c45e28'
const LUNCH_PRODUCT_ID = 'c578d2dc-70f6-4075-84f3-b13500c2eddb'

export default function StayMeals() {

    const reservations = useSelector<RootState>(state => state.reservations) as IReservation[]
    const hotel = useSelector<RootState>(state => state.hotelState.hotel) as IApiHotel
    const settings = useSelector<RootState>(state => state.settings) as ISettings
    const FORMATTER = Intl.NumberFormat((settings.languageCode), { style: 'currency', currency: settings.currencyCode })

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PaperItem>
                    <Grid container justifyContent={'center'}>
                        <Grid item md={6}>
                            <Grid item lg={12} marginBottom={2}>
                                <Typography variant="h2">
                                    Meals
                                </Typography>
                                <Typography variant="subtitle1">
                                    Select the mealplan for your group
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </PaperItem>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {reservations.map((reservation, index) => {
                        return (
                            <Grid item xs={12} key={index}>
                                <PaperItem>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="h4">
                                                Room {index + 1}: {hotel.RoomCategories.find(roomCategory => roomCategory.Id === reservation.roomCategoryId)?.Name[settings.languageCode]}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <ReactImageGallery
                                                        items={[
                                                            { original: `${hotel.ImageBaseUrl}/${hotel.RoomCategories.find(roomCategory => roomCategory.Id === reservation.roomCategoryId)?.ImageIds[0]}?width=250&height=250&mode=6` }
                                                        ]}
                                                        showPlayButton={false}
                                                        showFullscreenButton={false}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={8}>
                                            {[...Array(reservation.adultCount)].map((_, index) => {
                                                return (
                                                    <Grid container >
                                                        {index !== 0 && <Grid item xs={12} marginTop={2} marginBottom={2}><Divider></Divider></Grid>}
                                                        <Grid item xs={12}>
                                                            <Grid container>
                                                                <Grid item xs={12}>
                                                                    <Typography variant="h6" textAlign={'left'}>
                                                                        Person {index + 1}
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container>
                                                                <Grid item xs={12}>
                                                                    <FormGroup row>
                                                                        <FormControlLabel control={<Checkbox value={'vegan'} />} label="Vegan" />
                                                                    </FormGroup>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <FormGroup row>
                                                                        <FormControlLabel control={<Checkbox defaultChecked disabled value={'dinner'} />} label="3-course dinner" />
                                                                        <FormControlLabel control={<Checkbox defaultChecked disabled value={'breakfast'} />} label="Breakfast" />
                                                                        <FormControlLabel control={<Checkbox value={'lunch'} />} label={`Lunch (+ ${FORMATTER.format(hotel.Products.find(product => product.Id === LUNCH_PRODUCT_ID)?.Prices[settings.currencyCode]?? 0)} per day)`} />
                                                                    </FormGroup>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                                    </Grid>
                                </PaperItem>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <PaperItem>
                    <Grid container justifyContent={'center'}>
                        <Grid item xs={12} md={6}>
                            <Grid item lg={12} marginBottom={2}>
                                <Button fullWidth variant="contained" color="primary">
                                    Continue
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </PaperItem>
            </Grid>
        </Grid>
    )
}