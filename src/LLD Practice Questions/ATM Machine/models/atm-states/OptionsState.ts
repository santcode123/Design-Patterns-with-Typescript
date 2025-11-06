import { Options } from "../../enums/options";
import { ATM } from "../ATM";
import { ATMState } from "./ATMState";
import { IdleState } from "./IdleState";
import { WithdrawalState } from "./WithdrawalState";

export class OptionsState extends ATMState {

    public selectOption(atm: ATM, option: Options): void {
        // currently we are supporting check balance and withdrawal options only
        switch (option) {
            case Options.WITHDRAW: {
                atm.setAtmState(new WithdrawalState());
                break;
            }

            case Options.CHECK_BALANCE: {
                // implementation of check balance state
            }

            default: {
                throw new Error('Selected Option is not supported!');
            }
        }
    }


    public exit(atm: ATM): void {
        atm.setAtmState(new IdleState());
        console.log('Cancelled, please remove your card!');
    }
}