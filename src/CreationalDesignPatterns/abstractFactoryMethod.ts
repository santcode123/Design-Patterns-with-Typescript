// abstract factory method

interface AbstractFactory {
    productA: ProductA;
    productB: ProductB;
    createProductA(): ProductA;
    createProductB(): ProductB;
    displayCollection(): string;
}

// productA can have multiple variants
interface ProductA {
    name: string;
    variant: string;
    getProductAVariant(): string;
    someProductAOperation(): string;
}

// productB can have multiple variants like Modern chair and old fashioned chair
interface ProductB {
    name: string;
    variant: string;
    someProductBOperation(): string;
    getProductBVariant(): string
}

// define two abstract factory classes that will contains some product variants

// two types of variants for productA
class ConcreteProductA1 implements ProductA {
    name: string;
    variant: string;
    constructor() {
        this.name = 'code-101';
        this.variant = 'variant-1';
    }
    public getProductAVariant() {
        return this.variant;
    }
    public someProductAOperation() {
        return `some opertion has happened on ${this.name}`
    }
}
class ConcreteProductA2 implements ProductA {
    name: string;
    variant: string;
    constructor() {
        this.name = 'code-102';
        this.variant = 'variant-2';
    }
    public getProductAVariant() {
        return this.variant;
    }
    public someProductAOperation() {
        return `some opertion has happened on ${this.name}`
    }
}

// two types of variant for productB
class ConcreteProductB1 implements ProductB {
    name: string;
    variant: string;
    constructor() {
        this.name = 'code-201';
        this.variant = 'variant-1';
    }
    public getProductBVariant() {
        return this.variant;
    }
    public someProductBOperation() {
        return `some opertion has happened on ${this.name}`
    }
}
class ConcreteProductB2 implements ProductB {
    name: string;
    variant: string;
    constructor() {
        this.name = 'code-202';
        this.variant = 'variant-1';
    }
    public getProductBVariant() {
        return this.variant;
    }
    public someProductBOperation() {
        return `some opertion has happened on ${this.name}`
    }
}

class ConcreteAbstarctFactoryForVariant1 implements AbstractFactory {
    productA: ProductA;
    productB: ProductB;
    constructor() {
        this.productA = this.createProductA();
        this.productB = this.createProductB();
    }

    public createProductA(): ProductA {
        return new ConcreteProductA1()
    }
    public createProductB(): ProductB {
        return new ConcreteProductB1();
    }
    public displayCollection(): string {
        const productAName = this.productA.name;
        const productBName = this.productB.name;
        return `Collection has following items: ${productAName}, ${productBName}`;
    }
}

class ConcreteAbstarctFactoryForVariant2 implements AbstractFactory {
    productA: ProductA;
    productB: ProductB;
    constructor() {
        this.productA = this.createProductA();
        this.productB = this.createProductB();
    }

    public createProductA(): ProductA {
        return new ConcreteProductA2()
    }
    public createProductB(): ProductB {
        return new ConcreteProductB2();
    }
    public displayCollection(): string {
        const productAName = this.productA.name;
        const productBName = this.productB.name;
        return `Collection has following items: ${productAName}, ${productBName}`;
    }
}


function clientCode(collectionVariant: string) {
    let abstractFactoryCollection = null;
    switch (collectionVariant) {
        case 'variant-1': {
            abstractFactoryCollection = new ConcreteAbstarctFactoryForVariant1();
            break;
        }
        case 'variant-2': {
            abstractFactoryCollection = new ConcreteAbstarctFactoryForVariant2();
            break;
        }
        default: {
            abstractFactoryCollection = new ConcreteAbstarctFactoryForVariant1();
        }
    }

    // do something with collection 
    const displayOuptPut = abstractFactoryCollection?.displayCollection();
    console.log(displayOuptPut);
}



clientCode('variant-1');
clientCode('variant-2');

/**
 * Q- create a system that will be responsible to send notifications over email, sms or push notifications.
 * we need to create the backend code and from client we will create a function and will pass to params to whom what notification message to be send
 * suppose we have two vendor1, and vendor2 vendor to send SMS , email or push notifications 
 */

// Solution

enum VendorEmum {
    A ='A',
    B= 'B'
}

interface INotification {
    send(to: number | string, message: string): void;
}

// concrete classes for each vendor to send the notifications
class EmailNotificationVendorA implements INotification {
    
    send(to: string, message: string) {
        // trigger the vendorA services to send the email notification 
        console.log(`email to ${to} has been sent successfully through vendor A services`);
    }
}

class EmailNotificationVendorB implements INotification {
    send(to: string, message: string) {
        // trigger the vendorB services to send the email notification 
        console.log(`email to ${to} has been sent successfully through vendor B services`);
    }
}

class SMSNotificationVendorA implements INotification {
    send(to: number, message: string) {
        // trigger the vendorA services to send the sms notification 
        console.log(`sms to ${to} has been sent successfully through vendor A services`);
    }
}

class SMSNotificationVendorB implements INotification {
    send(to: number, message: string) {
        // trigger the vendorB services to send the sms notification 
        console.log(`sms to ${to} has been sent successfully through vendor B services`);
    }
}

class PushNotificationVendorA implements INotification {
    send(to: number, message: string) {
        // trigger the vendorA services to send the push notification 
        console.log(`push notifications to ${to} has been sent successfully through vendor A services`);
    }
}

class PushNotificationVendorB implements INotification {
    send(to: number, message: string) {
        // trigger the vendorB services to send the push notification 
        console.log(`push notifications to ${to} has been sent successfully through vendor B services`);
    }
}


// create Abstract factory interface for the sending notification

interface NotificationsAbstractFactory {
    createEmailNotification(): INotification;
    createSMSNotification(): INotification;
    createPushNotification(): INotification;
}

// concrete abstract factory for each vendor

class NotificationsAbstractFactoryVendorA {
    createEmailNotification(): INotification {
        return new EmailNotificationVendorA();
    }
    createSMSNotification(): INotification {
        return new SMSNotificationVendorA();
    }
    createPushNotification(): INotification {
        return new PushNotificationVendorA();
    }
}

class NotificationsAbstractFactoryVendorB {
    createEmailNotification(): INotification {
        return new EmailNotificationVendorB();
    }
    createSMSNotification(): INotification {
        return new SMSNotificationVendorB();
    }
    createPushNotification(): INotification {
        return new PushNotificationVendorB();
    }
}

// backend service to send notifications
class NotificationService {
    private vendor: VendorEmum;
    private mobileNo?: string;
    private email?: string;
    private deviceId?: string;
    private message: string;

    constructor({ vendor, mobileNo, email, deviceId, message }: { vendor: VendorEmum; mobileNo?: string; email?: string; deviceId?: string; message: string }) {
        this.vendor = vendor;
        this.mobileNo = mobileNo;
        this.email = email;
        this.deviceId = deviceId;
        this.message = message;
    }

    private getFactory(vendor: VendorEmum): NotificationsAbstractFactory {
        switch (vendor) {
            case VendorEmum.A:
                return new NotificationsAbstractFactoryVendorA();
            case VendorEmum.B:
                return new NotificationsAbstractFactoryVendorB();
            default:
                throw new Error('Invalid vendor type');
        }
    }
    
    sendSMS() {
            const NotificationFactoryVendorA = this.getFactory(this.vendor)
            const smsNotificationFactory = NotificationFactoryVendorA.createSMSNotification();
           smsNotificationFactory.send(Number(this.mobileNo), this.message);
    }

    sendEmail() {
            const NotificationFactoryVendorA = this.getFactory(this.vendor);
            const emailNotificationFactory = NotificationFactoryVendorA.createEmailNotification();
            if (this.email) {
                emailNotificationFactory.send(this.email ?? '', this.message);
            }
    }

    sendPushNotification() {
            const NotificationFactoryVendorA = this.getFactory(this.vendor);
            const pushNotificationFactory = NotificationFactoryVendorA.createPushNotification();
            if (this.deviceId) {
                pushNotificationFactory.send(this.deviceId, this.message);
            }
       
    }
}

function clientCodeTesting() {

    // suppose i want to send notifcation through vendor A

    const notificationsService = new NotificationService({ vendor: VendorEmum.A, mobileNo: "8126244034", email: "euidsajrju@gmail.com", deviceId: "dsfwefLaptop", message: "Hey we are happy to announce that we are giviing you as one month trial period for our application services" });
    notificationsService.sendEmail();
    notificationsService.sendSMS();
    notificationsService.sendPushNotification();
}

