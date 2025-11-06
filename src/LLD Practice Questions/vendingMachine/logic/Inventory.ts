import { ItemShelf } from "./itemshelf"
class Inventory {
    private inventoyList: ItemShelf[];

    constructor(n: number) {
        this.inventoyList = new Array(n).fill(new ItemShelf());
    }

    public getInventory() {
        return this.inventoyList;
    }

    public setInventory(inventoyList: Array<ItemShelf>) {
        this.inventoyList = inventoyList;
    }
}

export { Inventory };