import { Card } from "./Card";
import { UserBank } from "./UserBank";


export class User {
    private name: string;
    private card: Card;
    private bankAccount: UserBank;


    constructor({ name, card, bankAccount }: { name: string; card: Card; bankAccount: UserBank }) {
        this.name = name;
        this.card = card;
        this.bankAccount = bankAccount;
    }

    public getCard() {
        return this.card;
    }

    public getBankInfo() {
        return this.bankAccount;
    }
}