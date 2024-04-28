import { Button, Grid, Typography } from "@mui/material";
import ReactImageGallery from "react-image-gallery";
import { IRoomCategoryWithAvailability } from "../../domain/IRoomCategoryWithAvailability";
import PaperItem from "../PaperItem/PaperItem";
import RateBox from "../RateBox/RateBox";

export interface IRoomCategoryWithAvailabilityCardProps {
    roomCategory: IRoomCategoryWithAvailability
}

export default function RoomCategoryWithAvailabilityCard(props: IRoomCategoryWithAvailabilityCardProps) {

    const { roomCategory } = props;

    // Make card grayscale if not available
    const cardFilter = roomCategory.availableRoomCount === 0 ? 'grayscale(100%)' : 'none';

    return (
        <Grid item xs={12} key={roomCategory.id}>
            <PaperItem elevation={5}>
                <Grid container spacing={2} sx={{ filter: cardFilter }}>
                    <Grid item xs={12} md={6}>
                        <ReactImageGallery
                            items={roomCategory.imageUrls.map(url => ({ original: `${url}?width=800&height=600&mode=5` }))}
                            showPlayButton={false}
                            showFullscreenButton={false}
                            showNav={true}
                            showBullets={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant={'h4'}>{roomCategory.name}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant={'body1'}>{roomCategory.description}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {roomCategory.rates.length !== 0 &&

                    <Grid container spacing={2} marginTop={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={2} marginBottom={2}>
                                <Grid item xs={12}>
                                    <Typography variant={'h4'}>Available Rates</Typography>
                                </Grid>
                            </Grid>
                            <PaperItem elevation={3}>
                                {roomCategory.rates.map((rate, index) => {
                                    return <RateBox
                                        rate={rate}
                                        index={index}
                                        roomCategoryMaxAdults={roomCategory.maxOccupancy}
                                        roomCategoryId={roomCategory.id}
                                        key={rate.id}
                                    />
                                })}
                            </PaperItem>
                        </Grid>
                    </Grid>
                }
                {roomCategory.rates.length === 0 &&
                    <Grid container spacing={2} marginTop={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={2} marginBottom={2}>
                                <Grid item xs={12}>
                                    <Typography variant={'h4'}>Not available on the selected dates</Typography>
                                    <Button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} variant="contained" color="warning">Change dates</Button>
                                </Grid>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                }
            </PaperItem>
        </Grid>
    )
}