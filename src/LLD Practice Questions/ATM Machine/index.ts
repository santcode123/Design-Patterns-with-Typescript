import { ATMRoom } from "./models/ATMRoom";
import { User } from "./models/User";
import { UserBank } from "./models/UserBank";
import { Card } from "./models/Card";
import { ATM } from "./models/ATM";


function runCode() {
    console.log("code execution started");
    const userBankAcc = new UserBank({ openingBalance: 10000 });
    const card = new Card({ customerName: 'Santosh', cardNumber: '123456789', cardPin: '1111', expiryDate: '08/32', cvv: 111, bankAcc: userBankAcc, limit: 10000 })
    const user = new User({ name: 'santosh', card, bankAccount: userBankAcc });

    const atm = new ATM({ twoThousandNotes: 2, fivehunderedNotes: 2, hunderedNotes: 7 });
    const atmRoom = new ATMRoom({ atm, user });

    atmRoom.successUseCaseTxn();
    console.info('--------------------');
    atmRoom.noChangeTxn();
    console.info('--------------------');
    atmRoom.inSufficientAtmBalance();
    console.log("code execution ended")
}

runCode();