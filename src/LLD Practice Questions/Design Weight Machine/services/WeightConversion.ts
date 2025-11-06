import { WeightMeasurements } from "../enums";
import { getWeightAdapater } from "./WeightMachinFactory";



export function displayWeight(selectedUnit: WeightMeasurements) {

    const adapater = getWeightAdapater(selectedUnit);

    const measuredWeight = adapater.measureWeight();

    const unitStr = WeightMeasurements[selectedUnit];

    console.log(`selected weight unit: ${unitStr} and measured weight is: ${measuredWeight}`);
}

