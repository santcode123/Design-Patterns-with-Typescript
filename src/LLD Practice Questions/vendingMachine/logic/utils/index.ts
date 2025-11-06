import { ItemShelf } from "../itemshelf";
import { Item } from "../Item";
import { ItemType } from "../enums/item";
import { VendingMachine } from "../vendingMachine";


export function prefillVendingMachine(vendingMachine: VendingMachine, n: number) {
    const inventory = vendingMachine.getInventory();
    const shelfs: ItemShelf[] = vendingMachine.getInventory().getInventory();
    const updatedShelfs: ItemShelf[] = [];
    for (let i = 0; i < n; i++) {

        const newItem = new Item();

        if (i >= 0 && i < 3) {
            newItem.setItemType(ItemType.COKE);
            newItem.setPrice(12);
        }

        if (i >= 3 && i < 5) {
            newItem.setItemType(ItemType.PEPSI);
            newItem.setPrice(9);
        }

        if (i >= 5 && i < 7) {
            newItem.setItemType(ItemType.JUICE);
            newItem.setPrice(13);
        }

        if (i >= 7) {
            newItem.setItemType(ItemType.SODA);
            newItem.setPrice(8);
        }

        const currentShelf = shelfs[i];
        currentShelf.setItem(newItem);
        currentShelf.setSoldout(false);
        currentShelf.setCode(i);
        updatedShelfs.push(currentShelf);


    }

    // console.log("shelfs=>", updatedShelfs);

    inventory.setInventory(updatedShelfs);

    vendingMachine.setInventory(inventory);

}


export function displayInventory(vendingMachine: VendingMachine) {
    const inventory = vendingMachine.getInventory();

    const shelfs = inventory.getInventory();
    const n = shelfs.length;
    // as of now we are putting one item in one shelf , in future we can add functionality where we can add more
    for (let i = 0; i < n; i++) {
        const item = shelfs[i];

        console.log(item);
    }
}