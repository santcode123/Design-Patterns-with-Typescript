// in this patterns decorator and obj has same interface and decorator add addtional functionality to obj methods on the runtime

/**
 * Example: suppose we have class to write the data in file system, but we want to add addional feature like should we encrypte the data
 * before write it in the file system that will be decided on run time only
 * 
 */


// suppose we are writing data in userData.txt file

interface DataSource {
    writeData(data: string): void;
    getData(): string;
}

class FileDataSource implements DataSource {
    private fileName: string;

    constructor(fileName: string) {
        this.fileName = fileName;
    }

    public writeData(data: string): void {
        // write logic to write data in the file system
        console.log('data written successfully...');
    }

    public getData(): string {
        console.log('Data Retrieved from file system');
        return 'Data Retrieved from file system';
    }
}

class BaseDecorator implements DataSource {
    protected wrappee: DataSource;

    constructor(wrappee: DataSource) {
        this.wrappee = wrappee;
    }

    public writeData(data: string): void {
        this.wrappee.writeData(data);
    }
    public getData(): string {
        return this.wrappee.getData();
    }
}

class EncryptionDecorator extends BaseDecorator {
    public writeData(data: string): void {
        //  logic to encrypte the data before writing it in the file system
        console.log('Data ecrypted successfully..');
        const encrytedData = data;
        this.wrappee.writeData(encrytedData);
    }

    public getData(): string {
        const data = this.wrappee.getData();
        // decryte the data 
        console.log('Data decrypted successfully..');
        const decryptedData = data;
        return decryptedData;
    }
}


class CompressionDecorator extends BaseDecorator {

    public writeData(data: string): void {
        // compresse the data before writing it in database
        const compressedData = data;
        console.log('Data compressed successfully...');
        this.wrappee.writeData(compressedData);
    }

    public getData(): string {
        const data = this.wrappee.getData();
        // decompress the data before returning it to client side
        console.log('Data decompressed successfully...');
        const decompressedData = data;
        return decompressedData;
    }

}


// write a manager to write and read the salary from the file system

class SalaryManager {
    private source: DataSource;

    constructor(source: DataSource) {
        this.source = source;
    }

    public getEmployeeSalaryData(): string {
        return this.source.getData();
    }

    public writeEmployeeSalaryData(data: string): void {
        this.source.writeData(data);
    }
}


enum DataFormat {
    simple = 'simple',
    encrypted = 'encrypted',
    compressed = 'compressed',
    compressAndEncrypte = 'compressAndEcncryted'
}

function clientCode(configuration: DataFormat) {
    const data = '{[{empId:1,salary:234},{empId:2, salary: 342}]}';
    let source: DataSource = new FileDataSource('employeeSalary.txt');
    switch (configuration) {
        case DataFormat.simple: {
            source = new BaseDecorator(source);
            break;
        }
        case DataFormat.compressed: {
            source = new CompressionDecorator(source);
            break;
        }
        case DataFormat.encrypted: {
            source = new EncryptionDecorator(source);
            break;
        }
        case DataFormat.compressAndEncrypte: {
            source = new EncryptionDecorator(new CompressionDecorator(source));
            break;
        }
        default: {
            throw Error('Exception: configuration is not supported..');
        }
    }

    // write the salaryData and get it back
    source.writeData(data);
    const retrievedData = source.getData();
    // console.log(retrievedData);

}

function application1() {
    let configuration: DataFormat = DataFormat.compressAndEncrypte;
    console.log('Application started');
    clientCode(configuration);
}

application1();


