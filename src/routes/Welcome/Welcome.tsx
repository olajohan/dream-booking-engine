import { Button, Grid, Typography } from "@mui/material";
import PaperItem from "../../components/PaperItem/PaperItem";
import { Link as RouterLink } from 'react-router-dom'


export default function Welcome() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <PaperItem>
                    <Grid container justifyContent={'center'}>
                        <Grid item md={6}>
                            <Grid item lg={12} marginBottom={2}>
                                <Typography variant="h2">
                                    Welcome!
                                </Typography>
                                <Typography variant="subtitle1">
                                    To the Lyngen North booking engine.
                                </Typography>
                            </Grid>
                            <Grid item lg={12} marginBottom={2}>
                                <Typography variant="body1">
                                    We'd like to help you customize your stay and get all the fine details right from the start.
                                    Therefore we'll take this step by step, one piece of information at a time.
                                </Typography>
                            </Grid>
                            <Grid item lg={12} marginBottom={2}>
                                <Button variant="contained" color="primary" fullWidth to='/stay/search' component={RouterLink}>
                                    Start your booking
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </PaperItem>
            </Grid>
        </Grid>
    )
}