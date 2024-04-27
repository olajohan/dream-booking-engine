import { Grid, Typography } from "@mui/material"
import ReactImageGallery from "react-image-gallery"
import PaperItem from "../PaperItem/PaperItem"
import { Filter } from "@mui/icons-material";

export interface ISearchResultCardProps {
    name: string,
    id: string,
    description: string,
    imageUrls: string[],
    availablity?: number,
}

export default function SearchResultCard(props: ISearchResultCardProps) {

    const {
        name,
        id,
        description,
        imageUrls,
        availablity
    } = props;

    // Make card grayscale if not available
    const cardFilter = availablity === 0 ? 'grayscale(100%)' : 'none';

    return (
        <Grid item xs={12} key={id} sx={{ filter: cardFilter }}>
            <PaperItem elevation={5}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <ReactImageGallery
                            items={imageUrls.map(url => ({ original: `${url}?width=800&height=600&mode=5` }))}
                            showPlayButton={false}
                            showFullscreenButton={false}
                            showNav={true}
                            showBullets={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant={'h4'}>{name}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant={'body1'}>{description}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant={'body1'}>Availability: {availablity}</Typography>
                    </Grid>
                </Grid>
            </PaperItem>
        </Grid>
    )
}