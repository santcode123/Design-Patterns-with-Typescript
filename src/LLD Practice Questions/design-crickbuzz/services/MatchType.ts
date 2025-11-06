import { MatchType } from "../interfaces";

export class T20Match implements MatchType {
    getNumberOfOvers(): number {
        return 20;
    }
    getMaxLimitOverPerBowler(): number {
        return 4;
    }
}

export class OneDayMatch implements MatchType {
    getNumberOfOvers(): number {
        return 50;
    }
    getMaxLimitOverPerBowler(): number {
        return 10;
    }
}

export class TestMatch implements MatchType {
    getNumberOfOvers(): number {
        return 200;
    }
    getMaxLimitOverPerBowler(): number {
        return 40;
    }
}