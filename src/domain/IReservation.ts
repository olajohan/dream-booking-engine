
export interface IReservation {
    roomCategoryId: string
    startUtc: string
    endUtc: string
    voucherCode: string
    rateId: string
    adultCount: number
    productIds: string[]
    notes: string
}