
import { UserBank } from "./UserBank";

export class Card {
    private customerName: string;
    private cardNumber: string;
    private cardPin: string;
    private expiryDate: string;
    private cvv: number;
    private limit: number;
    private bankAcc: UserBank;


    constructor({ customerName, cardNumber, cardPin, expiryDate, cvv, bankAcc, limit = 10000 }: {
        customerName: string;
        cardPin: string;
        expiryDate: string;
        cvv: number;
        limit: number;
        bankAcc: UserBank
        cardNumber: string;
    }) {
        this.customerName = customerName;
        this.expiryDate = expiryDate;
        this.cardPin = cardPin;
        this.cvv = cvv;
        this.limit = limit; // it's daily limit that user can withdraw the money
        this.bankAcc = bankAcc;
        this.cardNumber = cardNumber;
    }

    public authenticatePin(pinNumber: string) {
        return this.cardPin === pinNumber;
    }

    public withdrawMoney(amount: number,) {
        if (amount > this.limit) {
            throw new Error('Amount exeeds the card daily limit')
        }

        if (amount > this.bankAcc.getBalance()) {
            throw new Error('Bank balance is not sufficient for withdrawal');
        }
        // some logic will go here
        this.bankAcc.withdrawAmount(amount); // insufficient balance will handled by bank account itself so we do not need to implement here

    }

    public checkBalance() {
        return this.bankAcc.getBalance(); // card balance represents the bank balance only
    }

    public getCardNumber() {
        return this.cardNumber;
    }

    public isValidPin(pin: string) {
        return pin === this.cardPin;
    }

    public getBankAccount() {
        return this.bankAcc;
    }
}