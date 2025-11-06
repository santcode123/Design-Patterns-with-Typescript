
import { IWeightMachine } from "../interfaces";

export class WeightMachine implements IWeightMachine {
    measureWeight(): number {
        // this is hardware which measures weight in pound

        return 28;
    }
}