// if some classes are not supported in the client side then we need to use adapter to support that class to clientside

// client code only supports Target classes

class Target {
    public request() {
        return 'This request will be processed by client because it is english text';
    }
}

class Adaptee {
    public specialRequest() {
        return 'you are how';
    }
}

class Adapter extends Target {
    private adaptee: Adaptee;
    constructor(adaptee: Adaptee) {
        super();
        this.adaptee = adaptee;
    }

    public request(): string {
        // convert adaptee special request text into the english text
        const otherLanguageText = this.adaptee.specialRequest();
        const convertedText = otherLanguageText.split(" ").reverse().join(" ");
        return convertedText;
    }
}

function clientCode(target: Target) {
    // in the client we are expecting english text
    console.log(target.request());
}

const target = new Target();
clientCode(target);

// adapter use
const adaptee = new Adaptee();
const adapterClass = new Adapter(adaptee);
clientCode(adapterClass);



/**
 * Example given by shreyansh jain for adapter design pattern
 * Example: We have weight machine that measure weights in pounds only, we want to integrate that machine into 
 * our billing software that will show weight in kg, grams and pounds according to user wishes
 */

interface WeightMachine {
    measureWeight(): number;
}

// concrete weight machines for weight measurement
class PoundWeightMachine implements WeightMachine {
    measureWeight(): number {
        // internall this machine measures the weight and return it's weight
        return Math.random() * 1000;
    }
}

class KgWeightMachine implements WeightMachine {
    measureWeight(): number {
        //  meaure the weight in kg internally and return 
        return Math.random() * 100;
    }
}

/**
 * create a facory method to return weight machine based on user preference that he/she wants to install in their store and integrate that
 * weight machine with their billing software
  */
function weightMachineFactory(userPreference: string): WeightMachine {
    let weightMachine = new KgWeightMachine();
    switch (userPreference) {
        case 'pound': {
            weightMachine = new PoundWeightMachine();
        }
    }
    return weightMachine;
}
/**
 * irrespective which weight machine you have intstall billing software will be having capability to show
 * weight in all the forms i.e kg, pound, gram
 */

class WeightAdapter {
    private adaptee: WeightMachine;
    constructor(adaptee: WeightMachine) {
        this.adaptee = adaptee
    }
    public getWightInKg(): number {
        const weight = this.adaptee.measureWeight();
        // conversion logic goes here
        const updatedWeight = weight * 10;
        return updatedWeight;
    }
    getWightInGram(): number {
        const weight = this.adaptee.measureWeight();
        // conversion logic goes here
        const updatedWeight = weight * 10;
        return updatedWeight;
    }
    getWightInPound(): number {
        const weight = this.adaptee.measureWeight();
        // conversion logic goes here
        const updatedWeight = weight * 10;
        return updatedWeight;
    }
}

class BillingSoftware {
    private weightAdpater: WeightAdapter;
    private weightMachine: WeightMachine;

    constructor({ weightAdpater, weightMachine }: { weightAdpater: WeightAdapter; weightMachine: WeightMachine }) {
        this.weightAdpater = weightAdpater;
        this.weightMachine = weightMachine;
    }

    public displayWightInKg() {
        const weightInKg = this.weightAdpater.getWightInKg();
        return weightInKg;
    }
}


