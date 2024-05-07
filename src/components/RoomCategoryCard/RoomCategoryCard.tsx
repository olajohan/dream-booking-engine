import { Grid, Typography } from "@mui/material";
import ReactImageGallery from "react-image-gallery";
import { useSelector } from "react-redux";
import { IApiHotel, IApiRoomCategory } from "../../api/IApiHotel";
import { RootState } from "../../state/store";
import PaperItem from "../PaperItem/PaperItem";

export interface IRoomCategoryWithAvailabilityCardProps {
    roomCategory: IApiRoomCategory
}

export default function RoomCategoryWithAvailabilityCard(props: IRoomCategoryWithAvailabilityCardProps) {

    const hotel = useSelector<RootState>(state => state.hotelState.hotel) as IApiHotel
    

    const { roomCategory } = props;
    return (
        <Grid item xs={12} key={roomCategory.Id}>
            <PaperItem elevation={5}>
                <Grid container spacing={2}>
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
            </PaperItem>
        </Grid>
    )
}