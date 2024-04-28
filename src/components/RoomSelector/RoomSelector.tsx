import { FormControl, InputLabel, Select, OutlinedInput, Box, Chip, MenuItem, SelectChangeEvent } from "@mui/material"
import { IStaySearch, selectRoomCategory, selectStaySearch, setSelectedRoomCategories, unselectRoomCategory } from "../../state/staySearch/staySearchSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../state/store"
import { IApiHotel } from "../../api/IApiHotel";
import { IApiHotelAvailability } from "../../api/IApiHotelAvailability";
import { IStayOccupancy } from "../../state/stayOccupancy/stayOccupancySlice";
import { useEffect } from "react";
import { IHotel } from "../../domain/IHotel";


const ROOM_CATEGORIES_IDS_TOTAL_NUMBER_OF_ROOMS_PER_ID: { [key: string]: number } = {
    '9eb71fa5-2653-4c21-8c12-b13400aacfbe': 4, // Sky Suites
    '4e4082b5-71ac-4ea4-b107-b1340150f566': 2, // Glass igloo 180º 1st row
    'a0ecba10-b527-4874-924c-b13400aacfbe': 1, // Glass igloo 180º 2nd row
    '92ac9460-d3a0-43af-a33f-b13400aacfbe': 2, // Glass igloo 360º
    '1314e78d-a97e-42c9-883a-b13400aacfbe': 2, // Sea Cabins
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


export default function RoomSelector() {

    const dispatch = useDispatch<AppDispatch>()
    const calendarState = useSelector<RootState>(state => selectStaySearch(state)) as IStaySearch
    const hotel = useSelector<RootState>(state => state.hotelState.hotel) as IHotel
    const roomsOccupancy = useSelector<RootState>(state => state.stayOccupancy) as IStayOccupancy[]

    const handleChange = (event: SelectChangeEvent<typeof calendarState.selectedRoomCategories>) => {
        const {
            target: { value },
        } = event;

        typeof value === 'string' ? dispatch(setSelectedRoomCategories(value.split(','))) : dispatch(setSelectedRoomCategories(value))
    }

    useEffect(() => {

        const allCategories = hotel.roomCategories.map(roomCategory => roomCategory.id)
        dispatch(setSelectedRoomCategories(allCategories))
    }, [roomsOccupancy])

    return (
        <FormControl sx={{ m: 1, width: '100%' }}>
            <InputLabel id="demo-multiple-chip-label">Room types</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={calendarState.selectedRoomCategories}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Room types" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={getRoomNameFromId(value)} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}

            >
                {hotel.roomCategories.map((room) => {
                    const disabled = shouldBeDisabled(room.maxOccupancy, room.id)
                    return (
                        <MenuItem
                            key={room.id}
                            value={room.id}
                            disabled={disabled}
                        >
                            {disabled? `${room.name}` : room.name}
                        </MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )

    function getRoomNameFromId(roomCategoryId: string) {
        return hotel.roomCategories.find(roomCategory => roomCategory.id === roomCategoryId)?.name ?? ''
    }

    function shouldBeDisabled(currentRoomMaxOccupancy: number, roomCategoryId: string): boolean {

        return isOneOrMoreRoomsWithMoreThanTwoBedsSelectedAndCurrentRoomMaxOccuancyMoreThanTwo(currentRoomMaxOccupancy, roomCategoryId) ||
            willBeToFewRooms(roomCategoryId) && calendarState.selectedRoomCategories.includes(roomCategoryId) ||
            willBeToFewBeds(roomCategoryId) && calendarState.selectedRoomCategories.includes(roomCategoryId)
    }

    function getCurrentSelectedCategoriesTotalNumberOfRooms(): number {
        let totalNumberOfRooms = 0;
        hotel.roomCategories.forEach((roomCategory) => {
            if (calendarState.selectedRoomCategories.includes(roomCategory.id)) {
                totalNumberOfRooms += getCategoryTotalNumberOfRooms(roomCategory.id)
            }
        })
        return totalNumberOfRooms
    }

    function getCategoryTotalNumberOfRooms(roomCategoryId: string): number {
        return ROOM_CATEGORIES_IDS_TOTAL_NUMBER_OF_ROOMS_PER_ID[roomCategoryId]
    }

    function getCurrentSelectedCategoriesMaxOccupancy(): number {
        let maxOccupancy = 0;
        hotel.roomCategories.forEach((roomCategory) => {
            if (calendarState.selectedRoomCategories.includes(roomCategory.id)) {
                maxOccupancy += roomCategory.maxOccupancy * ROOM_CATEGORIES_IDS_TOTAL_NUMBER_OF_ROOMS_PER_ID[roomCategory.id]
            }
        })
        return maxOccupancy
    }

    function willBeToFewRooms(roomCategoryId: string): boolean {
        return getCurrentSelectedCategoriesTotalNumberOfRooms() - getCategoryTotalNumberOfRooms(roomCategoryId) < roomsOccupancy.length
    }

    function willBeToFewBeds(roomCategoryId: string): boolean {
        return getCurrentSelectedCategoriesMaxOccupancy() -
            ROOM_CATEGORIES_IDS_TOTAL_NUMBER_OF_ROOMS_PER_ID[roomCategoryId] *
            (hotel?.roomCategories.find((roomCategory) => roomCategory.id === roomCategoryId)?.maxOccupancy ?? 1) <
            roomsOccupancy.reduce((acc, roomOccupancy) => acc + roomOccupancy.occupancy, 0)

    }

    function isOneOrMoreRoomsWithMoreThanTwoBedsSelectedAndCurrentRoomMaxOccuancyMoreThanTwo(currentRoomMaxOccupancy: number, roomCategoryId: string): boolean {
        return roomsOccupancy.some(roomOccupancy => roomOccupancy.occupancy > 2) && currentRoomMaxOccupancy > 2
    }
}