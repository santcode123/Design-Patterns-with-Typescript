// interfaces
interface Product {
    operation(): string;
}


abstract class Creator {
    constructor() {
        console.log(' creator constructor called...');
    }

    public abstract factoryMethod(): Product;
    public someBizlogic() {
        console.log('calling common biz logic from abstract class');
        const product = this.factoryMethod();
        console.log(`product operation:${product.operation()}`);
    }
}

class ConcreteCreator1 extends Creator {
    constructor() {
        super();
        console.log('ConctreteCrreator1 constructor has been called...');
    }
    public factoryMethod(): Product {
        return new Product1();
    }
}

class ConcreteCreator2 extends Creator {
    constructor() {
        super();
        console.log('ConctreteCrreator2 constructor has been called...');
    }
    public factoryMethod(): Product {
        return new Product2();
    }
}

class Product1 implements Product {
    operation(): string {
        return `Product 1 has been called`;
    }
}
class Product2 implements Product {
    operation(): string {
        return `Product 2 has been called`;
    }
}

// function clientCode(creator: Creator) {
//     // client code will receive the creator obj and based on that will do some operation
//     console.log('client code executed...');
//     creator.someBizlogic();
// }

function application() {
    // configure which creator needs to be initiated
    const creator1 = new ConcreteCreator1();
    const creator2 = new ConcreteCreator2();
    creator1.someBizlogic();
    creator2.someBizlogic();
}
// application();

/**
 * in above example for client code, both creator i.e creator1 and creator2 are same and will treat them same only.
 */

// Question based on factory design pattern

/**
 * Q-1 suppose you want to create a website there you need to enter the state name, it will give all the information of state related and 
 * you can explore more about the state itself.
 * there are four fields that will get filled whenever you will select the state from the UI dropdown.
 * please implement the backend
 */

/**
 * Solution: 
 * field one : capital
 * fiels two : chief minister of the selected state
 * field three: number of districts
 * field four: populations
 */

// if user pass state: Distric then give the above info for the district level

/**
 * suppose there are two dbms tables that holds the data of state and districts
 * Table 1:  StateData table =>  |stateName| stateCode | population | chiefMinister | capital | districtsCount
 * Table 2    District Data table => |districtCode|districtName|population|stateName
 */
// file 1
interface StateOrDistricData {
    getNumberOfDistricts(): number;
    getCapital(): string;
    getChiefMinisterName(): string;
    getPopulation(): number;
}


abstract class BaseClass {
    constructor() {
        // we will not instantiate the class in the client side  
    }

    public abstract getStateOrDistrictObjFromDB(): StateOrDistricData;
    public getCapital(): string {
        const stateData = this.getStateOrDistrictObjFromDB();
        return stateData.getCapital();
    }
    public getChiefMinisterName(): string {
        const stateData = this.getStateOrDistrictObjFromDB();
        return stateData.getChiefMinisterName();
    }
    public getPopulation(): number {
        const stateData = this.getStateOrDistrictObjFromDB();
        return stateData.getPopulation();
    }
    public getNumberOfDistricts(): number {
        const stateData = this.getStateOrDistrictObjFromDB();
        return stateData.getNumberOfDistricts();
    }
}

class StateClass extends BaseClass {
    private stateName: string;
    private stateCode: string;
    constructor(props: any) {
        super();
        this.stateName = props.stateName;
        this.stateCode = ''

    }
    public getStateOrDistrictObjFromDB(): StateOrDistricData {
        // fetch the state related data from Table1  based on stateName given by the user
        // suppose we got the stateData from the database
        // dummny for example purpose

        const stateDbData = {
            stateName: 'Rajasthan',
            stateCode: '91',
            population: 32423423,
            chiefMinister: 'Bhajan lal Sharma',
            capital: 'Jaipur',
            districtsCount: 32
        }

        return {
            getNumberOfDistricts: (): number => {
                return stateDbData.districtsCount;
            },
            getCapital: () => {
                return stateDbData.capital;
            },
            getChiefMinisterName: () => {
                return stateDbData.chiefMinister;
            },
            getPopulation() {
                return stateDbData.population;
            }
        }

    }
}

// we can maintain the info in the cache and return the value from the cache instead of calling db call again and again
class DistrictClass extends BaseClass {
    private districtName: string;
    constructor(props: any) {
        super();
        this.districtName = props.split(':')[1] // input format is stateName: districtName
    }
    public getStateOrDistrictObjFromDB(): StateOrDistricData {
        // fetch the district related data from Table2  based on districtName given by the user
        // suppose we got the districtData from the database
        // dummny for example purpose

        const districtData = {
            stateName: 'Rajasthan',
            districName: 'Dausa',
            districPopulation: 3423425
        }

        return {
            getNumberOfDistricts: (): number => {
                return 0;
            },
            getCapital: () => {
                return '';
            },
            getChiefMinisterName: () => {
                return '';
            },
            getPopulation() {
                return districtData.districPopulation;
            }
        }

    }
}


// write one function that will return the state or district obj based on input 

function getStateOrDistrictObj(inputValue: string) {
    const [stateName, districtName] = inputValue.split(':');

    if (districtName) {
        return new DistrictClass(districtName);
    }

    return new StateClass({ stateName });
}


function ClientCodeFun() {
    // input taken from the user
    const inputValue = 'Rajasthan:Duasa';
    const obj = getStateOrDistrictObj(inputValue);

    console.log("population of dausa", obj.getPopulation());

    const obj1 = getStateOrDistrictObj('Rajasthan');

    console.log("get the population of rajasthan=>", obj1.getPopulation());
}

ClientCodeFun();


