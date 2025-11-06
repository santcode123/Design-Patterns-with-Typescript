// while clicking on notify me, we might give multiple options to the user and user can select how they want the notfication
// i.e over the mail or phone notification

import { StocksObserver, StocksObservable } from './interfaces';

export class MailAlertNotificationIml implements StocksObserver {
    observerId: string;
    private observableObj: StocksObservable;


    constructor({ email, observableObj }: { email: string; observableObj: StocksObservable }) {
        this.observerId = email;
        this.observableObj = observableObj;
    }

    update(): void {
        // we can get the data here from observable obj and send the mail accordingly
        const currentStockQty = this.observableObj.getStockCount();
        // using third party send the mail to the client on given mail id
        this.sendMail();
    }

    sendMail() {
        console.log("mail sent on given mail id");
    }
}

export class PhoneAlertNotification implements StocksObserver {
    observerId: string; // device id
    private observableObj: StocksObservable;


    constructor({ deviceId, observableObj }: { deviceId: string; observableObj: StocksObservable }) {
        this.observerId = deviceId;
        this.observableObj = observableObj;
    }

    update(): void {
        // we can get the data here from observable obj and send the mail accordingly
        const currentStockQty = this.observableObj.getStockCount();
        // using third party send the mail to the client on given mail id
        this.phoneAlert();
    }

    phoneAlert() {
        // using device id we can sent the andriod alerts 
        console.log("Phone Alert has been sent");
    }
}