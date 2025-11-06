import { PlayingPiece } from "./PlayingPiece";

export class Board {
    size: number;
    board: Array<Array<PlayingPiece | null>>;

    constructor(size: number = 3) {
        this.size = size;
        this.board = this.init();
    }

    public init() {
        // initialize the board with playing
        const matrix = [];
        for (let i = 0; i < this.size; i++) {
            const arr = [];
            for (let j = 0; j < this.size; j++) {
                arr.push(null)
            }
            matrix.push(arr);
        }

        return matrix;
    }

    public display() {
        const board = this.board;

        for (let arr of board) {
            console.log(arr);
        }
    }

    public isValidPosition(i: number, j: number) {
        const board = this.board;
        const n = board.length;
        const m = board[0].length;

        if (i < 0 || j < 0 || i >= n || j >= m) {
            console.log(`given position is not valid for given game board:${i}, ${j}`);

            return false;
        }

        return true;
    }

    public isEmpty(i: number, j: number) {
        const isValid = this.isValidPosition(i, j);
        const board = this.board;

        if (isValid && board[i][j] === null) {
            return true;
        }
        return false;
    }

}