

import { ItemType } from "./enums/item";



class Item {
    itemType: ItemType | null;
    price: number | null;

    constructor({ itemType = null, price = null }: { itemType?: ItemType | null; price?: number | null } = {}) {
        this.itemType = itemType;
        this.price = price;
    }

    getPrice() {
        return this.price;
    }
    getItemType() {
        return this.itemType;
    }

    setPrice(price: number) {
        this.price = price;
    }
    setItemType(itemType: ItemType) {
        this.itemType = itemType;
    }
}

export { Item };