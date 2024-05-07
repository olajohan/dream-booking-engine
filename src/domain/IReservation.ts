
export interface IReservation {
    roomCategoryId: string;
    startUTC: string;
    endUTC: string;
    voucherCode: string | null;
    rateId: string;
    adultCount: number;
    productIds: string[];
    notes: string;
}