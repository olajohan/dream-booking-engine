export interface Hotel {
  Languages: Language[]
  Currencies: Currency[]
  Countries: Country[]
  ImageBaseUrl: string
  Id: string
  Name: Name
  Description: Description
  CityId: string
  ImageId: string
  IntroImageId: string
  DefaultLanguageCode: string
  DefaultCurrencyCode: string
  DefaultRateCurrencyCode: string
  SupportedLanguageCodes: string[]
  AcceptedCurrencyCodes: string[]
  RoomCategories: RoomCategory[]
  Products: Product[]
  PaymentGateway: PaymentGateway
  TermsAndConditionsUrl: string
  IanaTimeZoneIdentifier: string
  Email: string
  Telephone: string
  AdditionalLegalStatements: any[]
  Address: Address
}

export interface Language {
  Code: string
  Name: string
  DefaultCulture: DefaultCulture
}

export interface DefaultCulture {
  CurrencyDecimalSeparator: string
  CurrencyGroupSeparator: string
}

export interface Currency {
  Code: string
  Symbol: string
  ValueFormat: string
  DecimalPlaces: number
  SymbolIsBehindValue: boolean
}

export interface Country {
  Code: string
  Name: string
}

export interface Name {
  "en-US": string
}

export interface Description {
  "en-US": string
}

export interface RoomCategory {
  Id: string
  Name: RoomCategoryName
  Description: RoomCategoryDescription
  Ordering: number
  NormalBedCount: number
  ExtraBedCount: number
  SpaceType: string
}

export interface RoomCategoryName {
  "en-US": string
}

export interface RoomCategoryDescription {
  "en-US": string
}

export interface Product {
  Id: string
  Name: ProductName
  Description: ProductDescription
  CategoryId: string
  ImageId?: string
  IncludedByDefault: boolean
  Pricing: Pricing
  ChargingMode: string
  PostingMode: string
  Ordering: number
}

export interface ProductName {
  "en-US": string
  "nl-NL"?: string
}

export interface ProductDescription { }

export interface Pricing {
  Discriminator: string
  Value: Value
}

export interface Value {
  CHF?: Chf
  EUR?: Eur
  ProductIds?: any[]
  TaxRateCodes?: string[]
  Multiplier?: number
  Target?: string
}

export interface Chf {
  Currency: string
  GrossValue: number
  NetValue: number
  TaxValues: TaxValue[]
}

export interface TaxValue {
  TaxRateCode: string
  Value: number
}

export interface Eur {
  Currency: string
  GrossValue: number
  NetValue: number
  TaxValues: TaxValue2[]
}

export interface TaxValue2 {
  TaxRateCode: string
  Value: number
}

export interface PaymentGateway {
  PaymentGatewayType: string
  IsMerchant: boolean
  SupportedCreditCardTypes: string[]
  PublicKey: string
}

export interface Address {
  Line1: string
  Line2: string
  City: string
  PostalCode: string
  CountryCode: string
  Latitude: any
  Longitude: any
}

export interface OccupancyData {
  AgeCategoryId: string;
  PersonCount: number;
}
