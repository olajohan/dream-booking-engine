import { Grid, Typography } from "@mui/material";
import ReactImageGallery from "react-image-gallery";
import { IRoomCategory } from "../../domain/IRoomCategory";
import PaperItem from "../PaperItem/PaperItem";

export interface IRoomCategoryWithAvailabilityCardProps {
    roomCategory: IRoomCategory
}

export default function RoomCategoryWithAvailabilityCard(props: IRoomCategoryWithAvailabilityCardProps) {

    const { roomCategory } = props;
    return (
        <Grid item xs={12} key={roomCategory.id}>
            <PaperItem elevation={5}>
                <Grid container spacing={2}>
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
            </PaperItem>
        </Grid>
    )
}