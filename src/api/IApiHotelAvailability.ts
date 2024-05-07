export interface IApiHotelAvailability {
  RateGroups: IApiRateGroup[]
  Rates: IApiRate[]
  RoomCategoryAvailabilities: IApiRoomCategoryAvailability[]
  ViolatedRestrictions: any
}

export interface IApiRateGroup {
  Id: string
  Ordering: number
  SettlementType: string
  SettlementAction: string
  SettlementTrigger: string
  SettlementOffset: string
  SettlementValue: number
  SettlementFlatValue: any
  SettlementMaximumNights: any
  SettlementMaximumTimeUnits: any
  SettlementCurrencyCode: string
}

export interface IApiRate {
  Id: string
  RateGroupId: string
  Ordering: number
  Name: IApiName
  Description: IApiDescription
  IsPrivate: boolean
  CurrencyCode: string
}

export interface IApiName {
  [language: string]: string
}

export interface IApiDescription {
  [language: string]: string
}

export interface IApiRoomCategoryAvailability {
  RoomCategoryId: string
  AvailableRoomCount: number
  RoomOccupancyAvailabilities: IApiRoomOccupancyAvailability[]
}

export interface IApiRoomOccupancyAvailability {
  Pricing: IApiPricing[]
  AdultCount: number
  ChildCount: number
  OccupancyData: IApiOccupancyData[]
}

export interface IApiPricing {
  RateId: string
  Price: IApiPrice
  MaxPrice: MaxPrice
}

export interface IApiPrice {
  Total: IApiTotal
  TotalAmount: IApiTotalAmount
  AveragePerNight: IApiAveragePerNight
  AveragePerTimeUnit: IApiAveragePerTimeUnit
  AverageAmountPerNight: IApiAverageAmountPerNight
  AverageAmountPerTimeUnit: IApiAverageAmountPerTimeUnit
}

export interface IApiTotal {
  [currencyCode: string]: number
}

export interface IApiTotalAmount {
  [currencyCode: string]: IApiPriceData
}

export interface IApiPriceData {
  Currency: string
  GrossValue: number
  NetValue: number
  TaxValues: IApiTaxValue[]
  Breakdown: IApiBreakdown
}

export interface IApiTaxValue {
  TaxRateCode: string
  Value: number
}

export interface IApiBreakdown {
  Items: IApiItem[]
}

export interface IApiItem {
  TaxRateCode: string
  NetValue: number
  TaxValue: number
}

export interface IApiAveragePerNight {
  [currencyCode: string]: number
}

export interface IApiAveragePerTimeUnit {
  [currencyCode: string]: number
}

export interface IApiAverageAmountPerNight {
  [currencyCode: string]: IApiPriceData
}

export interface IApiAverageAmountPerTimeUnit {
  [currencyCode: string]: IApiPriceData
}

export interface MaxPrice {
  Total: IApiTotal
  TotalAmount: IApiTotalAmount
  AveragePerNight: IApiAveragePerNight
  AveragePerTimeUnit: IApiAveragePerTimeUnit
  AverageAmountPerNight: IApiAverageAmountPerNight
  AverageAmountPerTimeUnit: IApiAverageAmountPerTimeUnit
}

export interface IApiOccupancyData {
  AgeCategoryId: string
  PersonCount: number
}
