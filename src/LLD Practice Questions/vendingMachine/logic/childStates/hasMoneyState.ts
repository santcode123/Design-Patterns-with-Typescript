import { VendingMachineState } from "../state";
import { Coin } from '../enums/Coin';
import { VendingMachine } from "../vendingMachine";
import { SelectionState } from './selectionState';
import { IdleState } from "./idleState";


export class HasMoneyState extends VendingMachineState {

    constructor() {
        super();
        console.log("currently machine is in has money state");
    }

    public insertCoin(vendoingMachine: VendingMachine, coin: Coin): void {
        const coinList = vendoingMachine.getCoinList();
        coinList.push(coin);
        vendoingMachine.setCoinList(coinList);
    }

    public clickOnStartProductSelectionBtn(vendingMachine: VendingMachine): void {
        const selectionState = new SelectionState();
        vendingMachine.setCurrentState(selectionState);
    }

    public refundFullAmount(vendingMachine: VendingMachine): void {
        // implement refund logic
        console.log("please collect your inserted amount from tray");
        const idleState = new IdleState();

        vendingMachine.setCurrentState(idleState);
    }
}