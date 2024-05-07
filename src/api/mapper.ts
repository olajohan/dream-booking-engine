import { IOccupancyPricing } from "../domain/IOccupancyPrice";
import { IRoomCategoryRate } from "../domain/IRoomCategoryRate";
import { IRoomCategoryWithAvailability } from "../domain/IRoomCategoryWithAvailability";
import { IApiHotel, IApiProduct, IApiRoomCategory } from "./IApiHotel";
import { IApiHotelAvailability, IApiRateGroup } from "./IApiHotelAvailability";
import { IApiOccupancyPricing } from "./IApiOccupancyPricing";


export function mapApiHoteltoDomainHotel(apiHotel: IApiHotel): IApiHotel {
    return { ...apiHotel }
}

export function mapApiRoomCategoryToDomainRoomCategory(apiRoomCategory: IApiRoomCategory[], apiHotel: IApiHotel): IApiRoomCategory[] {
    return { ...apiRoomCategory }
}

export function mapApiProductsToDomainProducts(apiProducts: IApiProduct[], apiHotel: IApiHotel): IApiProduct[] {
    return { 
        ...apiProducts
     }
}

export function mapApiHotelAvailabilityToDomainRoomCategoryWithAvailability(apiHotelAvailability: IApiHotelAvailability, domainRoomCategories: IApiRoomCategory[], languageCode: string, currencyCode: string): IRoomCategoryWithAvailability[] {

    return domainRoomCategories.map(domainRoomCategory => {

        return {
            ...domainRoomCategory,
            availableRoomCount: apiHotelAvailability.RoomCategoryAvailabilities.find(apiRoomCategoryAvailability => apiRoomCategoryAvailability.RoomCategoryId === domainRoomCategory.Id)?.AvailableRoomCount?? 0,
            rates: getRoomCategoryDomainRateGroups(domainRoomCategory.Id, apiHotelAvailability).flat()
        }
    })

    function getRoomCategoryDomainRateGroups(roomCategoryId: string, apiHotelAvailability: IApiHotelAvailability): IRoomCategoryRate[] {

        return apiHotelAvailability.Rates.flatMap(apiRate => {

            return apiHotelAvailability.RoomCategoryAvailabilities
                .find(apiRoomCategoryAvailability => apiRoomCategoryAvailability.RoomCategoryId === roomCategoryId)?.RoomOccupancyAvailabilities

                // Do not include rates that are not defined
                .filter(apiRoomOccupancyAvailability => {
                    return apiRoomOccupancyAvailability.Pricing.find(apiPricing => apiPricing.RateId === apiRate.Id)?.Price.Total !== undefined &&
                        apiRoomOccupancyAvailability.Pricing.find(apiPricing => apiPricing.RateId === apiRate.Id)?.Price.AveragePerNight !== undefined
                })
                .map(apiRoomOccupancyAvailability => {

                    return {
                        id: apiRate.Id,
                        sortOrder: apiRate.Ordering,
                        name: apiRate.Name[languageCode],
                        numberOfAdults: apiRoomOccupancyAvailability.AdultCount,
                        description: apiRate.Description[languageCode],
                        isPrivate: apiRate.IsPrivate,
                        pricePerNight: apiRoomOccupancyAvailability.Pricing.find(apiPricing => apiPricing.RateId === apiRate.Id)?.Price.AveragePerNight[currencyCode],
                        totalPrice: apiRoomOccupancyAvailability.Pricing.find(apiPricing => apiPricing.RateId === apiRate.Id)?.Price.Total[currencyCode]
                    }
                })?? []
        })

    }
}

export function mapApiOccupancyPricingToDomainOccupancyPrice(apiOccupancyPricing: IApiOccupancyPricing, rateId: string, currencyCode: string): IOccupancyPricing {
    
        const occpupancyPrice = apiOccupancyPricing.OccupancyPrices
            .find(apiOccupancyPrice => apiOccupancyPrice.Pricing
                .find(apiPricing => apiPricing.RateId === rateId))
        
        if (occpupancyPrice === undefined) {
            throw new Error(`RateId ${rateId} not found in occupancy pricing`)
        }

        const pricing = occpupancyPrice?.Pricing.find(apiPricing => apiPricing.RateId === rateId)
        const averagePricePerNight = pricing?.Price.AveragePerNight[currencyCode]
        const totalPrice = pricing?.Price.Total[currencyCode]
        const numberOfPersons = occpupancyPrice?.AdultCount

        return {
            numberOfPersons: numberOfPersons,
            averagePricePerNight: averagePricePerNight,
            totalPrice: totalPrice
        }
}

