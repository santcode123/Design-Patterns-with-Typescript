import { Item } from './Item';

class ItemShelf {
    item: Item | null;
    code: number | null;
    soldOut: boolean;

    constructor() {
        this.item = null;
        this.code = null;
        this.soldOut = true;
    }

    getItem() {
        return this.item;
    }
    setItem(item: Item) {
        this.item = item;
    }
    getCode() {
        return this.code;
    }

    setCode(code: number) {
        this.code = code;
    }

    getSoldOut() {
        return this.getSoldOut;
    }

    setSoldout(hasSoldOut: boolean) {
        this.soldOut = hasSoldOut;
    }

}


export { ItemShelf };