export interface StocksObserver {
    observerId: string;
    update(): void;
}

export interface StocksObservable {
    add(obj: StocksObserver): void;
    remove(obj: StocksObserver): void;
    notify(): void;
    getStockCount(): number;
    setStockCount(n: number): void;
}