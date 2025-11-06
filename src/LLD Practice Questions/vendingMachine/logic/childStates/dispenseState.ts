import { VendingMachineState } from "../state";
import { VendingMachine } from "../vendingMachine";


export class DispenseState extends VendingMachineState {
    constructor() {
        console.log("machine in dispense state.., please wait")
        super();
    }

    public dispenseProduct(vendoingMachine: VendingMachine, codeNumber: number): void {
        console.log("we have dispensed the product please collect from the product tray");
    }
}