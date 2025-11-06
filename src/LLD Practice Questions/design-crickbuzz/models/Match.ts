import { MatchType } from "../interfaces";
import { Inning } from "./Inning";
import { Team } from "./Team";

export class Match {
    private teamA: Team;
    private teamB: Team;
    private tossWinnerTeam: Team;
    private matchType: MatchType;
    private innings: Inning[]; // mostly two innings

    constructor({
        teamA,
        teamB,
        tossWinnerTeam,
        matchType,
        innings,
    }: {
        teamA: Team;
        teamB: Team;
        tossWinnerTeam: Team;
        matchType: MatchType;
        innings: Inning[];
    }) {
        this.teamA = teamA;
        this.teamB = teamB;
        this.tossWinnerTeam = tossWinnerTeam;
        this.matchType = matchType;
        this.innings = innings;
    }

    public startMatch() {

        // let's play all innings peacefully
        for (let i = 0; i < this.innings.length; i++) {
            const inning = this.innings[i];
            inning.startInning();
        }
    }
}
