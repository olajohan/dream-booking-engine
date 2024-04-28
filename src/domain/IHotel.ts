import { IProduct } from "./IProduct";
import { IRoomCategory } from "./IRoomCategory";

export interface IHotel {
    name: string;
    description: string;
    address: string;
    city: string;
    zip: string;
    phone: string;
    email: string;
    imageBaseUrl: string;
    roomCategories: IRoomCategory[];
    products: IProduct[]
    TermsAndConditionsUrl: string
}