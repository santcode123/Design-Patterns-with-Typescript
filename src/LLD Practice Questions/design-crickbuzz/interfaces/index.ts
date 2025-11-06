import { BallType } from "../enums";
import type { Ball } from "../models/Ball";

export interface MatchType {
    getNumberOfOvers(): number;
    getMaxLimitOverPerBowler(): number;
}

export interface Observable {
    updateScore(ball: Ball): void;
}