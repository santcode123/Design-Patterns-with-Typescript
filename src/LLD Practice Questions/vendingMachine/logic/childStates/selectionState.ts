import { VendingMachineState } from "../state";
import { Coin } from "../enums/Coin";
import { VendingMachine } from "../vendingMachine";
import { IdleState } from "./idleState";
import { DispenseState } from "./dispenseState";

export class SelectionState extends VendingMachineState {
    constructor() {
        console.log("currently machine is in selection state");
        super();
    }

    public chooseProduct(vendoingMachine: VendingMachine, codeNumber: number): void {
        const inventory = vendoingMachine.getInventory();
        const insertedCoins = vendoingMachine.getCoinList();

        const sumOfInsertedCoin = insertedCoins.reduce((acc, coin) => {
            return acc + coin;
        }, 0)

        const shelfLists = inventory.getInventory();

        const currentShelf = shelfLists.find(data => {
            // console.log("data=>", data);
            return data.getCode() == codeNumber;
        });

        console.log({ currentShelf, codeNumber, inventory })

        if (currentShelf) {
            const item = currentShelf.getItem();
            const itemPrice = item?.getPrice() ?? 0;


            if (sumOfInsertedCoin >= itemPrice) {
                const changeAmount = sumOfInsertedCoin - itemPrice;
                this.getChange(changeAmount);
                const dispenseState = new DispenseState();
                vendoingMachine.setCurrentState(dispenseState)

            } else {
                // if we insuffient amount then refund user amount and show insuffient error
                this.refundFullAmount(vendoingMachine);
                throw new Error("transaction declined due insuffient amount, please try again");
            }
        } else {
            throw new Error("Chosen product is not available for service");
        }
    }

    public refundFullAmount(vendingMachine: VendingMachine): void {
        console.log("please collect you inserted money from tray");

        const idleState = new IdleState();
        vendingMachine.setCurrentState(idleState);
    }

    public getChange(returnChangedMoney: number): number {


        if (returnChangedMoney > 0) {
            console.log(`please collect the change amont ${returnChangedMoney} from tray, meanwhile we are dispensing product`);
        }
        return returnChangedMoney;
    }
}