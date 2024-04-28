export interface IRoomCategory {
    id: string;
    name: string;
    description: string;
    imageUrls: string[];
    maxOccupancy: number;
    sortOrder: number;
}