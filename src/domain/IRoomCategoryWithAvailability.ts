import { IApiRoomCategory } from "../api/IApiHotel";
import { IRoomCategoryRate } from "./IRoomCategoryRate";

export interface IRoomCategoryWithAvailability extends IApiRoomCategory {
    availableRoomCount: number;
    rates: IRoomCategoryRate[]
}