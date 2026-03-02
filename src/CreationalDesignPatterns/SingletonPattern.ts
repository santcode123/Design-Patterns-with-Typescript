// this pattern is being used widely and it can be used at making db connection class 
// note that in java singleton implementation is different from typescript singleton to counter the thread safety (double locking in java)
// volatile keyword is being used to avoid memory issue in double locking implemention of singleton in java)

class Singleton {
    private static instance: Singleton;
    private dbObjData: any;
    private constructor() {
        // make data base connection and return the obj 
        console.log('connected successfully with database...');
        this.dbObjData = {
            dbObj: {
                getData() {
                    return [1, 2, 3];
                }
            }
        }
    }

    public static getInstance() {
        if (Singleton.instance) {
            return Singleton.instance;
        };
        // create a new instance of the singleton class
        const singletonInstance = new Singleton();
        Singleton.instance = singletonInstance;
        return singletonInstance;
    }

    public getDbObj() {
        const instance = Singleton.getInstance();
        return instance.dbObjData;
    }

}

function clientCode() {
    const dbHelperClassObj = Singleton.getInstance();
    const dataObj = dbHelperClassObj.getDbObj();
    console.log("data=>", dataObj, dataObj.dbObj.getData());
}
clientCode();
clientCode();