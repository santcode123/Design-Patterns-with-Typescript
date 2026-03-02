### Template Design Pattern

Introduction: template design pattern is used when  we want different  classes to follow same steps in some method, but in each step they can have different implementation.

Template Method is a behavioral design pattern that defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structur.

Example: Suppose we have one uitlity in out application(web application), which can parse PDF, CSV,  Doc contents in a meaningfull report, those reports can be shown on dashboard.

```
abstract class DataMiner {
  abstract openFile(path);
  abstract extractData(file);
  abstract parseData(rowData);
  abstract closeFile(file);
  // common methods
  protected analyzeData(data){
    // analyzeData logic implementation
  }
  protected sendReport(analysis){
    // send report logic implementation
  }

  public mine(path){
    // template method which defines the step for data mining
    const file = this.openFile(path);
    const extractedData = this.extractData(file);
    const data = this.parseData(extractedData);
    const analysis = analyzeData(data);
    sendReport(analysis);
    closeFile(file);
  }
}

// child classes

class PDFDataMiner extends DataMiner{
    public openFile(path){
        // open pdf logic goes here
    }
    public extractData(fiele){
        // logic to extract data from pdf
    }
    public parseData(rowData){
       // logic to parse pdf row data in form of data which is same for all miners
    }
    public closeFile(file){
        // logic to close pdf file
    }
}

class CSVDataMiner extends DataMiner{
    public openFile(path){
        // open csv logic goes here
    }
    public extractData(fiele){
        // logic to extract data from csv
    }
    public parseData(rowData){
       // logic to parse csv row data in form of data which is same for all miners
    }
    public closeFile(file){
        // logic to close csv file
    }
}

class DOCDataMiner extends DataMiner{
    public openFile(path){
        // open DOC logic goes here
    }
    public extractData(fiele){
        // logic to extract data from DOC
    }
    public parseData(rowData){
       // logic to parse DOC row data in form of data which is same for all miners
    }
    public closeFile(file){
        // logic to close doc file
    }
}


   function dataMinerFactory(path){
        const extension = // logic to get path extension

        switch(extension){
            case 'pdf': {
                return new PDFDataMiner();
            }

            case 'csv':{
                return new CSVDataMiner();
            }

            case 'doc':{
                return new DOCDataMiner();
            }

            default:{
                throw new Error('selected file format is not supported');
            }
        }
    } 


function pdfUtility(){
    const path =// get path once we select file 

    const dataMiner = dataMinerFactory.getDataMiner(path);

    dataMiner.mine(path); // all steps are mentions in the mine method
}

```