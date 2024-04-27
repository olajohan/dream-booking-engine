export interface IHotelAvailability {
    RateGroups: RateGroup[]
    Rates: Rate[]
    RoomCategoryAvailabilities: RoomCategoryAvailability[]
    ViolatedRestrictions: any
  }
  
  export interface RateGroup {
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
  
  export interface Rate {
    Id: string
    RateGroupId: string
    Ordering: number
    Name: Name
    Description: Description
    IsPrivate: boolean
    CurrencyCode: string
  }
  
  export interface Name {
    "en-US": string
  }
  
  export interface Description {
    "en-US": string
  }
  
  export interface RoomCategoryAvailability {
    RoomCategoryId: string
    AvailableRoomCount: number
    RoomOccupancyAvailabilities: RoomOccupancyAvailability[]
  }
  
  export interface RoomOccupancyAvailability {
    Pricing: Pricing[]
    AdultCount: number
    ChildCount: number
    OccupancyData: OccupancyData[]
  }
  
  export interface Pricing {
    RateId: string
    Price: Price
    MaxPrice: any
  }
  
  export interface Price {
    Total: any
    TotalAmount: any
    AveragePerNight: any
    AveragePerTimeUnit: any
    AverageAmountPerNight: any
    AverageAmountPerTimeUnit: any
  }

  export interface OccupancyData {
    AgeCategoryId: string;
    PersonCount: number;
  }