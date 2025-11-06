
import { StocksObservable, StocksObserver } from './interfaces';

export class IphoneStocksObservableImp implements StocksObservable {
    private listOfObserver: Array<StocksObserver>;
    private currentStockQty;

    constructor() {
        this.listOfObserver = [];
        this.currentStockQty = 0;
    }
    add(obj: StocksObserver): void {
        this.listOfObserver.push(obj);
    }
    remove(obj: StocksObserver): void {
        this.listOfObserver = this.listOfObserver.filter((d: StocksObserver) => d.observerId !== obj.observerId);
    }

    notify(): void {
        this.listOfObserver.forEach(observer => {
            observer.update("Now I phone is in stock please purchase it now");
        })
    }
    setStockCount(n: number): void {
        if (this.currentStockQty === 0 && n > 0) {
            // this means i phone comes in stock
            this.notify(); // notify all the subscriber(observers)
        }
    }

    public getStockCount(): number {
        return this.currentStockQty;
    }

}