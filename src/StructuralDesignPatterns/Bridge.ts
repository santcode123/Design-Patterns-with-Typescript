// bridge is also a structural design patterns, below we will code one trivial example


/**
 * example -> create a code base for remote and tv and redio, remote is used for radio and tv
 */

class RemoteController{
    protected device: Device;
    constructor(device: Device){
        this.device = device;
    }

    public increaseVolume(): boolean {
         try{
            const device = this.device;
            device.increaseVolume(1);
            return true
         } catch(err){
            // log the error in sentry
            return false;
         }
    }

    public deCreaseVolume(): boolean{
        try{
            const device = this.device;
            device.decreaseVolume(1);
            return true
         } catch(err){
            // log the error in sentry
            return false;
         }
    }
    public getDeviceName(): string{
        const device = this.device;
        return device.getDeviceName();
    }
}

class ModernRemote extends RemoteController{
    mute(){
        const device = this.device;
        device.setVolume(0);
    }
}


interface Device{
    setVolume(newVolume: number): void;
    increaseVolume(increaseBy: number): void;
    decreaseVolume(decreaseBy: number): void;
    getDeviceName(): string;
}


class TV implements Device{
    private deviceName: string;
    private volume: number;
    constructor({deviceName}:{deviceName: string}){
        this.deviceName = deviceName;
        this.volume = 0;
    }
    public setVolume(newVolume: number): void{
       this.volume = newVolume;
    }
    public increaseVolume(increaseBy: number): void {
        this.volume += increaseBy;
        console.log('TV volume has been increased');
    }
    public decreaseVolume(decreaseBy: number): void {
        this.volume = this.volume - decreaseBy;
        console.log('TV volume has decreased');
    }
    public getDeviceName():string{
            return this.deviceName;
    }
}

class Radio implements Device{
    // in this example methods implementation looks same only but it can be different in real codebase
    private deviceName: string;
    private volume: number;
    constructor({deviceName}:{deviceName: string}){
        this.deviceName = deviceName;
        this.volume = 0;
    }
    public setVolume(newVolume: number): void{
        // set volume implementation can be different from TV setVolume implementation
       this.volume = newVolume;
    }
    public increaseVolume(increaseBy: number): void {
        this.volume += increaseBy;
        console.log('Radio volume has been increased');
    }
    public decreaseVolume(decreaseBy: number): void {
        this.volume = this.volume - decreaseBy;
        console.log('Radio volume has been decreased');
    }
    public getDeviceName():string{
            return this.deviceName;
    }
}



function clientCode(remote: RemoteController){
    // client code can work only with remote object, will use all the functionality of remote obj, without bothering about implementation logi
    console.log(`Volume testing for:${remote.getDeviceName()}`);
    remote.increaseVolume();
    remote.deCreaseVolume();
}

// testing bridge patterns

const tv = new TV({deviceName: 'Santosh tv'});
const tvRemote = new RemoteController(tv);
clientCode(tvRemote);

const radio = new Radio({deviceName: "Santosh Radio"});
const radioRemote = new RemoteController(radio);
clientCode(radioRemote);