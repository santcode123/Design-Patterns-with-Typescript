### Introduction

High-level modules should not depend on low-level modules. Both should depend on abstractions.
Abstractions should not depend on details. Details should depend on abstractions.

Problem:
We want to create a feature that will generate the excel reports, and data is fetched from mongodb and sql based on reports data, suppose we want to generate a reports of user's that are using our product then we might need to use data from sql, if we want the reports of all transaction of one user then we might need data from mongodb.

```
fresher code:

enum ReportType{
    userReport = 1,
    txnReport = 2
}

class MongoDBReader{
    getMongoDbData(userId){
        // fetch all the txn of the given user and return in array format
    }
}

class SQLReader {
    getAllUsers(){
        // return an array contains user's information 
    }
}

class ReportGenerator {
    private mongoDBReader: MongoDB;
    private sqlReader: SQLReader;

    constructor({ reportType, userId }:{
            reportType: ReportType, 
            userId: string}){
         if(reportType==ReportType.userReport){
            this.sqlReader = new SQLReader(); 
         }

         if(reportType == ReportType.txnReport){
            this.mongoDbReader = new MongoDBReader();
         }
    }

    generateExcelReport(){
        let data = [];
        if(this.mongoDBReader){
            data = this.mongoDBReader.getMongoDbData();
        }else{
            data = this.sqlReader.getAllUsers();
        }
        // use this data to generate the excel data
    }
}

```

There are couple of problems in above implementation

1. DLP(dependency inversion principle) violation, here Reader classes are tightly coupled
2. if we want to support other database reader like filebase and redis etc then we need to make the changes in the class which violates the open and close principle.

Solution:
Here is the modfied solution for above problem


```
Experieced Engineer code:

enum ReportTypes{
    userReport =1,
    txnReport = 2
}

interface DataReader {
    getData(params:any)=> any[];
}


// make wrappers for MongoDBReader and SQLReader as both has different method to give the data and data format might be difference so make sure we get same data format as expected

class MongoDbReaderAdapter implements DataReader {
    private mongodbReader:MongoDBReader;

    constructor(){
        this.mongodbReader = new MongoDBReader();
    }

    getData(userId){
        const data = this.mongoDbReader.getMongoDbData(userId);

        // we can add any business logic or properties to data before sending it to generate the report

        return updatedData;
    }
}

// adapter for sqlreader

class SQLReaderAdapter implements DataReader {
      private sqlReader: SQLReader;

      constructor(){
        this.sqlDBReader = new SQLReader();
      }

      getData(){
        // give the all user's data from the sql database and do some modificaations to data before generating to reports
        const data = this.sqlReader.getAllUsers();
        // we can appy the business logic and modify the data accordingly 

        return updatedData;
      }
}

class GenericReportGenerator {
    private dbReader: DataReader;

    constructor(dataBaseInstance: DataReader){
        this.dbReader = dataBaseInstance;
    }

    generateReports(userId?: string){
        //  get the data from database and generate the reports

        const data = this.dbReader.getData();
    }
}

// make factory class to generate the exact class the client needs

class ReportGenratorFactor  {
    static getReportGenerator({ reportType: ReportType }): GenericReportGenerator{

        switch(reportType){
            case Reportpe.userReport: {
                return new GenericReportGenerator(new SQLReaderAdapter());
            }

            case Reportype.txnReport: {
                return new GenericReportGenerator(new MongoDbReaderAdapter());
            }
        }
    }
}

function clientCode(){
    const reportType = ReportType.userReport;

    const userReportGenerator = ReportGenratorFactor.getReportGenerator(reportType);

    userReportGenerator.generateReports();

    // if you want to generate txn reports then do this

    const userId = 2;

     const txnReportGenerator = ReportGenratorFactor.getReportGenerator(ReportType.txnReport);

    txnReportGenerator.generateReports(userId);
    
}

```

Hope above approach has taught you many patterns that we can use in future