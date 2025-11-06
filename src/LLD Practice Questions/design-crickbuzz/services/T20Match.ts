import { MatchType } from "../interfaces";


export class T20Match implements MatchType {
    getNumberOfOvers(): number {
        return 20;
    }
    getMaxLimitOverPerBowler(): number {
        return 5;
    }
}