export interface ICreateSale {
    clientId: number;
    products: IProductCount[];
}

export interface IProductCount {
    productId: number;
    name: string
    count: number;
    amount: number;
}