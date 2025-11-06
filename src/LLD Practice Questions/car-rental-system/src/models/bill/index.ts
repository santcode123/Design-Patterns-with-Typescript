

abstract class RentCalculationStrategy {
    abstract calculateRent(): number;
}

class Bill {
    public billNumber: number;
    public amount: number;
    public reservation: any

    constructor({ billNumber }) {

    }

}