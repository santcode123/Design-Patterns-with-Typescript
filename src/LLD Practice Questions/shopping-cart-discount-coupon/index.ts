import { Product, ProductType } from "./models/Product";
import { ShoppingCart } from "./models/ShoppingCart";




function couponDemo() {
    const item1 = new Product('A', ProductType.Furniture, 200);
    const item2 = new Product('B', ProductType.Gold, 1000);

    const shoppingCart = new ShoppingCart();
    shoppingCart.addToCart(item1);
    shoppingCart.addToCart(item2);

    const totalAmount = shoppingCart.getTotalAmount();

    console.log({ totalAmount });
}

couponDemo();