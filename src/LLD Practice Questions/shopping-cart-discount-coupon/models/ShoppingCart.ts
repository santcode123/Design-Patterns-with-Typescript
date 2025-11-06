

import { PercentageDiscountCoupon, TypeBasedDiscountCoupon } from "./Coupon";
import { Product } from "./Product";

export class ShoppingCart {
    public listOfProducts: Array<Product>;

    constructor() {
        this.listOfProducts = [];
    }

    public addToCart(product: Product) {
        // logic to add discount coupons here
        // let's add 10% discount on all items and 20% on furnitures
        const productWithCoupon = new TypeBasedDiscountCoupon(new PercentageDiscountCoupon(product, 10, 1000), 20, 1000);
        this.listOfProducts.push(productWithCoupon);
    }

    public getTotalAmount() {
        const totalAmount = this.listOfProducts.reduce((sum: number, ele: Product) => {
            return sum + ele.getPrice();
        }, 0)

        return totalAmount;
    }

}