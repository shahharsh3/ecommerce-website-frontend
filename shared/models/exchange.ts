import { Product } from "./product";

export class Exchange {
    productId: number;
    offerId: number;
    name: string;
    description: string;
    category: string;
    brand: string;
    price: number;
    offerDiscount: number;
    quantity: number;
    errorMessage: string;
    successMessage: string;
    sellerEmailId: string;
    product: Product;
}