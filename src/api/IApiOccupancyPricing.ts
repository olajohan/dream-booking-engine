export interface IApiOccupancyPricing {
  OccupancyPrices: IApiOccupancyPrice[]
}

export interface IApiOccupancyPrice {
  AdultCount: number
  ChildCount: number
  OccupancyData: IApiOccupancyData[]
  Pricing: IApiPricing[]
}

export interface IApiOccupancyData {
  AgeCategoryId: string
  PersonCount: number
}

export interface IApiPricing {
  Price: IApiPrice
  RateId: string
}

export interface IApiPrice {
  Total: any
  AveragePerNight: any
}
