import { IProduct } from './product';
import { IClient } from "./client";

export interface ISales {
    clientId: number;
    client: IClient;
    total: number;
    details: ISalesDetails[];
}

export interface ISalesDetails {
    quantity: number;
    subtotal: number;
    productId: number;
    product: IProduct;
    saleId: number;
    sale: ISales;
}