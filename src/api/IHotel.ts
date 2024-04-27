export interface IHotel {
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
    TaxEnvironmentCode: string
    Pricing: string
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
    SovereignCountryCode: string
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
    ImageIds: string[]
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
    AlwaysIncluded: boolean
    Prices: Prices
    Pricing: Pricing
    Amounts: Amounts
    RelativePrice: any
    Charging: string
    ChargingMode: string
    Posting: string
    PostingMode: string
    Ordering: number
  }
  
  export interface ProductName {
    "en-US": string
  }
  
  export interface ProductDescription {
    "en-US": string
  }
  
  export interface Prices {
    KES: number
    RUB: number
    ZAR: number
    MXN: number
    PLN: number
    SAR: number
    CZK: number
    IDR: number
    NZD: number
    CNY: number
    MUR: number
    USD: number
    GBP: number
    NOK: number
    XOF: number
    CRC: number
    EUR: number
    CHF: number
    PHP: number
    HUF: number
    PAB: number
    JPY: number
    SGD: number
    PEN: number
    THB: number
    ISK: number
    NAD: number
    ILS: number
    GTQ: number
    ANG: number
    AUD: number
    GEL: number
    TRY: number
    MAD: number
    COP: number
    SEK: number
    DKK: number
    SCR: number
    GHS: number
    CAD: number
    EGP: number
    CLP: number
    KHR: number
    MYR: number
    BSD: number
    UAH: number
    XCD: number
    KRW: number
    HRK: number
    AED: number
    VUV: number
    DOP: number
    TOP: number
    FJD: number
    TWD: number
    BRL: number
    NGN: number
    BOB: number
    PYG: number
    HNL: number
    WST: number
    HKD: number
    ARS: number
    XPF: number
    UYU: number
    CDF: number
    MGA: number
    LBP: number
  }
  
  export interface Pricing {
    Discriminator: string
    Value: Value
  }
  
  export interface Value {
    KES: Kes
    RUB: Rub
    ZAR: Zar
    MXN: Mxn
    PLN: Pln
    SAR: Sar
    CZK: Czk
    IDR: Idr
    NZD: Nzd
    CNY: Cny
    MUR: Mur
    USD: Usd
    GBP: Gbp
    NOK: Nok
    XOF: Xof
    CRC: Crc
    EUR: Eur
    CHF: Chf
    PHP: Php
    HUF: Huf
    PAB: Pab
    JPY: Jpy
    SGD: Sgd
    PEN: Pen
    THB: Thb
    ISK: Isk
    NAD: Nad
    ILS: Ils
    GTQ: Gtq
    ANG: Ang
    AUD: Aud
    GEL: Gel
    TRY: Try
    MAD: Mad
    COP: Cop
    SEK: Sek
    DKK: Dkk
    SCR: Scr
    GHS: Ghs
    CAD: Cad
    EGP: Egp
    CLP: Clp
    KHR: Khr
    MYR: Myr
    BSD: Bsd
    UAH: Uah
    XCD: Xcd
    KRW: Krw
    HRK: Hrk
    AED: Aed
    VUV: Vuv
    DOP: Dop
    TOP: Top
    FJD: Fjd
    TWD: Twd
    BRL: Brl
    NGN: Ngn
    BOB: Bob
    PYG: Pyg
    HNL: Hnl
    WST: Wst
    HKD: Hkd
    ARS: Ars
    XPF: Xpf
    UYU: Uyu
    CDF: Cdf
    MGA: Mga
    LBP: Lbp
  }
  
  export interface Kes {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue[]
    Breakdown: Breakdown
  }
  
  export interface TaxValue {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown {
    Items: Item[]
  }
  
  export interface Item {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Rub {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue2[]
    Breakdown: Breakdown2
  }
  
  export interface TaxValue2 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown2 {
    Items: Item2[]
  }
  
  export interface Item2 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Zar {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue3[]
    Breakdown: Breakdown3
  }
  
  export interface TaxValue3 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown3 {
    Items: Item3[]
  }
  
  export interface Item3 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Mxn {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue4[]
    Breakdown: Breakdown4
  }
  
  export interface TaxValue4 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown4 {
    Items: Item4[]
  }
  
  export interface Item4 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Pln {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue5[]
    Breakdown: Breakdown5
  }
  
  export interface TaxValue5 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown5 {
    Items: Item5[]
  }
  
  export interface Item5 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Sar {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue6[]
    Breakdown: Breakdown6
  }
  
  export interface TaxValue6 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown6 {
    Items: Item6[]
  }
  
  export interface Item6 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Czk {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue7[]
    Breakdown: Breakdown7
  }
  
  export interface TaxValue7 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown7 {
    Items: Item7[]
  }
  
  export interface Item7 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Idr {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue8[]
    Breakdown: Breakdown8
  }
  
  export interface TaxValue8 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown8 {
    Items: Item8[]
  }
  
  export interface Item8 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Nzd {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue9[]
    Breakdown: Breakdown9
  }
  
  export interface TaxValue9 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown9 {
    Items: Item9[]
  }
  
  export interface Item9 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Cny {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue10[]
    Breakdown: Breakdown10
  }
  
  export interface TaxValue10 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown10 {
    Items: Item10[]
  }
  
  export interface Item10 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Mur {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue11[]
    Breakdown: Breakdown11
  }
  
  export interface TaxValue11 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown11 {
    Items: Item11[]
  }
  
  export interface Item11 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Usd {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue12[]
    Breakdown: Breakdown12
  }
  
  export interface TaxValue12 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown12 {
    Items: Item12[]
  }
  
  export interface Item12 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Gbp {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue13[]
    Breakdown: Breakdown13
  }
  
  export interface TaxValue13 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown13 {
    Items: Item13[]
  }
  
  export interface Item13 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Nok {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue14[]
    Breakdown: Breakdown14
  }
  
  export interface TaxValue14 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown14 {
    Items: Item14[]
  }
  
  export interface Item14 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Xof {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue15[]
    Breakdown: Breakdown15
  }
  
  export interface TaxValue15 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown15 {
    Items: Item15[]
  }
  
  export interface Item15 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Crc {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue16[]
    Breakdown: Breakdown16
  }
  
  export interface TaxValue16 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown16 {
    Items: Item16[]
  }
  
  export interface Item16 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Eur {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue17[]
    Breakdown: Breakdown17
  }
  
  export interface TaxValue17 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown17 {
    Items: Item17[]
  }
  
  export interface Item17 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Chf {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue18[]
    Breakdown: Breakdown18
  }
  
  export interface TaxValue18 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown18 {
    Items: Item18[]
  }
  
  export interface Item18 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Php {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue19[]
    Breakdown: Breakdown19
  }
  
  export interface TaxValue19 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown19 {
    Items: Item19[]
  }
  
  export interface Item19 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Huf {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue20[]
    Breakdown: Breakdown20
  }
  
  export interface TaxValue20 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown20 {
    Items: Item20[]
  }
  
  export interface Item20 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Pab {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue21[]
    Breakdown: Breakdown21
  }
  
  export interface TaxValue21 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown21 {
    Items: Item21[]
  }
  
  export interface Item21 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Jpy {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue22[]
    Breakdown: Breakdown22
  }
  
  export interface TaxValue22 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown22 {
    Items: Item22[]
  }
  
  export interface Item22 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Sgd {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue23[]
    Breakdown: Breakdown23
  }
  
  export interface TaxValue23 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown23 {
    Items: Item23[]
  }
  
  export interface Item23 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Pen {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue24[]
    Breakdown: Breakdown24
  }
  
  export interface TaxValue24 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown24 {
    Items: Item24[]
  }
  
  export interface Item24 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Thb {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue25[]
    Breakdown: Breakdown25
  }
  
  export interface TaxValue25 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown25 {
    Items: Item25[]
  }
  
  export interface Item25 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Isk {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue26[]
    Breakdown: Breakdown26
  }
  
  export interface TaxValue26 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown26 {
    Items: Item26[]
  }
  
  export interface Item26 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Nad {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue27[]
    Breakdown: Breakdown27
  }
  
  export interface TaxValue27 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown27 {
    Items: Item27[]
  }
  
  export interface Item27 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Ils {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue28[]
    Breakdown: Breakdown28
  }
  
  export interface TaxValue28 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown28 {
    Items: Item28[]
  }
  
  export interface Item28 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Gtq {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue29[]
    Breakdown: Breakdown29
  }
  
  export interface TaxValue29 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown29 {
    Items: Item29[]
  }
  
  export interface Item29 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Ang {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue30[]
    Breakdown: Breakdown30
  }
  
  export interface TaxValue30 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown30 {
    Items: Item30[]
  }
  
  export interface Item30 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Aud {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue31[]
    Breakdown: Breakdown31
  }
  
  export interface TaxValue31 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown31 {
    Items: Item31[]
  }
  
  export interface Item31 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Gel {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue32[]
    Breakdown: Breakdown32
  }
  
  export interface TaxValue32 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown32 {
    Items: Item32[]
  }
  
  export interface Item32 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Try {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue33[]
    Breakdown: Breakdown33
  }
  
  export interface TaxValue33 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown33 {
    Items: Item33[]
  }
  
  export interface Item33 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Mad {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue34[]
    Breakdown: Breakdown34
  }
  
  export interface TaxValue34 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown34 {
    Items: Item34[]
  }
  
  export interface Item34 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Cop {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue35[]
    Breakdown: Breakdown35
  }
  
  export interface TaxValue35 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown35 {
    Items: Item35[]
  }
  
  export interface Item35 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Sek {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue36[]
    Breakdown: Breakdown36
  }
  
  export interface TaxValue36 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown36 {
    Items: Item36[]
  }
  
  export interface Item36 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Dkk {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue37[]
    Breakdown: Breakdown37
  }
  
  export interface TaxValue37 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown37 {
    Items: Item37[]
  }
  
  export interface Item37 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Scr {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue38[]
    Breakdown: Breakdown38
  }
  
  export interface TaxValue38 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown38 {
    Items: Item38[]
  }
  
  export interface Item38 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Ghs {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue39[]
    Breakdown: Breakdown39
  }
  
  export interface TaxValue39 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown39 {
    Items: Item39[]
  }
  
  export interface Item39 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Cad {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue40[]
    Breakdown: Breakdown40
  }
  
  export interface TaxValue40 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown40 {
    Items: Item40[]
  }
  
  export interface Item40 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Egp {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue41[]
    Breakdown: Breakdown41
  }
  
  export interface TaxValue41 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown41 {
    Items: Item41[]
  }
  
  export interface Item41 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Clp {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue42[]
    Breakdown: Breakdown42
  }
  
  export interface TaxValue42 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown42 {
    Items: Item42[]
  }
  
  export interface Item42 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Khr {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue43[]
    Breakdown: Breakdown43
  }
  
  export interface TaxValue43 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown43 {
    Items: Item43[]
  }
  
  export interface Item43 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Myr {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue44[]
    Breakdown: Breakdown44
  }
  
  export interface TaxValue44 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown44 {
    Items: Item44[]
  }
  
  export interface Item44 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Bsd {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue45[]
    Breakdown: Breakdown45
  }
  
  export interface TaxValue45 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown45 {
    Items: Item45[]
  }
  
  export interface Item45 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Uah {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue46[]
    Breakdown: Breakdown46
  }
  
  export interface TaxValue46 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown46 {
    Items: Item46[]
  }
  
  export interface Item46 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Xcd {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue47[]
    Breakdown: Breakdown47
  }
  
  export interface TaxValue47 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown47 {
    Items: Item47[]
  }
  
  export interface Item47 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Krw {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue48[]
    Breakdown: Breakdown48
  }
  
  export interface TaxValue48 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown48 {
    Items: Item48[]
  }
  
  export interface Item48 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Hrk {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue49[]
    Breakdown: Breakdown49
  }
  
  export interface TaxValue49 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown49 {
    Items: Item49[]
  }
  
  export interface Item49 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Aed {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue50[]
    Breakdown: Breakdown50
  }
  
  export interface TaxValue50 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown50 {
    Items: Item50[]
  }
  
  export interface Item50 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Vuv {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue51[]
    Breakdown: Breakdown51
  }
  
  export interface TaxValue51 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown51 {
    Items: Item51[]
  }
  
  export interface Item51 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Dop {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue52[]
    Breakdown: Breakdown52
  }
  
  export interface TaxValue52 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown52 {
    Items: Item52[]
  }
  
  export interface Item52 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Top {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue53[]
    Breakdown: Breakdown53
  }
  
  export interface TaxValue53 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown53 {
    Items: Item53[]
  }
  
  export interface Item53 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Fjd {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue54[]
    Breakdown: Breakdown54
  }
  
  export interface TaxValue54 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown54 {
    Items: Item54[]
  }
  
  export interface Item54 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Twd {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue55[]
    Breakdown: Breakdown55
  }
  
  export interface TaxValue55 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown55 {
    Items: Item55[]
  }
  
  export interface Item55 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Brl {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue56[]
    Breakdown: Breakdown56
  }
  
  export interface TaxValue56 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown56 {
    Items: Item56[]
  }
  
  export interface Item56 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Ngn {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue57[]
    Breakdown: Breakdown57
  }
  
  export interface TaxValue57 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown57 {
    Items: Item57[]
  }
  
  export interface Item57 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Bob {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue58[]
    Breakdown: Breakdown58
  }
  
  export interface TaxValue58 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown58 {
    Items: Item58[]
  }
  
  export interface Item58 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Pyg {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue59[]
    Breakdown: Breakdown59
  }
  
  export interface TaxValue59 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown59 {
    Items: Item59[]
  }
  
  export interface Item59 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Hnl {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue60[]
    Breakdown: Breakdown60
  }
  
  export interface TaxValue60 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown60 {
    Items: Item60[]
  }
  
  export interface Item60 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Wst {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue61[]
    Breakdown: Breakdown61
  }
  
  export interface TaxValue61 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown61 {
    Items: Item61[]
  }
  
  export interface Item61 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Hkd {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue62[]
    Breakdown: Breakdown62
  }
  
  export interface TaxValue62 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown62 {
    Items: Item62[]
  }
  
  export interface Item62 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Ars {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue63[]
    Breakdown: Breakdown63
  }
  
  export interface TaxValue63 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown63 {
    Items: Item63[]
  }
  
  export interface Item63 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Xpf {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue64[]
    Breakdown: Breakdown64
  }
  
  export interface TaxValue64 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown64 {
    Items: Item64[]
  }
  
  export interface Item64 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Uyu {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue65[]
    Breakdown: Breakdown65
  }
  
  export interface TaxValue65 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown65 {
    Items: Item65[]
  }
  
  export interface Item65 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Cdf {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue66[]
    Breakdown: Breakdown66
  }
  
  export interface TaxValue66 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown66 {
    Items: Item66[]
  }
  
  export interface Item66 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Mga {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue67[]
    Breakdown: Breakdown67
  }
  
  export interface TaxValue67 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown67 {
    Items: Item67[]
  }
  
  export interface Item67 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Lbp {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue68[]
    Breakdown: Breakdown68
  }
  
  export interface TaxValue68 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown68 {
    Items: Item68[]
  }
  
  export interface Item68 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Amounts {
    KES: Kes2
    RUB: Rub2
    ZAR: Zar2
    MXN: Mxn2
    PLN: Pln2
    SAR: Sar2
    CZK: Czk2
    IDR: Idr2
    NZD: Nzd2
    CNY: Cny2
    MUR: Mur2
    USD: Usd2
    GBP: Gbp2
    NOK: Nok2
    XOF: Xof2
    CRC: Crc2
    EUR: Eur2
    CHF: Chf2
    PHP: Php2
    HUF: Huf2
    PAB: Pab2
    JPY: Jpy2
    SGD: Sgd2
    PEN: Pen2
    THB: Thb2
    ISK: Isk2
    NAD: Nad2
    ILS: Ils2
    GTQ: Gtq2
    ANG: Ang2
    AUD: Aud2
    GEL: Gel2
    TRY: Try2
    MAD: Mad2
    COP: Cop2
    SEK: Sek2
    DKK: Dkk2
    SCR: Scr2
    GHS: Ghs2
    CAD: Cad2
    EGP: Egp2
    CLP: Clp2
    KHR: Khr2
    MYR: Myr2
    BSD: Bsd2
    UAH: Uah2
    XCD: Xcd2
    KRW: Krw2
    HRK: Hrk2
    AED: Aed2
    VUV: Vuv2
    DOP: Dop2
    TOP: Top2
    FJD: Fjd2
    TWD: Twd2
    BRL: Brl2
    NGN: Ngn2
    BOB: Bob2
    PYG: Pyg2
    HNL: Hnl2
    WST: Wst2
    HKD: Hkd2
    ARS: Ars2
    XPF: Xpf2
    UYU: Uyu2
    CDF: Cdf2
    MGA: Mga2
    LBP: Lbp2
  }
  
  export interface Kes2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue69[]
    Breakdown: Breakdown69
  }
  
  export interface TaxValue69 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown69 {
    Items: Item69[]
  }
  
  export interface Item69 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Rub2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue70[]
    Breakdown: Breakdown70
  }
  
  export interface TaxValue70 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown70 {
    Items: Item70[]
  }
  
  export interface Item70 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Zar2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue71[]
    Breakdown: Breakdown71
  }
  
  export interface TaxValue71 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown71 {
    Items: Item71[]
  }
  
  export interface Item71 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Mxn2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue72[]
    Breakdown: Breakdown72
  }
  
  export interface TaxValue72 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown72 {
    Items: Item72[]
  }
  
  export interface Item72 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Pln2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue73[]
    Breakdown: Breakdown73
  }
  
  export interface TaxValue73 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown73 {
    Items: Item73[]
  }
  
  export interface Item73 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Sar2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue74[]
    Breakdown: Breakdown74
  }
  
  export interface TaxValue74 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown74 {
    Items: Item74[]
  }
  
  export interface Item74 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Czk2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue75[]
    Breakdown: Breakdown75
  }
  
  export interface TaxValue75 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown75 {
    Items: Item75[]
  }
  
  export interface Item75 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Idr2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue76[]
    Breakdown: Breakdown76
  }
  
  export interface TaxValue76 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown76 {
    Items: Item76[]
  }
  
  export interface Item76 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Nzd2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue77[]
    Breakdown: Breakdown77
  }
  
  export interface TaxValue77 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown77 {
    Items: Item77[]
  }
  
  export interface Item77 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Cny2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue78[]
    Breakdown: Breakdown78
  }
  
  export interface TaxValue78 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown78 {
    Items: Item78[]
  }
  
  export interface Item78 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Mur2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue79[]
    Breakdown: Breakdown79
  }
  
  export interface TaxValue79 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown79 {
    Items: Item79[]
  }
  
  export interface Item79 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Usd2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue80[]
    Breakdown: Breakdown80
  }
  
  export interface TaxValue80 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown80 {
    Items: Item80[]
  }
  
  export interface Item80 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Gbp2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue81[]
    Breakdown: Breakdown81
  }
  
  export interface TaxValue81 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown81 {
    Items: Item81[]
  }
  
  export interface Item81 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Nok2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue82[]
    Breakdown: Breakdown82
  }
  
  export interface TaxValue82 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown82 {
    Items: Item82[]
  }
  
  export interface Item82 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Xof2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue83[]
    Breakdown: Breakdown83
  }
  
  export interface TaxValue83 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown83 {
    Items: Item83[]
  }
  
  export interface Item83 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Crc2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue84[]
    Breakdown: Breakdown84
  }
  
  export interface TaxValue84 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown84 {
    Items: Item84[]
  }
  
  export interface Item84 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Eur2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue85[]
    Breakdown: Breakdown85
  }
  
  export interface TaxValue85 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown85 {
    Items: Item85[]
  }
  
  export interface Item85 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Chf2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue86[]
    Breakdown: Breakdown86
  }
  
  export interface TaxValue86 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown86 {
    Items: Item86[]
  }
  
  export interface Item86 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Php2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue87[]
    Breakdown: Breakdown87
  }
  
  export interface TaxValue87 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown87 {
    Items: Item87[]
  }
  
  export interface Item87 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Huf2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue88[]
    Breakdown: Breakdown88
  }
  
  export interface TaxValue88 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown88 {
    Items: Item88[]
  }
  
  export interface Item88 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Pab2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue89[]
    Breakdown: Breakdown89
  }
  
  export interface TaxValue89 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown89 {
    Items: Item89[]
  }
  
  export interface Item89 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Jpy2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue90[]
    Breakdown: Breakdown90
  }
  
  export interface TaxValue90 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown90 {
    Items: Item90[]
  }
  
  export interface Item90 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Sgd2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue91[]
    Breakdown: Breakdown91
  }
  
  export interface TaxValue91 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown91 {
    Items: Item91[]
  }
  
  export interface Item91 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Pen2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue92[]
    Breakdown: Breakdown92
  }
  
  export interface TaxValue92 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown92 {
    Items: Item92[]
  }
  
  export interface Item92 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Thb2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue93[]
    Breakdown: Breakdown93
  }
  
  export interface TaxValue93 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown93 {
    Items: Item93[]
  }
  
  export interface Item93 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Isk2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue94[]
    Breakdown: Breakdown94
  }
  
  export interface TaxValue94 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown94 {
    Items: Item94[]
  }
  
  export interface Item94 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Nad2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue95[]
    Breakdown: Breakdown95
  }
  
  export interface TaxValue95 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown95 {
    Items: Item95[]
  }
  
  export interface Item95 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Ils2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue96[]
    Breakdown: Breakdown96
  }
  
  export interface TaxValue96 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown96 {
    Items: Item96[]
  }
  
  export interface Item96 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Gtq2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue97[]
    Breakdown: Breakdown97
  }
  
  export interface TaxValue97 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown97 {
    Items: Item97[]
  }
  
  export interface Item97 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Ang2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue98[]
    Breakdown: Breakdown98
  }
  
  export interface TaxValue98 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown98 {
    Items: Item98[]
  }
  
  export interface Item98 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Aud2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue99[]
    Breakdown: Breakdown99
  }
  
  export interface TaxValue99 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown99 {
    Items: Item99[]
  }
  
  export interface Item99 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Gel2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue100[]
    Breakdown: Breakdown100
  }
  
  export interface TaxValue100 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown100 {
    Items: Item100[]
  }
  
  export interface Item100 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Try2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue101[]
    Breakdown: Breakdown101
  }
  
  export interface TaxValue101 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown101 {
    Items: Item101[]
  }
  
  export interface Item101 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Mad2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue102[]
    Breakdown: Breakdown102
  }
  
  export interface TaxValue102 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown102 {
    Items: Item102[]
  }
  
  export interface Item102 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Cop2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue103[]
    Breakdown: Breakdown103
  }
  
  export interface TaxValue103 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown103 {
    Items: Item103[]
  }
  
  export interface Item103 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Sek2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue104[]
    Breakdown: Breakdown104
  }
  
  export interface TaxValue104 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown104 {
    Items: Item104[]
  }
  
  export interface Item104 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Dkk2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue105[]
    Breakdown: Breakdown105
  }
  
  export interface TaxValue105 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown105 {
    Items: Item105[]
  }
  
  export interface Item105 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Scr2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue106[]
    Breakdown: Breakdown106
  }
  
  export interface TaxValue106 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown106 {
    Items: Item106[]
  }
  
  export interface Item106 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Ghs2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue107[]
    Breakdown: Breakdown107
  }
  
  export interface TaxValue107 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown107 {
    Items: Item107[]
  }
  
  export interface Item107 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Cad2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue108[]
    Breakdown: Breakdown108
  }
  
  export interface TaxValue108 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown108 {
    Items: Item108[]
  }
  
  export interface Item108 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Egp2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue109[]
    Breakdown: Breakdown109
  }
  
  export interface TaxValue109 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown109 {
    Items: Item109[]
  }
  
  export interface Item109 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Clp2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue110[]
    Breakdown: Breakdown110
  }
  
  export interface TaxValue110 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown110 {
    Items: Item110[]
  }
  
  export interface Item110 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Khr2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue111[]
    Breakdown: Breakdown111
  }
  
  export interface TaxValue111 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown111 {
    Items: Item111[]
  }
  
  export interface Item111 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Myr2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue112[]
    Breakdown: Breakdown112
  }
  
  export interface TaxValue112 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown112 {
    Items: Item112[]
  }
  
  export interface Item112 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Bsd2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue113[]
    Breakdown: Breakdown113
  }
  
  export interface TaxValue113 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown113 {
    Items: Item113[]
  }
  
  export interface Item113 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Uah2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue114[]
    Breakdown: Breakdown114
  }
  
  export interface TaxValue114 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown114 {
    Items: Item114[]
  }
  
  export interface Item114 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Xcd2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue115[]
    Breakdown: Breakdown115
  }
  
  export interface TaxValue115 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown115 {
    Items: Item115[]
  }
  
  export interface Item115 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Krw2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue116[]
    Breakdown: Breakdown116
  }
  
  export interface TaxValue116 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown116 {
    Items: Item116[]
  }
  
  export interface Item116 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Hrk2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue117[]
    Breakdown: Breakdown117
  }
  
  export interface TaxValue117 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown117 {
    Items: Item117[]
  }
  
  export interface Item117 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Aed2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue118[]
    Breakdown: Breakdown118
  }
  
  export interface TaxValue118 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown118 {
    Items: Item118[]
  }
  
  export interface Item118 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Vuv2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue119[]
    Breakdown: Breakdown119
  }
  
  export interface TaxValue119 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown119 {
    Items: Item119[]
  }
  
  export interface Item119 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Dop2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue120[]
    Breakdown: Breakdown120
  }
  
  export interface TaxValue120 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown120 {
    Items: Item120[]
  }
  
  export interface Item120 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Top2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue121[]
    Breakdown: Breakdown121
  }
  
  export interface TaxValue121 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown121 {
    Items: Item121[]
  }
  
  export interface Item121 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Fjd2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue122[]
    Breakdown: Breakdown122
  }
  
  export interface TaxValue122 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown122 {
    Items: Item122[]
  }
  
  export interface Item122 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Twd2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue123[]
    Breakdown: Breakdown123
  }
  
  export interface TaxValue123 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown123 {
    Items: Item123[]
  }
  
  export interface Item123 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Brl2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue124[]
    Breakdown: Breakdown124
  }
  
  export interface TaxValue124 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown124 {
    Items: Item124[]
  }
  
  export interface Item124 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Ngn2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue125[]
    Breakdown: Breakdown125
  }
  
  export interface TaxValue125 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown125 {
    Items: Item125[]
  }
  
  export interface Item125 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Bob2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue126[]
    Breakdown: Breakdown126
  }
  
  export interface TaxValue126 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown126 {
    Items: Item126[]
  }
  
  export interface Item126 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Pyg2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue127[]
    Breakdown: Breakdown127
  }
  
  export interface TaxValue127 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown127 {
    Items: Item127[]
  }
  
  export interface Item127 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Hnl2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue128[]
    Breakdown: Breakdown128
  }
  
  export interface TaxValue128 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown128 {
    Items: Item128[]
  }
  
  export interface Item128 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Wst2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue129[]
    Breakdown: Breakdown129
  }
  
  export interface TaxValue129 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown129 {
    Items: Item129[]
  }
  
  export interface Item129 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Hkd2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue130[]
    Breakdown: Breakdown130
  }
  
  export interface TaxValue130 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown130 {
    Items: Item130[]
  }
  
  export interface Item130 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Ars2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue131[]
    Breakdown: Breakdown131
  }
  
  export interface TaxValue131 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown131 {
    Items: Item131[]
  }
  
  export interface Item131 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Xpf2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue132[]
    Breakdown: Breakdown132
  }
  
  export interface TaxValue132 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown132 {
    Items: Item132[]
  }
  
  export interface Item132 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Uyu2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue133[]
    Breakdown: Breakdown133
  }
  
  export interface TaxValue133 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown133 {
    Items: Item133[]
  }
  
  export interface Item133 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Cdf2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue134[]
    Breakdown: Breakdown134
  }
  
  export interface TaxValue134 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown134 {
    Items: Item134[]
  }
  
  export interface Item134 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Mga2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue135[]
    Breakdown: Breakdown135
  }
  
  export interface TaxValue135 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown135 {
    Items: Item135[]
  }
  
  export interface Item135 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface Lbp2 {
    Currency: string
    GrossValue: number
    NetValue: number
    TaxValues: TaxValue136[]
    Breakdown: Breakdown136
  }
  
  export interface TaxValue136 {
    TaxRateCode: string
    Value: number
  }
  
  export interface Breakdown136 {
    Items: Item136[]
  }
  
  export interface Item136 {
    TaxRateCode: string
    NetValue: number
    TaxValue: number
  }
  
  export interface PaymentGateway {
    PaymentGatewayType: string
    PaymentCardStorageType: string
    IsMerchant: boolean
    Model: string
    SupportedCreditCardTypes: string[]
    SupportedPaymentMethods: SupportedPaymentMethods
    PublicKey: string
    DefaultCurrencyCode: string
    Accounts: Account[]
  }
  
  export interface SupportedPaymentMethods {
    PaymentCard: boolean
    Ideal: boolean
    ApplePay: boolean
    GooglePay: boolean
  }
  
  export interface Account {
    CurrencyCode: string
  }
  
  export interface Address {
    Line1: string
    Line2: any
    City: string
    PostalCode: string
    CountryCode: string
    Latitude: number
    Longitude: number
  }
  