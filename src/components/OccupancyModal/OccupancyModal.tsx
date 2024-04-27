import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Modal, Select, Typography, useTheme } from "@mui/material";
import { changeOccupancyOfRoom, addRoom, removeRoom, IStayOccupancy } from "../../state/stayOccupancy/stayOccupancySlice";
import { AppDispatch, RootState } from "../../state/store";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PaperItem from "../PaperItem/PaperItem";

export interface IOccupancyModalProps {
    open: boolean;
    handleClose: () => void;
}


export default function OccupancyModal(props: IOccupancyModalProps) {

    const { open, handleClose } = props

    const roomsOccupancy = useSelector<RootState>(state => state.stayOccupancy) as IStayOccupancy[]
    const dispatch = useDispatch<AppDispatch>()

    const [closeButtonDisabled, setCloseButtonDisabled] = useState(false)

    useEffect(() => {
        setCloseButtonDisabled(roomsOccupancy.some(roomOccupancy => roomOccupancy.occupancy === 0))
    }, [roomsOccupancy])

    return (
        <Modal
            open={open}
            onClose={() => { }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ overflow: 'scroll' }}
        >
            <PaperItem>
                <Grid container justifyContent={'center'} marginTop={2}>
                    <Grid item xs={12} md={6}>
                        <Grid container justifyContent={'center'}>
                            <Typography variant={'h4'}>How many will you be?</Typography>

                            {roomsOccupancy.map((roomOccupancy, index) => {
                                return (
                                    <FormControl fullWidth key={index} sx={{ marginTop: 2 }}>
                                        <InputLabel id={`select-helper-label-${index}`}>Room #{index + 1}</InputLabel>
                                        <Select
                                            labelId={`select-helper-label-${index}`}
                                            id={`select-helper-${index}`}
                                            label={`Room #${index + 1}`}
                                            name={`room${index + 1}`}
                                            required
                                            value={roomOccupancy.occupancy}
                                            onChange={(e) => dispatch(changeOccupancyOfRoom({ roomIndex: index, occupancy: e.target.value as number }))}
                                            placeholder="Select number of persons"
                                        >
                                            <MenuItem value={0} disabled><em>Number of persons in room #{index + 1}</em></MenuItem>
                                            <MenuItem value={1}>One adult</MenuItem>
                                            <MenuItem value={2}>Two adults</MenuItem>
                                            <MenuItem disabled={allRoomsWithOccupancyOverTwoSelected() && roomOccupancy.occupancy < 3} value={3}>

                                                {allRoomsWithOccupancyOverTwoSelected() && roomOccupancy.occupancy < 3 ? 'Three adults (Only two Sea Cabin)' : 'Three adults (Sea Cabin)'}

                                            </MenuItem>
                                            <MenuItem disabled={allRoomsWithOccupancyOverTwoSelected() && roomOccupancy.occupancy < 3} value={4}>
                                                {allRoomsWithOccupancyOverTwoSelected() && roomOccupancy.occupancy < 3 ? 'Four adults (Only two Sea Cabins)' : 'Four adults (Sea Cabin)'}

                                            </MenuItem>
                                        </Select>
                                        {roomOccupancy.occupancy > 2 &&
                                            <FormHelperText>
                                                * Glass Igloos and Sky Suites are limited to <b>maximum two adults</b> per room. Rooms with 3-4 adults are limited to our Sea Cabins.
                                            </FormHelperText>
                                        }

                                    </FormControl>)
                            })}

                            <Grid container marginTop={2}>
                                {roomsOccupancy.length < 11 &&
                                    <Grid item xs={6}>
                                        <Button color='primary' startIcon={<AddCircleIcon />} onClick={() => dispatch(addRoom())}>
                                            Add Room
                                        </Button>
                                    </Grid>
                                }

                                {roomsOccupancy.length > 1 &&
                                    <Grid item xs={6}>
                                        <Button color='secondary' startIcon={<RemoveCircleIcon />} onClick={() => dispatch(removeRoom())}>
                                            Remove Room
                                        </Button>
                                    </Grid>
                                }
                            </Grid>
                            <Button onClick={handleClose} disabled={closeButtonDisabled} variant={'contained'} color={'primary'} sx={{ marginTop: 2 }}>Close</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </PaperItem>
        </Modal>
    )

    function allRoomsWithOccupancyOverTwoSelected(): boolean {
        const roomsAbove2 = roomsOccupancy.filter(roomsOccupancy => roomsOccupancy.occupancy > 2).length
        return roomsAbove2 >= 2 && roomsOccupancy.length > 2
    }
}