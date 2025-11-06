import { Board } from "./Board";
import { Player } from "./Player";
import { PlayingPiece, PlayingPieceO, PlayingPieceX } from "./PlayingPiece";

export class TicTacToeGame {
    private isPlaying: boolean;
    private winnerPiece: PlayingPiece | null;
    board: Board;
    players: Array<Player>; // treat as dequeue, shows the list of playing players


    constructor() {
        /** as of now we are harcoding board size 3 and number of player 2, it can be extended */
        this.board = new Board(3);
        this.players = this.initPlayersList(2);
        this.isPlaying = false;
        this.winnerPiece = null;
    }

    public initPlayersList(numberOfPlayers: number = 2) {
        const playerX = new Player({ name: "player x", playingPiece: new PlayingPieceX() });
        const playerO = new Player({ name: "plaer o", playingPiece: new PlayingPieceO() });

        return [playerX, playerO];
    }

    public getNextMovePlayer() {
        return this.players[0];
    }

    public changePlayersTurn() {
        let updatedArr = this.players;

        updatedArr = [...updatedArr.slice(1), updatedArr[0]]

        this.players = updatedArr;
    }

    public addPiece({ i, j, piece }: { i: number, j: number; piece: PlayingPiece }) {
        const isSpotAvailable = this.board.isEmpty(i, j);

        if (!isSpotAvailable) {
            console.log("Incorrect postion please try again");
            return;
        }

        const board = this.board.board;

        board[i][j] = piece;

        this.changePlayersTurn();
    }

    public displayBoard() {
        this.board.display();
    }

    public startGame() {
        if (this.isPlaying) {
            console.log("Game already started, please wait to finish the game");
            return;
        }
        console.log("Game has started, enjoy ur game...");
        this.isPlaying = true;

    }

    public getWinnerPiece() {
        if (this.winnerPiece) {
            return this.winnerPiece;
        }


        const board = this.board.board;

        const n = board.length;
        const m = board[0].length;

        // check each columns
        for (let j = 0; j < m; j++) {
            const currentPiece = board[0][j];

            if (currentPiece === null) {
                continue;
            }

            let hasSamePiece = true;

            for (let i = 1; i < n; i++) {
                const newPiece = board[i][j];

                if (newPiece !== currentPiece) {
                    hasSamePiece = false;
                    break;
                }
            }

            if (hasSamePiece) {
                this.winnerPiece = currentPiece;

                return this.winnerPiece;
            }
        }


        // check each rows

        for (let i = 0; i < n; i++) {

            const currentPiece = board[i][0];

            if (currentPiece === null) {
                continue;
            }

            let hasSamePiece = true;

            for (let j = 1; j < m; j++) {
                const newPiece = board[i][j];

                if (newPiece !== currentPiece) {
                    hasSamePiece = false;
                    break;
                }
            }

            if (hasSamePiece) {
                this.winnerPiece = currentPiece;

                return this.winnerPiece;
            }
        }

        return this.winnerPiece;
    }

}