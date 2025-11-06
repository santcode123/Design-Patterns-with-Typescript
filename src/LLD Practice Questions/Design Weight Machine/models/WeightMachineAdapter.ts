import { IWeightMachine } from "../interfaces";


abstract class WeightAdapater {
    private adaptee: IWeightMachine;


    constructor(adaptee: IWeightMachine) {
        this.adaptee = adaptee;
    }

    public measureWeight() {
        const weight = this.adaptee.measureWeight();

        // convert the weight based on selected option
        const convertedWeight = this.convertWeight(weight);

        return convertedWeight;
    };

    protected abstract convertWeight(weight: number): number;
}


export class PoundAdapater extends WeightAdapater {
    public convertWeight(weight: number): number {
        return weight; // no conversion
    }
}


export class PoundToKgAdapater extends WeightAdapater {
    public convertWeight(w: number): number {
        const weightInKg = w / 2.205;

        return weightInKg;
    }
}

export class PoundToGramAdapater extends WeightAdapater {
    public convertWeight(weight: number): number {
        const weightInGram = weight * 453.59;

        return weightInGram;
    }
}