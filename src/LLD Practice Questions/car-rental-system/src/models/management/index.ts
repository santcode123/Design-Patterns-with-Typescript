import { Store } from "../store";
import { User } from "../user";


export class RentalSystem {
    storeList: Array<Store>;
    userList: Array<User>;

    constructor({ storeList, userList }: { storeList: Array<Store>; userList: Array<User> }) {
        this.storeList = storeList;
        this.userList = userList;
    }


    // add store 
    // remove store
    // add user
    // remove user
}