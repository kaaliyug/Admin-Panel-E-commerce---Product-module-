import { ProductImage } from "./ProductImage";

 
export interface ProductInterface {
    id?: number;
    sku: string;
    name: string;
    price: number;
    images: ProductImage[]; 
}