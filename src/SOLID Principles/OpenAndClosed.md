## open and closed principle.

this principle states that classes once implemented then later on they are open for extension not for modification.

Example: Suppose some fresher joined the company and they are implementing the payment feature and they have written the code as follows:

```
interface UserInfo {
    name: string;
    mobileNo: string;
    country: string;
}

// utilities

function sendSMS({mobileNo, message}){
    // send the sms to given mobile number;
}

// class
class PaymentProcessor {
    private customerName: string;
    private mobileNo: string;
    private country: string;

    constructor(usersInfo: UserInfo){
        const { name, mobileNo, country } = userInfo;
        this.customerName = name;
        this.mobileNo = mobileNo;
        this.country = country;
    }
    processCreditCardPayment(amount: number): void {
        console.log(`Processing credit card payment of $${amount}`);

        // after payment successful send the message to mobileNo
        sendSMS({mobileNo, message: `${amount} has been debited from credit card`});

    }

    processPayPalPayment(amount: number): void {
        console.log(`Processing PayPal payment of $${amount}`);

         // after payment successful send the message to mobileNo
        sendSMS({mobileNo, message: `${amount} has been debited from paypal`});
    }

    processBitcoinPayment(amount: number): void {
        console.log(`Processing Bitcoin payment of $${amount}`);

         // after payment successful send the message to mobileNo
        sendSMS({mobileNo, message: `${amount} has been debited from BitCoin`});
    }
}

// Usage
const paymentProcessor = new PaymentProcessor({name:'Santosh', mobileNo:'8126244034', country: 'India'});
paymentProcessor.processCreditCardPayment(100);
paymentProcessor.processPayPalPayment(200);
paymentProcessor.processBitcoinPayment(300);

```

PitFalls in above code:
1. class is tightly coupled with payment methods and if we want to support one more payment in future, according to above code we need to modify the class again, which voilates the open ans closed principle.

Correct Implementation:

```
interfacee UserInfo {
    name: string;
    mobileNo: string;
    country: string;
    amount: number;
}

interface PaymenyMethod{
    process(): void;
}
interface SendSMS {
    sendMessage(mobileNo, message): void {
        // default sending service code here 
    }
}

abstract class PaymentService implements PaymentMethod{
    private customerName: string;
    private mobileNo: string;
    private country: string;
    private amount: number;

    constructor(userInfo: UserInfo){
        super();
        const { name, mobileNo, country, amount } = userInfo;
        this.customerName = name;
        this.mobileNo = mobileNo;
        this.country = country;
        this.amount = amount;
    }

    abstract process(): void;
}

class CreditCardPaymentService extends AbstractPaymentService {
    process(): void {
        // Logic related to credit card payment
        console.log('Processing credit card payment');
        this.sendSMS(); // Call sendSMS as needed
    }
}

class PayPalPaymentService implements PaymentService {
    private userInfo: UserInfo;

    constructor(userInfo: UserInfo) {
        this.userInfo = userInfo;
    }

    process(): void {
        // Logic related to PayPal payment
        console.log('Processing PayPal payment');
    }
}

function clientCode(userInfo){
    // pay via credit card

    const paymentService = new creditCardPaymentService(userInfo);
    paymentService.process();
}

```