import { IBooker } from "./IBooker";
import { ICustomer } from "./ICustomer";
import { IReservation } from "./IReservation";

export interface IReservationGroup {
    customer: ICustomer
    booker: IBooker
    reservations: IReservation[] 
}