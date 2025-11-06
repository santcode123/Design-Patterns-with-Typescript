import { WeightMeasurements } from "../enums";
import { WeightMachine } from "../models/WeightMachine";
import { PoundAdapater, PoundToGramAdapater, PoundToKgAdapater } from "../models/WeightMachineAdapter";


export function getWeightAdapater(selectedOption: WeightMeasurements) {
    const weightMachine = new WeightMachine();

    // we need to get adapater based on selected unit from the btn and that adapter gonna give the result

    switch (selectedOption) {
        case WeightMeasurements.KG: {
            return new PoundToKgAdapater(weightMachine);
        }
        case WeightMeasurements.GRAM: {
            return new PoundToGramAdapater(weightMachine);
        }

        default: {
            return new PoundAdapater(weightMachine);
        }
    }
}