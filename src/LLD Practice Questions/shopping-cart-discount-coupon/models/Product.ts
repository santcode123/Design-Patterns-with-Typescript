

export enum ProductType {
    Furniture = 1,
    Metal = 2,
    Gold = 3,
    Other = 4
}

export class Product {
    public name: string;
    public type: ProductType;
    public originalPrice: number;

    constructor(name: string, type: ProductType, originalPrice: number) {
        this.name = name;
        this.type = type;
        this.originalPrice = originalPrice;
    }

    public getPrice() {
        return this.originalPrice;
    }

    public getProductType() {
        return this.type;
    }
}