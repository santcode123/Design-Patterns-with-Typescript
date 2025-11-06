import { RunType } from "../enums";


export function runHitByPlayer() {
    const randomNumber = Math.floor(Math.random() * 6);

    if (randomNumber === 0) {
        return RunType.NONE;
    }

    if (0 < randomNumber && randomNumber < 2) {
        return RunType.ONE;
    }

    if (2 <= randomNumber && randomNumber < 4) {
        return RunType.TWO;
    }

    if (4 <= randomNumber && randomNumber < 6) {
        return RunType.FOUR;
    }

    if (randomNumber === 6) {
        return RunType.SIX;
    }

    throw new Error('Error when player hit the run');
}


export function isWicket() {
    const randomNumber = Math.random();


    return randomNumber > 0.5 ? true : false;
}