export class License {
    licenseId: number;
    idPic: string;

    constructor({ licenseId, idPic }: { licenseId: number, idPic: string }) {
        this.licenseId = licenseId;
        this.idPic = idPic;
    }

    updateLicensePic(picUrl: string) {
        this.idPic = picUrl;
    }
}