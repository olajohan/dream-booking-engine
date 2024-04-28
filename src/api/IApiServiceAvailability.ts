export interface IApiServiceAvailability {
    TimeUnitStartsUtc: string[]
    CategoryAvailabilities: CategoryAvailability[]
    ApplicableRestrictions: any[]
  }
  
  export interface CategoryAvailability {
    CategoryId: string
    Availabilities: number[]
  }

  