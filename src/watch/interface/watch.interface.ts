export interface Watch{
    id: string;
    name: string;
    brand: string;
    price: number | null;
    purchaseAt?: Date;
    userId: string; 
}