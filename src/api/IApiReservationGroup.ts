import { IApiDescription, IApiName, IApiTotalAmount } from "./IApiHotelAvailability"

export interface IApiReservationGroup {
    Id: string | null
    CustomerId: string | null
    Reservations: IApiReservation[]
    PaymentRequestId: string | null
    PaymentCardId: string | null
    TotalAmount: IApiTotalAmount | null
}

export interface IApiReservation {
    Id: string
    RoomCategoryId: string
    StartUtc: string
    EndUtc: string
    RateId: string
    Rate: IApiRate
    AdultCount: number
    ChildCount: number
    ProductIds: string[]
    Notes: string
    Amount: any
    Number: string
}

export interface IApiRate {
    Id: string
    Name: IApiName
    Description: IApiDescription
}
