import { createContext } from 'react';
import { Hotel } from '../api/Hotel.interface';
import { useImmerReducer } from 'use-immer';

export const initialHotelContextState = {
    Languages: [],
    Currencies: [],
    Countries: [],
    ImageBaseUrl: '',
    Id: '',
    Name: {
        'en-US': ''
    },
    Description: {
        'en-US': ''
    },
    CityId: '',
    ImageId: '',
    IntroImageId: '',
    DefaultLanguageCode: '',
    DefaultCurrencyCode: '',
    DefaultRateCurrencyCode: '',
    SupportedLanguageCodes: [],
    AcceptedCurrencyCodes: [],
    RoomCategories: [],
    Products: [],
    PaymentGateway: {
        PaymentGatewayType: '',
        IsMerchant: false,
        SupportedCreditCardTypes: [],
        PublicKey: ''
    },
    TermsAndConditionsUrl: '',
    IanaTimeZoneIdentifier: '',
    Email: '',
    Telephone: '',
    AdditionalLegalStatements: [],
    Address: {
        Line1: '',
        Line2: '',
        City: '',
        PostalCode: '',
        CountryCode: '',
        Latitude: undefined,
        Longitude: undefined
    }
}

export const HotelContext = createContext<Hotel>(initialHotelContextState);