

import { VendingMachineState } from '../state';
import { VendingMachine } from '../vendingMachine';
import { HasMoneyState } from './hasMoneyState';


export class IdleState extends VendingMachineState {

    constructor() {
        super();

        console.log("Currently vending machine is in idle state");

    }

    public clickOnInsertCoinBtn(vendingMachine: VendingMachine) {
        // set new state of the machine
        const hasMoneyState = new HasMoneyState();
        vendingMachine.setCurrentState(hasMoneyState);
    }
}