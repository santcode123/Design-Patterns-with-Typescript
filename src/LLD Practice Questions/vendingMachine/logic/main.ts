
import { VendingMachine } from "./vendingMachine";
import { displayInventory, prefillVendingMachine } from './utils';
import { Coin } from "./enums/Coin";


function main() {
    try {
        console.log("testing vending machine...");

        const vendingMachine = new VendingMachine();

        // prefill the 10 items in the vending machine

        prefillVendingMachine(vendingMachine, 10);

        console.log("we have filled the vending machine as per requirements...")

        // display the inventory

        console.log("displaying inventory..");

        displayInventory(vendingMachine);

        console.log("click on insert money button");

        let currentState = vendingMachine.getCurrentState();
        currentState.clickOnInsertCoinBtn(vendingMachine);
        // if click on insert button is not supported then that method will throw the error
        currentState = vendingMachine.getCurrentState();
        console.log("inserting 5, and 25 coin");
        currentState.insertCoin(vendingMachine, Coin.NICKLE);
        currentState.insertCoin(vendingMachine, Coin.QUARTER);

        // now click on select Item

        console.log("clicking on select item button (product selection btn)");
        currentState.clickOnStartProductSelectionBtn(vendingMachine);
        currentState = vendingMachine.getCurrentState();

        console.log("choosing product with code 9");
        currentState.chooseProduct(vendingMachine, 9);

        currentState = vendingMachine.getCurrentState();
        currentState.dispenseProduct(vendingMachine, 9);
    } catch (err) {
        console.log("error=>", err);
    }

}

export { main };


