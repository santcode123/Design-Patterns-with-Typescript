import { Options } from "../enums/options";
import { ATM } from "./ATM";
import { OptionsState } from "./atm-states/OptionsState";
import { Card } from "./Card";
import { User } from "./User";
import { UserBank } from "./UserBank";



export class ATMRoom {
    private user: User;
    private atm: ATM;

    constructor({ user, atm }: { user: User; atm: ATM }) {
        this.user = user;
        this.atm = atm;
    }

    public successUseCaseTxn() {
        // insert the card
        let atmState = this.atm.getAtmState();
        const card = this.user.getCard();
        atmState.insertCard(card, this.atm);

        // now we need to autheticate the pin

        atmState = this.atm.getAtmState();
        console.log("user has entered 1111");
        atmState.authenticatePin('1111', card);

        // now user has selected withdrawal option
        this.atm.setAtmState(new OptionsState());

        atmState = this.atm.getAtmState();

        atmState.selectOption(this.atm, Options.WITHDRAW);

        // suppose user has entered 1500 amount
        atmState = this.atm.getAtmState();
        const amount = 1500;

        atmState.withdraw(amount, card, this.atm);
    }

    public noChangeTxn() {
        try {
            // insert the card
            console.log("no changes are available use case")
            let atmState = this.atm.getAtmState();
            const card = this.user.getCard();
            atmState.insertCard(card, this.atm);

            // now we need to autheticate the pin

            atmState = this.atm.getAtmState();
            console.log("user has entered 1111");
            atmState.authenticatePin('1111', card);

            // now user has selected withdrawal option
            this.atm.setAtmState(new OptionsState());

            atmState = this.atm.getAtmState();

            atmState.selectOption(this.atm, Options.WITHDRAW);

            // suppose user has entered 1500 amount
            atmState = this.atm.getAtmState();
            const amount = 1500;

            atmState.withdraw(amount, card, this.atm);
        } catch (err: any) {
            const message = err.message;
            console.log(message);
        }

    }

    public inSufficientAtmBalance() {
        try {
            // insert the card
            console.log("in suffient fund at atm")
            let atmState = this.atm.getAtmState();
            const card = this.user.getCard();
            atmState.insertCard(card, this.atm);

            // now we need to autheticate the pin

            atmState = this.atm.getAtmState();
            console.log("user has entered 1111");
            atmState.authenticatePin('1111', card);

            // now user has selected withdrawal option
            this.atm.setAtmState(new OptionsState());

            atmState = this.atm.getAtmState();

            atmState.selectOption(this.atm, Options.WITHDRAW);

            // suppose user has entered 1500 amount
            atmState = this.atm.getAtmState();
            const amount = 5000;

            atmState.withdraw(amount, card, this.atm);
        } catch (err: any) {
            const message = err.message;
            console.log(message);
        }
    }
}