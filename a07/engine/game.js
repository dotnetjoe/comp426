/*
Add your code for Game here
 */

var gameState = {}

document.addEventListener("keyup", function (event) {
    $(".menu-container").remove();
    $(".row-container").remove();
    const key = event.key;
    move(key);
});

export const $root = $('#root');
$root.on('click', '#new-game', function() {
    Game(4);
});

export const Game = function (size) {
    gameState.board = [];
    setUpNewGame(size);
    var randomNumbers = [2, 2, 2, 2, 2, 2, 2, 2, 2, 4];
    var index = Math.floor(Math.random() * randomNumbers.length);
    var randomNumber = randomNumbers[index];
    var boardIndex = Math.floor(Math.random() * 16);
    gameState.board[boardIndex] = randomNumber;
    loadGame(gameState);
}

export const loadGame = function (gameState) {
    var numberOfRows = Math.sqrt(gameState.board.length);

    let rowContainer = document.createElement('div');
    rowContainer.classList.add("row-container");

    let menuContainer = document.createElement('div');
    menuContainer.classList.add("menu-container");

    $root.append(menuContainer);
    $root.append(rowContainer);

    randomTile(gameState.board);
    createTileRows(gameState.board, numberOfRows);
    loadMenu();
};

export const loadMenu = function () {
    var div = document.getElementsByClassName("menu-container");
    var requiredDiv = div[0];

    let scoreBoard = document.createElement('div');
    scoreBoard.id = "scoreboard";
    scoreBoard.innerHTML = "SCORE: " + gameState.score;

    let newGame = document.createElement('button');
    newGame.id = "new-game";
    newGame.classList.add("button", "is-primary");
    newGame.innerHTML = "NEW GAME";

    requiredDiv.append(scoreBoard);
    requiredDiv.append(newGame);
}



export const createTileRows = function (tileNumbers, numberOfRows) {
    var x = 0;
    var tilesPerRow = numberOfRows;
    var div = document.getElementsByClassName("row-container");
    var requiredDiv = div[0];
    for (var i = 0; i < numberOfRows; i++) {
        let tileRowContainer = document.createElement('div');
        tileRowContainer.classList.add("tile-row-container");
        requiredDiv.append(tileRowContainer);
        for (var t = 0; t < tilesPerRow; t++) {
            let tile = document.createElement('div');
            tile.classList.add("tile");
            //insert if statements to figure out number on tile and add class to tile accordingly
            if(tileNumbers[x]==0){
            }else{
                tile.innerText = tileNumbers[x];
            }
            tileRowContainer.append(tile);
            x++;
        }
    }

};

export const randomTile = function (board) {
    var randomNumbers = [2, 2, 2, 2, 2, 2, 2, 2, 2, 4];
    var index = Math.floor(Math.random() * 10);
    var randomNumber = randomNumbers[index];
    var boardIndex = Math.floor(Math.random() * 16);
    while (board[boardIndex] != 0) {
        boardIndex = Math.floor(Math.random() * 16);
    }
    board[boardIndex] = randomNumber;
};

export const move = function (direction) {
    var board = gameState.board;
    var rowLength = Math.sqrt(gameState.board.length);
    var columnLength = rowLength;

    switch (direction) {
        case "ArrowLeft":
            var x = 0;
            var t = 1;
            while (x < board.length) {
                var i = 0;
                var initialIndex = x;
                var tilesAboveZero = 0;
                var indexWithNumbers = [];
                while (i < rowLength) {
                    if (board[x] != 0) {
                        tilesAboveZero++;
                        indexWithNumbers.push(x);
                    }
                    if (board[x] == board[x + 3] && board[x + 2] == 0 && board[x + 1] == 0 && x + 3 < rowLength * t) {
                        board[x] = board[x] * 2;
                        board[x + 3] = 0;
                        gameState.score = gameState.score + board[x];
                    }
                    if (board[x] == board[x + 2] && board[x + 1] == 0 && x + 2 < rowLength * t) {
                        board[x] = board[x] * 2;
                        board[x + 2] = 0;
                        gameState.score = gameState.score + board[x];

                    }
                    if (board[x] == board[x + 1] && x + 1 < rowLength * t) {
                        board[x] = board[x] * 2;
                        board[x + 1] = 0;
                        gameState.score = gameState.score + board[x];
                    }
                    i++;
                    x++;

                }
                t++;
                for (var y = 0; y < tilesAboveZero; y++) {
                    var tileIndex = indexWithNumbers[y];
                    board[initialIndex] = board[tileIndex];
                    if (initialIndex != tileIndex) {
                        board[tileIndex] = 0;
                    }
                    initialIndex++;
                }
            }
            break;
        case "ArrowRight":
            var x = 15;
            var t = 3;
            while (x > 0) {
                var i = 0;
                var initialIndex = x;
                var tilesAboveZero = 0;
                var indexWithNumbers = [];
                while (i < rowLength) {
                    if (board[x] != 0) {
                        tilesAboveZero++;
                        indexWithNumbers.push(x);
                    }
                    if (board[x] == board[x - 3] && board[x - 2] == 0 && board[x - 1] == 0 && x - 3 >= rowLength * t) {
                        board[x] = board[x] * 2;
                        board[x - 3] = 0;
                        gameState.score = gameState.score + board[x];
                    }
                    if (board[x] == board[x - 2] && board[x - 1] == 0 && x - 2 >= rowLength * t) {
                        board[x] = board[x] * 2;
                        board[x - 2] = 0;
                        gameState.score = gameState.score + board[x];
                    }
                    if (board[x] == board[x - 1] && x - 1 >= rowLength * t) {
                        board[x] = board[x - 1] * 2;
                        board[x - 1] = 0;
                        gameState.score = gameState.score + board[x];
                    }
                    i++;
                    x--;

                }
                t--;
                for (var y = 0; y < tilesAboveZero; y++) {
                    var tileIndex = indexWithNumbers[y];
                    board[initialIndex] = board[tileIndex];
                    if (initialIndex != tileIndex) {
                        board[tileIndex] = 0;
                    }
                    initialIndex--;
                }
            }
            break;
        case "ArrowUp":
            var t = 0;
            var v = 0;
            while (v < board.length) {
                var i = 0;
                var x = t;
                var initialIndex = t;
                var tilesAboveZero = 0;
                var indexWithNumbers = [];
                while (i < columnLength) {
                    if (board[x] != 0) {
                        tilesAboveZero++;
                        indexWithNumbers.push(x);
                    }
                    if (board[x] == board[x + (rowLength * 3)] && board[x + (rowLength * 2)] == 0 && board[x + (rowLength * 1)] == 0) {
                        board[x] = board[x] * 2;
                        board[x + (rowLength * 3)] = 0;
                        gameState.score = gameState.score + board[x];
                    }
                    if (board[x] == board[x + (rowLength * 2)] && board[x + rowLength] == 0) {
                        board[x] = board[x] * 2;
                        board[x + (rowLength * 2)] = 0;
                        gameState.score = gameState.score + board[x];
                    }
                    if (board[x] == board[x + rowLength]) {
                        board[x] = board[x] * 2;
                        board[x + rowLength] = 0;
                        gameState.score = gameState.score + board[x];
                    }
                    i++;
                    x = x + 4;
                    v++;
                }
                for (var y = 0; y < tilesAboveZero; y++) {
                    var tileIndex = indexWithNumbers[y];
                    board[initialIndex] = board[tileIndex];
                    if (initialIndex != tileIndex) {
                        board[tileIndex] = 0;
                    }
                    initialIndex = initialIndex + 4;
                }
                t++;
            }
            break;
        case "ArrowDown":
            var t = 15;
            var v = 0;
            while (v < board.length) {
                var i = 0;
                var x = t;
                var initialIndex = t;
                var tilesAboveZero = 0;
                var indexWithNumbers = [];
                while (i < columnLength) {
                    if (board[x] != 0) {
                        tilesAboveZero++;
                        indexWithNumbers.push(x);
                    }
                    if (board[x] == board[x - (rowLength * 3)] && board[x - (rowLength * 2)] == 0 && board[x - (rowLength * 1)] == 0) {
                        board[x] = board[x] * 2;
                        board[x - (rowLength * 3)] = 0;
                        gameState.score = gameState.score + board[x];

                    }
                    if (board[x] == board[x - (rowLength * 2)] && board[x - rowLength] == 0) {
                        board[x] = board[x] * 2;
                        board[x - (rowLength * 2)] = 0;
                        gameState.score = gameState.score + board[x];
                    }
                    if (board[x] == board[x - rowLength]) {
                        board[x] = board[x] * 2;
                        board[x - rowLength] = 0;
                        gameState.score = gameState.score + board[x];
                    }
                    i++;
                    x = x - 4;
                    v++;
                }
                for (var y = 0; y < tilesAboveZero; y++) {
                    var tileIndex = indexWithNumbers[y];
                    board[initialIndex] = board[tileIndex];
                    if (initialIndex != tileIndex) {
                        board[tileIndex] = 0;
                    }
                    initialIndex = initialIndex - 4;
                }
                t--;
            }
            break;
    }
    gameState.board = board;
    loadGame(gameState);
}

export const setUpNewGame = function (size) {
    var numberOfTiles = size * size;
    for (var i = 0; i < numberOfTiles; i++) {
        gameState.board[i] = 0;
    }
    gameState.score = 0;
    gameState.won = false;
    gameState.over = false;
    $(".menu-container").remove();
    $(".row-container").remove();
}

$(function () {
    Game(4);
});