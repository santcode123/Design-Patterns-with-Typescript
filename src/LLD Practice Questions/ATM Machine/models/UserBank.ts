


export class UserBank {
    private balance: number;

    constructor({ openingBalance }: { openingBalance: number }) {
        this.balance = openingBalance;
    }


    public getBalance() {
        return this.balance;
    }

    public depositAmount(amount: number) {
        this.balance = this.balance + amount;
    }

    public withdrawAmount(amount: number) {
        if (this.balance < amount) {
            throw new Error('Bank balance is not sufficient for withdrawal');
        }

        this.balance = this.balance - amount;
    }
}