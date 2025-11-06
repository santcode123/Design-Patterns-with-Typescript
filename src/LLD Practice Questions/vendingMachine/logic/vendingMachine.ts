
import { Coin } from "./enums/Coin";
import { Inventory } from "./Inventory";
import { VendingMachineState } from './state';
import { IdleState } from "./childStates/idleState";


class VendingMachine {
    private coinList: Array<Coin>;
    private inventory: Inventory;
    private currentState: VendingMachineState;

    constructor() {
        this.currentState = new IdleState();
        this.inventory = new Inventory(10);
        this.coinList = [];
    }

    public getCurrentState() {
        return this.currentState;
    }
    public setCurrentState(state: VendingMachineState) {
        this.currentState = state;
    }

    public getInventory() {
        return this.inventory;
    }

    public setInventory(inventory: Inventory) {
        this.inventory = inventory;
    }

    public getCoinList() {
        return this.coinList;
    }
    public setCoinList(coinLists: Array<Coin>) {
        this.coinList = coinLists;
    }
}

export { VendingMachine };