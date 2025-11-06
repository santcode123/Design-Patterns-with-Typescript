
import { Item } from "./Item";
import { Coin } from "./enums/Coin";
import { VendingMachine } from "./vendingMachine";

// interface VendingMachine {
//     state: VendingMachineState;
//     inventoryItems: Array<Item>
// }


// interface VendingMachineState {
//     clickOnInsertCoinBtn(vendoingMachine: VendingMachine): void;
//     insertCoin(vendoingMachine: VendingMachine, coin: Coin): void;

// }

/**
 * in interface we can not define default implementation in typescript as we do in java, instead we can use abstract class,
 * which is middle of interface and class, abstract class can not be instiated directly, abstarct methods are forced to implement 
 * in the child class
 * 
 * An abstract class in TypeScript is:
✅ A class that cannot be instantiated directly
✅ Can define abstract methods/properties — which have no implementation and must be implemented by derived (child) classes
✅ Can also provide shared concrete implementations (real method bodies) for some methods.

It’s a middle ground between interfaces (only contracts) and concrete classes (full implementations).
 */


abstract class VendingMachineState {
    public clickOnInsertCoinBtn(vendoingMachine: VendingMachine) {
        throw new Error('Insert coin is not supported in current state');
    }

    public insertCoin(vendoingMachine: VendingMachine, coin: Coin) {
        throw new Error('Insert coin operation is not supported in current state');
    }

    public clickOnStartProductSelectionBtn(vendoingMachine: VendingMachine) {
        throw new Error('selection of products button action is not allowed in the current state');
    }

    public chooseProduct(vendoingMachine: VendingMachine, codeNumber: number) {
        throw new Error('product selection is not allowed in the current state');
    }

    public getChange(returnChangedMoney: number): number {
        throw new Error('changing action is not allowed in the current state');
    }

    public dispenseProduct(vendoingMachine: VendingMachine, codeNumber: number) {
        throw new Error('dispense action is not allowed in the current state');
    }

    public refundFullAmount(vendoingMachine: VendingMachine): void {
        throw new Error('refund action is allowed in the current state');
    }

    public updateInventory(vendoingMachine: VendingMachine, item: Item, codeNumber: number) {
        throw new Error("update inventory action is not allowed in the current state");
    }
}

export { VendingMachineState };