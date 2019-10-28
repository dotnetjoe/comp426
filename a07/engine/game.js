/*
Add your code for Game here
 */

export default class Game {
    constructor(size) {
        this.size = size;
        this.winHandlers = [];
        this.moveHandlers = [];
        this.loseHandlers = [];
        this.setupNewGame();

        this.winEvent = () => {
            this.winHandlers.forEach((callback) => {callback(this.gameState);})
        }
        this.loseEvent = () => {
            this.loseHandlers.forEach((callback) => {callback(this.gameState);})
        }
        this.moveEvent = () => {
            this.moveHandlers.forEach((callback) => {callback(this.gameState);})
        }

    }

    setupNewGame() {
        this.gameState = {
            board: [],
            score: 0,
            won: false,
            over: false
        }

        for (let i = 0; i < this.size * this.size; i++) {
            this.gameState.board.push(0)
        }
        this.createTile();
        this.createTile();
    }

    loadGame(gameState) {
        this.gameState = gameState;
        this.size = Math.round(Math.sqrt(gameState.board.length));
    }

    move(direction) {
        if (this.moveBoard(direction)) {
            this.createTile();
            this.moveEvent();
            this.gameState.over = this.hasLost();
            if (this.gameState.over) {
                this.loseEvent();
            }
            if (this.gameState.won) {
                this.winEvent();
            }
        }
    }

    toString() {
        let gameString = "Current Board: \n[";
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                gameString += "" + this.gameState.board[i * this.size + j] + ", ";
            }
            gameString += "\n ";
        }

        return gameString.slice(0, -4) + "]";
    }

    onMove(callback) {
        this.moveHandlers.push(callback);
    }

    onWin(callback) {
        this.winHandlers.push(callback);
    }

    onLose(callback) {
        this.loseHandlers.push(callback);
    }

    getGameState() {
        return this.gameState;
    }

    moveBoard(direction) {
        let moved = false;

        switch (direction) {
            case 'right':
                moved = moved || this.moveRows('right');
                break;
            case 'left':
                moved = moved || this.moveRows('left');
                break;
            case 'up':
                moved = moved || this.moveColumns('up');
                break;
            case 'down':
                moved = moved || this.moveColumns('down');
                break;
        }
        return moved;
    }

    moveRows(direction) {
        let board = this.gameState.board;
        let moved = false;
        if (direction == 'left') {
            for (let i = 0; i < this.size; i++) { // Each row
                // Run through each cell in each row,
                // Keep track of which cells have already been merged,
                // And move cells as needed.
                let mergable = 0;
                for (let j = 0; j < this.size; j++) { // Each column/row
                    let currentIndex = i * this.size + j;

                    if (board[currentIndex] == 0) {
                        continue;
                    }
                    // If cell not empty, look at all cells before this
                    for (let k = j - 1; k >= mergable; k--) {
                        if (board[i * this.size + k] == 0) {
                            // swap
                            board[i * this.size + k] = board[currentIndex];
                            board[currentIndex] = 0;
                            currentIndex -= 1;
                            moved = true;
                            continue;
                        } else if (board[i * this.size + k] == board[currentIndex]) {
                            // Merge cells, move onto next in row
                            board[i * this.size + k] = board[i * this.size + k] * 2;
                            board[currentIndex] = 0;
                            this.gameState.score += board[i * this.size + k];

                            if (board[i * this.size + k] == 2048) {
                                this.gameState.won = true;
                            }
                            mergable += 1;
                            moved = true;
                            break;
                        } else {
                            // Cannot merge cells, move onto next in row
                            mergable += 1;
                            break;
                        }
                    }
                }
            }
        } else {
            for (let i = 0; i < this.size; i++) { // Each row
                let mergable = this.size - 1;

                for (let j = this.size - 1; j >= 0; j--) { // Each column/row
                    let currentIndex = i * this.size + j;

                    if (board[currentIndex] == 0) {
                        continue;
                    }
                    
                    for (let k = j + 1; k <= mergable; k++) {
                        if (board[i * this.size + k] == 0) {
                            board[i * this.size + k] = board[currentIndex];
                            board[currentIndex] = 0;
                            currentIndex += 1;
                            moved = true;
                            continue;
                        } else if (board[i * this.size + k]
                                    == board[currentIndex]) {
                            board[i * this.size + k] = board[i * this.size + k] * 2;
                            board[currentIndex] = 0;
                            this.gameState.score += board[i * this.size + k];

                            if (board[i * this.size + k] == 2048) {
                                this.gameState.won = true;
                            }
                            mergable -= 1;
                            moved = true;
                            break;
                        } else {
                            mergable -= 1;
                            break;
                        }
                    }
                }
            }
        }

        return moved;
    }

    moveColumns(direction) {
        let board = this.gameState.board;
        let moved = false;
        if (direction == 'up') {
            for (let j = 0; j < this.size; j++) { // Each column
                // Run through each cell in each row,
                // Keep track of which cells have already been merged,
                // And move cells as needed.
                let mergable = 0;
                for (let i = 0; i < this.size; i++) { // Each row/column
                    let currentIndex = i * this.size + j;
                    // Ignore cell if empty
                    if (board[currentIndex] == 0) {
                        continue;
                    }
                    // If cell not empty, look at all cells before this
                    for (let k = i - 1; k >= mergable; k--) {
                        if (board[k*this.size + j] == 0) {
                            // swap
                            board[k*this.size + j] = board[currentIndex];
                            board[currentIndex] = 0;
                            currentIndex -= this.size;
                            moved = true;
                            continue;
                        } else if (board[k*this.size + j]
                                    == board[currentIndex]) {
                            // Merge cells, move onto next in column
                            board[k*this.size + j] = board[k*this.size + j] * 2;
                            board[currentIndex] = 0;
                            this.gameState.score += board[k*this.size + j];

                            if (board[k*this.size + j] == 2048) {
                                this.gameState.won = true;
                            }
                            mergable += 1;
                            moved = true;
                            break;
                        } else {
                            // Cannot merge cells, move onto next in column
                            mergable += 1;
                            break;
                        }
                    }
                }
            }
        } else {
            for (let j = 0; j < this.size; j++) { // Each column
                let mergable = this.size - 1;
                for (let i = this.size - 1; i >= 0; i--) { // Each row/column
                    let currentIndex = i * this.size + j;
                    if (board[currentIndex] == 0) {
                        continue;
                    }
                    for (let k = i + 1; k <= mergable; k++) {
                        if (board[k*this.size + j] == 0) {
                            // swap
                            board[k*this.size + j] = board[currentIndex];
                            board[currentIndex] = 0;
                            currentIndex += this.size;
                            moved = true;
                            continue;
                        } else if (board[k*this.size + j]
                                    == board[currentIndex]) {
                            board[k*this.size + j] = board[k*this.size + j] * 2;
                            board[currentIndex] = 0;
                            this.gameState.score += board[k*this.size + j];

                            if (board[k*this.size + j] == 2048) {
                                this.gameState.won = true;
                            }
                            mergable -= 1;
                            moved = true;
                            break;
                        } else {
                            mergable -= 1;
                            break;
                        }
                    }
                }
            }
        }

        return moved;
    }

    hasLost() {
        // First check that the board is full
        for (let i = 0; i < this.gameState.board.length; i++) {
            if (this.gameState.board[i] == 0) {
                return false;
            }
        }
        
        // Check for horizontal and vertical tile matches
        for (let i = 0; i < this.size; i++) { // Rows
            // Check first two cells independently, for efficiency
            if (this.gameState.board[i * this.size]
                == this.gameState.board[i * this.size + 1]) {
                    return false;
            }

            for (let j = 1; j < this.size - 1; j++) {
                let center = this.gameState.board[i * this.size + j];
                let right = this.gameState.board[i * this.size + j + 1]; 
                if (center == right) {
                    return false;
                }
            }
        }
        
        for (let j = 0; j < this.size; j++) { // Columns
            if (this.gameState.board[j]
                == this.gameState.board[j + this.size]) {
                    return false;
            }

            for (let i = 1; i < this.size - 1; i++) {
                let center = this.gameState.board[i * this.size + j];
                let bottom = this.gameState.board[(i+1)*this.size + j];
                if (center == bottom) {
                    return false;
                }
            }
        }

        return true;
    }

    newTilelocation() {
        let randomArray = []
        for (let i = 0; i < this.size * this.size; i++) {
            if (this.gameState.board[i] == 0) {
                randomArray.push(i)
            }
        }

        for (let i = 0; i < randomArray.length; i++) {
            let changeLocation = i + Math.floor(Math.random() * (randomArray.length - i));
            let temp = randomArray[i];
            randomArray[i] = randomArray[changeLocation];
            randomArray[changeLocation] = temp;
        }

        return randomArray;
    }

    createTile() {
        let tileLocation = this.newTilelocation()[0];
        if (Math.random() < 0.9) {
            this.gameState.board[tileLocation] = 2;
        } else {
            this.gameState.board[tileLocation] = 4;
        }
    }
}