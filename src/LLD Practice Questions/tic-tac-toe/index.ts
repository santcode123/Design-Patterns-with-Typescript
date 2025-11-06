

// UI level logic

import { PieceType } from "./enums";
import { TicTacToeGame } from "./models/Game";


function playGameTicTacToe() {


    // assign the game

    const arr = [{ i: 0, j: 0 }, { i: 1, j: 1 }, { i: 0, j: 1 }, { i: 1, j: 0 }, { i: 0, j: 2 }];

    const game = new TicTacToeGame();

    game.displayBoard();

    let index = 0;

    while (index < arr.length) {
        const { i, j } = arr[index];
        let nextPlayer = game.getNextMovePlayer();
        console.log(`its ${nextPlayer.name} turn , has entered ${i}, ${j}`);

        const playingpiece = nextPlayer.assignedPiece;

        game.addPiece({ i, j, piece: playingpiece });

        index++;
    }

    game.displayBoard();

    const winnerPiece = game.getWinnerPiece();

    const mappedObj = {
        [PieceType.X]: 'Player x',
        [PieceType.O]: 'Player O'
    }

    const winnerPlayerName = winnerPiece?.pieceType ? mappedObj[winnerPiece?.pieceType] : "tie";

    console.log("winner: ", winnerPlayerName);
}


playGameTicTacToe();