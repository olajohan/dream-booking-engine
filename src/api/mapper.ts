import { IHotel } from "../domain/IHotel";
import { IOccupancyPricing } from "../domain/IOccupancyPrice";
import { IProduct } from "../domain/IProduct";
import { IRate } from "../domain/IRate";
import { IRoomCategory } from "../domain/IRoomCategory";
import { IRoomCategoryWithAvailability } from "../domain/IRoomCategoryWithAvailability";
import { IApiHotel, IApiProduct, IApiRoomCategory } from "./IApiHotel";
import { IApiHotelAvailability, RateGroup } from "./IApiHotelAvailability";
import { IApiOccupancyPricing } from "./IApiOccupancyPricing";


export function mapApiHoteltoDomainHotel(apiHotel: IApiHotel): IHotel {
    return {
        name: apiHotel.Name["en-US"],
        description: apiHotel.Description["en-US"],
        address: apiHotel.Address.Line1,
        city: apiHotel.Address.City,
        zip: apiHotel.Address.PostalCode,
        phone: apiHotel.Telephone,
        email: apiHotel.Email,
        imageBaseUrl: apiHotel.ImageBaseUrl,
        roomCategories: mapApiRoomCategoryToDomainRoomCategory(apiHotel.RoomCategories, apiHotel),
        products: mapApiProductsToDomainProducts(apiHotel.Products, apiHotel),
        TermsAndConditionsUrl: apiHotel.TermsAndConditionsUrl
    }
}

export function mapApiRoomCategoryToDomainRoomCategory(apiRoomCategory: IApiRoomCategory[], apiHotel: IApiHotel): IRoomCategory[] {
    return apiHotel.RoomCategories.map(apiRoomCategory => {
        return {
            id: apiRoomCategory.Id,
            name: apiRoomCategory.Name["en-US"],
            description: apiRoomCategory.Description["en-US"],
            imageUrls: apiRoomCategory.ImageIds.map(imageId => `${apiHotel.ImageBaseUrl}/${imageId}`),
            maxOccupancy: apiRoomCategory.NormalBedCount,
            sortOrder: apiRoomCategory.Ordering
        }
    })
}

export function mapApiProductsToDomainProducts(apiProducts: IApiProduct[], apiHotel: IApiHotel): IProduct[] {
    return apiProducts.map(apiProduct => {
        return {
            id: apiProduct.Id,
            name: apiProduct.Name["en-US"],
            description: apiProduct.Description["en-US"],
            categoryId: apiProduct.CategoryId,
            imageUrl: `${apiHotel.ImageBaseUrl}/${apiProduct.ImageId}` ?? null,
            includedByDefault: apiProduct.IncludedByDefault,
            alwaysIncluded: apiProduct.AlwaysIncluded,
            price: apiProduct.Prices.NOK
        }
    })
}

export function mapApiHotelAvailabilityToDomainRoomCategoryWithAvailability(apiHotelAvailability: IApiHotelAvailability, domainRoomCategories: IRoomCategory[]): IRoomCategoryWithAvailability[] {

    return domainRoomCategories.map(domainRoomCategory => {

        return {
            ...domainRoomCategory,
            availableRoomCount: apiHotelAvailability.RoomCategoryAvailabilities.find(apiRoomCategoryAvailability => apiRoomCategoryAvailability.RoomCategoryId === domainRoomCategory.id)?.AvailableRoomCount?? 0,
            rates: getRoomCategoryDomainRateGroups(domainRoomCategory.id, apiHotelAvailability).flat()
        }
    })

    function getRoomCategoryDomainRateGroups(roomCategoryId: string, apiHotelAvailability: IApiHotelAvailability): IRate[] {

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
                        name: apiRate.Name["en-US"],
                        numberOfAdults: apiRoomOccupancyAvailability.AdultCount,
                        description: apiRate.Description["en-US"],
                        isPrivate: apiRate.IsPrivate,
                        pricePerNight: apiRoomOccupancyAvailability.Pricing.find(apiPricing => apiPricing.RateId === apiRate.Id)?.Price.AveragePerNight,
                        totalPrice: apiRoomOccupancyAvailability.Pricing.find(apiPricing => apiPricing.RateId === apiRate.Id)?.Price.Total
                    }
                })?? []
        })

    }
}

export function mapApiOccupancyPricingToDomainOccupancyPrice(apiOccupancyPricing: IApiOccupancyPricing, rateId: string): IOccupancyPricing {
    
        const occpupancyPrice = apiOccupancyPricing.OccupancyPrices
            .find(apiOccupancyPrice => apiOccupancyPrice.Pricing
                .find(apiPricing => apiPricing.RateId === rateId))
        
        if (occpupancyPrice === undefined) {
            throw new Error(`RateId ${rateId} not found in occupancy pricing`)
        }

        const pricing = occpupancyPrice?.Pricing.find(apiPricing => apiPricing.RateId === rateId)
        const averagePricePerNight = pricing?.Price.AveragePerNight.NOK
        const totalPrice = pricing?.Price.Total.NOK
        const numberOfPersons = occpupancyPrice?.AdultCount

        return {
            numberOfPersons: numberOfPersons,
            averagePricePerNight: averagePricePerNight,
            totalPrice: totalPrice
        }
}

