// this method is helpful to copy an existing obj into new object and using clone method irrespective of knowing the class structure.

/**
 * The Prototype Pattern is a creational design pattern used when creating an object is expensive and 
 * cloning an existing object is more efficient. 
 * Instead of instantiating a new object from scratch, we duplicate (clone) an existing object.
 */

class ProtypeDemo {
    private primaryKey: string;
    public name: string;
    public address: Object;
    constructor({ primaryKey, name, address }: { primaryKey: string; name: string; address: Object }) {
        this.primaryKey = primaryKey;
        this.name = name;
        this.address = address;
    }

    public clone() {
        const newObj = new ProtypeDemo({ primaryKey: this.primaryKey, name: this.name, address: this.address });
        return newObj;
    }
}


function clientCode1() {
    // create an object
    const obj1 = new ProtypeDemo({ primaryKey: '1', name: 'santosh', address: { a: 2 } })
    const clonedObj = obj1.clone();
    console.log(obj1);
    console.log(clonedObj);

    // check deep cloning or not
    console.log(obj1.address == clonedObj.address) // should return false as we are doing deep clone 
}
clientCode1();