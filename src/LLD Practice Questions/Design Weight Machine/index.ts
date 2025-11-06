
import { WeightMeasurements } from "./enums"
import { displayWeight } from "./services/WeightConversion";

function demo() {

    // show weight based selected option of unit
    displayWeight(WeightMeasurements.KG);
    displayWeight(WeightMeasurements.GRAM);
    displayWeight(WeightMeasurements.POUND);
}

demo();