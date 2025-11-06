

export class Location {
    address: string;
    pincode: number;
    state: string;
    constructor({ address, pincode, state }:
        { address: string; pincode: number; state: string }) {
        this.address = address;
        this.pincode = pincode;
        this.state = state;
    }
}