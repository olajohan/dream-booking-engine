import dayjs from 'dayjs'
import { Dayjs } from 'dayjs'
import { DateRange } from '@mui/x-date-pickers-pro';
import utc from 'dayjs/plugin/utc';
import { Hotel, OccupancyData } from './Hotel.interface'
import { AccommodationAvailability } from './AccommodationAvailability.interface';
import { ServiceAvailability } from './ServiceAvailability.interface';
dayjs.extend(utc)

const ENVIRONMENT: 'demo' | 'production' = 'demo'
const mews = {
    clientId: "lyngen-north-booking",
    enterpriseIds: {
        production: '8a8d2f24-1b50-4c79-911c-b13400aabef0',
        demo: '3edbe1b4-6739-40b7-81b3-d369d9469c48'
    },
    serviceIds: {

        accommodation: {
            production: 'bb5df830-617a-4f24-a923-b13400aac986',
            demo: '1468c29c-8e3b-4466-b50d-b14c00d03fa2'
        }
    },
    ageCatoryIds: {
        production: '440e5dee-266e-453d-943e-b13400aac99f',
        demo: 'be196482-e7d9-4dc0-a2d2-b14c00d03fa3'
    },
    configurationIds: {
        production: '5029b848-7bc5-4b36-9044-b13400aace5c',
        demo: 'f8950fea-1f91-45bf-ac31-b14c00d03fde'
    },
    apiEnvironments: {
        production: 'https://api.mews.com',
        demo: 'https://api.mews-demo.com'
    },
    roomsMappedToIds: {
        production: {
            igloo360: '92ac9460-d3a0-43af-a33f-b13400aacfbe',
            igloo1801: '4e4082b5-71ac-4ea4-b107-b1340150f566',
            igloo1802: 'a0ecba10-b527-4874-924c-b13400aacfbe',
            skySuite: '9eb71fa5-2653-4c21-8c12-b13400aacfbe',
            seaCabin: '1314e78d-a97e-42c9-883a-b13400aacfbe'
        },
        demo: {
            igloo360: '230bd277-0a83-4007-8d91-b14c00e65498',
            igloo1801: '6926e496-c41a-422e-a701-b14c00e63bde',
            igloo1802: '725d44e6-24bc-43fa-96c2-b14c00e6794e',
            skySuite: 'f5b5855d-d646-45bf-8734-b14c00e68a5b',
            seaCabin: '54b36280-9ab4-4361-a4e6-b14c00e69522'
        }
    }
}
const DEFAULT_OCCUPANCY_DATA = [{ "AgeCategoryId": mews.ageCatoryIds[ENVIRONMENT], "PersonCount": 2 }]

export function getHotel(): Promise<Hotel> {

    return fetch(
        mews.apiEnvironments[ENVIRONMENT] + '/api/distributor/v1/hotels/get', {
        method: "POST",
        body: JSON.stringify({
            "Client": mews.clientId,
            "HotelId": mews.enterpriseIds[ENVIRONMENT],

        })
    }).then((response) => {
        return response.json() as Promise<Hotel>
    }).then((getHotelResponse) => {
        return getHotelResponse
    })
}

export function getHotelAvailability(
    startDate: Dayjs, 
    endDate: Dayjs,
    occupancyData: OccupancyData[] = DEFAULT_OCCUPANCY_DATA): Promise<AccommodationAvailability> {

    return fetch(
        mews.apiEnvironments[ENVIRONMENT] + '/api/distributor/v1/hotels/getAvailability', {
        method: "POST",
        body: JSON.stringify({
            "Client": mews.clientId,
            "ConfigurationId": mews.configurationIds[ENVIRONMENT],
            "HotelId": mews.enterpriseIds[ENVIRONMENT],
            "StartUtc": startDate.startOf('day').toISOString(),
            "EndUtc": endDate.startOf('day').toISOString(),
            "OccupancyData": occupancyData,
        })
    }
    ).then((response) => {
        return response.json() as Promise<AccommodationAvailability>
    }).then((availability) => {
        return availability
    })
}

export function getAccommodationServiceAvailability(
    startDate: Dayjs,
    endDate: Dayjs,
    categoryIds: string[] = Object.values(mews.roomsMappedToIds[ENVIRONMENT])
): Promise<ServiceAvailability> {

    return getServiceAvailability(
        startDate, 
        endDate,
        mews.serviceIds.accommodation[ENVIRONMENT],
        categoryIds 
    )
}

function getServiceAvailability(
    startDate: Dayjs,
    endDate: Dayjs,
    serviceId: string,
    categoryIds: string[]
): Promise<ServiceAvailability> {

    return fetch(mews.apiEnvironments[ENVIRONMENT] + '/api/distributor/v1/services/getAvailability', {
        method: "POST",
        body: JSON.stringify({
            "Client": mews.clientId,
            "EnterpriseId": mews.enterpriseIds[ENVIRONMENT],
            "StartUtc": startDate.toISOString(),
            "EndUtc": endDate.toISOString(),
            "ServiceId": serviceId,
            "CategoryIds": categoryIds,
        })
    }).then((response) => {
        return response.json() as Promise<ServiceAvailability>
    }).then((serviceAvailability) => {        
        return serviceAvailability
    })
}



