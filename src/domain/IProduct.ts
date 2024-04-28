
export interface IProduct {
    id: string
    name: string
    description: string
    categoryId: string
    imageUrl?: string
    includedByDefault: boolean
    alwaysIncluded: boolean
    price: number
}