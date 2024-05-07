export interface IApiHotel {
  Languages: IApiLanguage[]
  Currencies: IApiCurrency[]
  Countries: IApiCountry[]
  ImageBaseUrl: string
  Id: string
  Name: IApiName
  Description: IApiDescription
  CityId: string
  ImageId: string
  IntroImageId: string
  DefaultLanguageCode: string
  DefaultCurrencyCode: string
  DefaultRateCurrencyCode: string
  SupportedLanguageCodes: string[]
  AcceptedCurrencyCodes: string[]
  TaxEnvironmentCode: string
  Pricing: string
  RoomCategories: IApiRoomCategory[]
  Products: IApiProduct[]
  PaymentGateway: IApiPaymentGateway
  TermsAndConditionsUrl: string
  IanaTimeZoneIdentifier: string
  Email: string
  Telephone: string
  AdditionalLegalStatements: any[]
  Address: IApiAddress
}

export interface IApiLanguage {
  Code: string
  Name: string
  DefaultCulture: IApiDefaultCulture
}

export interface IApiDefaultCulture {
  CurrencyDecimalSeparator: string
  CurrencyGroupSeparator: string
}

export interface IApiCurrency {
  Code: string
  Symbol: string
  ValueFormat: string
  DecimalPlaces: number
  SymbolIsBehindValue: boolean
}

export interface IApiCountry {
  Code: string
  SovereignCountryCode: string
  Name: string
}

export interface IApiName {
  [languageCode: string]: string
}

export interface IApiDescription {
  [languageCode: string]: string
}

export interface IApiRoomCategory {
  Id: string
  Name: IApiRoomCategoryName
  Description: IApiRoomCategoryDescription
  ImageIds: string[]
  Ordering: number
  NormalBedCount: number
  ExtraBedCount: number
  SpaceType: string
}

export interface IApiRoomCategoryName {
  [languageCode: string]: string
}

export interface IApiRoomCategoryDescription {
  [languageCode: string]: string
}

export interface IApiProduct {
  Id: string
  Name: IApiProductName
  Description: IApiProductDescription
  CategoryId: string
  ImageId?: string
  IncludedByDefault: boolean
  AlwaysIncluded: boolean
  Prices: IApiPrices
  Pricing: IApiPricing
  Amounts: IApiAmounts
  RelativePrice: any
  Charging: string
  ChargingMode: string
  Posting: string
  PostingMode: string
  Ordering: number
}

export interface IApiProductName {
  [languageCode: string]: string
}

export interface IApiProductDescription {
  [languageCode: string]: string
}

export interface IApiPrices {
  [currencyCode: string]: number
}

export interface IApiPricing {
  Discriminator: string
  Value: IApiValue
}

export interface IApiValue {
  [currencyCode: string]: IApiPriceCurrency
}

export interface IApiPriceCurrency {
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

export interface IApiAmounts {
  [currencyAmounts: string]: IApiPriceCurrency
}

export interface IApiPaymentGateway {
  PaymentGatewayType: string
  PaymentCardStorageType: string
  IsMerchant: boolean
  Model: string
  SupportedCreditCardTypes: string[]
  SupportedPaymentMethods: IApiSupportedPaymentMethods
  PublicKey: string
  DefaultCurrencyCode: string
  Accounts: IApiAccount[]
}

export interface IApiSupportedPaymentMethods {
  PaymentCard: boolean
  Ideal: boolean
  ApplePay: boolean
  GooglePay: boolean
}

export interface IApiAccount {
  CurrencyCode: string
}

export interface IApiAddress {
  Line1: string
  Line2: string
  City: string
  PostalCode: string
  CountryCode: string
  Latitude: number
  Longitude: number
}
