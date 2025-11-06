import { Product, ProductType } from "./Product";



abstract class CouponDecorator extends Product {
    public product: Product;
    public maxDiscountAllowed: number;
    public discountPercentage: number;

    constructor(product: Product, discountPercentage: number, maximumDiscountAllowed = 500) {
        super(product.name, product.getProductType(), product.getPrice());
        this.product = product;
        this.discountPercentage = discountPercentage;
        this.maxDiscountAllowed = maximumDiscountAllowed;
    }

    abstract getPrice(): number;
}

export class PercentageDiscountCoupon extends CouponDecorator {
    getPrice(): number {
        const disPercentage = this.discountPercentage;

        const discountAmount = Math.floor((this.product.getPrice() * disPercentage) / 100)

        const finalPrice = this.product.getPrice() - Math.min(discountAmount, this.maxDiscountAllowed);

        return finalPrice;
    }
}


export class TypeBasedDiscountCoupon extends CouponDecorator {

    getPrice(): number {

        // suppose this discount is applicable for furnitures item only
        if (this.product.getProductType() === ProductType.Furniture) {
            const disPercentage = this.discountPercentage;

            const discountAmount = Math.floor((this.product.getPrice() * disPercentage) / 100)

            const finalPrice = this.product.getPrice() - Math.min(discountAmount, this.maxDiscountAllowed);

            return finalPrice;
        }
        return this.product.getPrice();
    }
}