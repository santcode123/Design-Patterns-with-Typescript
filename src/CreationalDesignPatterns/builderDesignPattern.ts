/**'
 * this builder design pattern taught by shreyansh jain
 * 
 */
/**
 * Problem: Suppose we want to create a application which will create a car object and car mauals documents, how we can do that?
 */

// we can use abstract factory design patterns as well but i am going with builder design pattern to undertsand it better.


interface Builder {
    setSeats(seats: number): void;
    setEngine(engine: string): void;
    // setEngine(engine: string): void;
    setTripComputer(tripComputer: string): void;
    setWindshield(windshield: string): void;
    reset(): void;
}


class Car {
    seats: number;
    engine: string;
    tripComputer: string;
    windshield: string;
    constructor() {
        this.seats = 0;
        this.engine = '';
        this.tripComputer = '';
        this.windshield = '';
    }
    setSeats(seats: number): void {
        this.seats = seats;
    }
    setEngine(engine: string): void {
        this.engine = engine;
    }
    setTripComputer(tripComputer: string): void {
        this.tripComputer = tripComputer;
    }
    setWindshield(windshield: string): void {
        this.windshield = windshield;
    }
    // getCar(): string {
    //     return `Car with ${this.seats} seats, ${this.engine} engine, ${this.tripComputer} trip computer and ${this.windshield} windshield.`;
    // }
}

class CarManual {
    private document: string;
    constructor() {
        this.document = '';
    }
    setSeats(seats: number): void {
        this.document += `Car manual with ${seats} seats.\n`;
    }
    setEngine(engine: string): void {
        this.document += `Car manual with ${engine} engine.\n`;
    }
    setTripComputer(tripComputer: string): void {
        this.document += `Car manual with ${tripComputer} trip computer.\n`;
    }
    setWindshield(windshield: string): void {
        this.document += `Car manual with ${windshield} windshield.\n`;
    }
    getDocument(): string {
        return this.document;
    }
}

class CarBuilder implements Builder {
    private car!: Car; // type assertion to avoid undefined error
    constructor() {
        this.reset();
    }
    reset(): void {
        this.car = new Car();
    }
    setSeats(seats: number): void {
        this.car.setSeats
    }
    setEngine(engine: string): void {
        this.car.setEngine(engine);
    }
    setTripComputer(tripComputer: string): void {
        this.car.setTripComputer(tripComputer);
    }
    setWindshield(windshield: string): void {
        this.car.setWindshield(windshield);
    }
    getCar(): Car {
        return this.car;
    }
}

class CarManualBuilder implements Builder {
    private manual!: CarManual; // type assertion to avoid undefined error
    constructor() {
        this.reset();
    }
    reset(): void {
        this.manual = new CarManual();
    }
    setSeats(seats: number): void {
        this.manual.setSeats(seats);
    }
    setEngine(engine: string): void {
        this.manual.setEngine(engine);
    }
    setTripComputer(tripComputer: string): void {
        this.manual.setTripComputer(tripComputer);
    }
    setWindshield(windshield: string): void {
        this.manual.setWindshield(windshield);
    }
    getManual(): string {
        return this.manual.getDocument();
    }
}

// make a Director class to follow some steps to create different types of car and their manuals

class Director {
    private builder: Builder;
    constructor(builder: Builder) {
        this.builder = builder;
    }
    setBuilder(builder: Builder): void {
        this.builder = builder;
    }
    makeSportsCar(): void {
        this.builder.setSeats(2);
        this.builder.setEngine('V8');
        this.builder.setTripComputer('GPS');
        this.builder.setWindshield('Tinted');
    }
    makeSUV(): void {
        this.builder.setSeats(7);
        this.builder.setEngine('V6');
        this.builder.setTripComputer('GPS');
        this.builder.setWindshield('Tinted');
    }
}


function clienCode() {
    const carBuilder = new CarBuilder();
    const carManualBuilder = new CarManualBuilder();
    const director = new Director(carBuilder);
    director.makeSportsCar();
    const car = carBuilder.getCar();
    console.log(car);
    director.setBuilder(carManualBuilder);
    director.makeSportsCar();
    const manual = carManualBuilder.getManual();
    console.log(manual);
}
