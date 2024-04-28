import { IRate } from "./IRate";
import { IRoomCategory } from "./IRoomCategory";

export interface IRoomCategoryWithAvailability extends IRoomCategory {
    availableRoomCount: number;
    rates: IRate[]
}