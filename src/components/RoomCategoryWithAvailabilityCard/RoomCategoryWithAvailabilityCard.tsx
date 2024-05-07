import { Button, Grid, Typography } from "@mui/material";
import ReactImageGallery from "react-image-gallery";
import { IRoomCategoryWithAvailability } from "../../domain/IRoomCategoryWithAvailability";
import PaperItem from "../PaperItem/PaperItem";
import RateBox from "../RateBox/RateBox";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { IApiHotel } from "../../api/IApiHotel";
import { IReservation } from "../../domain/IReservation";
import { IStayOccupancy } from "../../state/stayOccupancy/stayOccupancySlice";
import { useRef } from "react";

export interface IRoomCategoryWithAvailabilityCardProps {
    roomCategory: IRoomCategoryWithAvailability;
    handleAddReservation: (reservation: IReservation) => void;
    adults: number;
}

export default function RoomCategoryWithAvailabilityCard(props: IRoomCategoryWithAvailabilityCardProps) {

    const { roomCategory, handleAddReservation, adults } = props;
    const hotel = useSelector<RootState>(state => state.hotelState.hotel) as IApiHotel
    const reservations = useSelector<RootState>(state => state.reservations) as IReservation[]
    const stayOccupancy = useSelector<RootState>(state => state.stayOccupancy) as IStayOccupancy[]

    // Make card grayscale if not available
    const totalAvailableRooms = roomCategory.availableRoomCount - reservations.filter(reservations => reservations.roomCategoryId === roomCategory.Id).length

    const cardFilter = totalAvailableRooms === 0 ? 'grayscale(100%)' : 'none';

    return (
        <Grid item xs={12} key={roomCategory.Id}>
            <PaperItem elevation={5}>
                <Grid container spacing={2} sx={{ filter: cardFilter }}>
                    <Grid item xs={12} md={6}>
                        <ReactImageGallery
                            items={roomCategory.ImageIds.map(imageId => ({ original: `${hotel.ImageBaseUrl}/${imageId}?width=800&height=600&mode=5` }))}
                            showPlayButton={false}
                            showFullscreenButton={false}
                            showNav={true}
                            showBullets={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant={'h4'}>{roomCategory.Name['en-US']}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant={'body1'}>{roomCategory.Description['en-US']}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {totalAvailableRooms !== 0 && 
                roomCategory.NormalBedCount >= adults &&

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
                                        adults={adults}
                                        roomCategoryMaxAdults={roomCategory.NormalBedCount}
                                        roomCategoryId={roomCategory.Id}
                                        key={rate.id}
                                        availableRoomCount={roomCategory.availableRoomCount}
                                        handleAddReservation={handleAddReservation}
                                    />
                                })}
                            </PaperItem>
                        </Grid>
                    </Grid>
                }
                {roomCategory.availableRoomCount === 0 &&
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

                {roomCategory.availableRoomCount > 0 && totalAvailableRooms === 0 &&
                    <Grid container spacing={2} marginTop={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={2} marginBottom={2}>
                                <Grid item xs={12}>
                                    <Typography variant={'h4'}>You have selected all available rooms of this type</Typography>
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