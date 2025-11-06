

export class DrivingLicense {
    private name: string;
    private licenseId: string;
    private address: string; // we can make a address model itself but let's keep these things simple as of now

    constructor({ name, licenseId, address }: { name: string; licenseId: string; address: string }) {
        this.name = name;
        this.address = address;
        this.licenseId = licenseId;
    }

    public getName() {
        return this.name;
    }

    public getLicenseId() {
        return this.licenseId;
    }

    public getAddress() {
        return this.address;
    }
}