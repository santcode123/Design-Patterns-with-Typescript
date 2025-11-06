import { ATM } from "../ATM";
import { Card } from "../Card";
import { Options } from "../../enums/options";



export abstract class ATMState {
    public exit(atm: ATM) {
        throw new Error('Oops! Something went wrong');
    }
    public insertCard(card: Card, atm: ATM) {
        throw new Error('Oops! Something went wrong');
    }
    public withdraw(amount: number, card: Card, atm: ATM) {
        throw new Error('Oops!, Something went wrong!');
    }

    public checkBalance(card: Card) {
        throw new Error('Oops!, Something went wrong!');
    }

    public authenticatePin(pin: string, card: Card) {
        throw new Error('Oops!, Something went wrong!');
    }

    public selectOption(atm: ATM, option: Options) {
        throw new Error('Oops!, Something went wrong!');
    }
}