import { PlayingPiece } from "./PlayingPiece";


export class Player {
    name: string;
    assignedPiece: PlayingPiece;

    constructor({ name, playingPiece }: { name: string; playingPiece: PlayingPiece }) {
        this.assignedPiece = playingPiece;
        this.name = name;
    }
}