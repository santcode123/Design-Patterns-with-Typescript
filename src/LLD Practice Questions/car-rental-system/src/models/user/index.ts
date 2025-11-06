export class User {
    userId: number;
    name: string;
    mobileNumber: number;
    license: License;
    gender: string;

    constructor({
        userId,
        name,
        mobileNumber,
        license,
        gender,
    }: {
        userId: number;
        name: string;
        mobileNumber: number;
        license: License;
        gender: string;
    }) {
        this.gender = gender;
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.userId = userId;
        this.license = license
    }



}
