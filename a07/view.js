import Game from "./engine/game.js";

function gameview() {
    return $(`
    <div id="root">
        <section id="header">
            <div class="header-text has-text-weight-semibold">2048</div>
        </section>

        <section id="game-view">
            <div id="scoreboard">
                <div class="container">
                    <div class="button has-text-weight-semibold" id="score-panel" disabled>
                        <p>Score: </p>
                        <p id="score"></p>
                    </div>
                    <button class="button is-white has-text-weight-semibold" id="newgame-button">New Game</button>
                </div>
            </div>
            
            <div id="game-pro">
                <div id="game-board"></div>
            </div>
            <div id="game-message">
                <p> <br>
                    Join the numbers and get to the 2048 tile! <br><br>
                    2048 implemented in grayscale for players with a visual impairment.
                </p>
            </div>
        </section>

        <section id="credit">
            Adam Alston, 2019
        </section>
    </div>
    `);
}

function loadGame(game) {
    let size = game.size;
    // Generate empty tiles
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            $('#game-board').append(
                $('<div class="game-tile empty-tile"></div>')
                .css({top: ((1 + i * 15)+'vmin'), left: ((1 + j * 15)+'vmin')})
            );
        }
    }

    loadScore(game);
    loadTiles(game);
}

function loadScore(game) {
    $('#score').empty().text(game.gameState.score);
}

function loadTiles(game) {
    let size = game.size;
    let board = game.gameState.board;
    let gameboard = $('#game-board');

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            gameboard.find('#' + (i * size + j)).remove();

            let currentValue = board[i * size + j];
            if (currentValue != 0) {
                gameboard.append(
                    $(`<div class="game-tile centerall tile-${currentValue}">${currentValue}</div>`)
                    .css({top: ((1 + i * 15)+'vmin'), left: ((1 + j * 15)+'vmin')})
                    .attr('id', (i * size + j))
                );
            }
        }
    }
}

function detachAll() {
    $(document).off('keydown');
    let winMessage = $('#win-message');
    if (winMessage.length) {
        winMessage.remove();
    }
    let loseMessage = $('#lose-message');
    if (loseMessage.length) {
        loseMessage.remove();
    }
}

function attachEventHandlers(game) {
    $(document).keydown((keyEvent) => {
        switch(keyEvent.which) {
            case 37: // left
            game.move('left');
            break;
            case 38: // up
            game.move('up');
            break;
            case 39: // right
            game.move('right');
            break;
            case 40: // down
            game.move('down');
            break;
        };
        loadTiles(game);
        loadScore(game);
    });

    game.onLose(() => {
        // alert("You lost!\n\nselect New Game to try again");
        $('<div id="lose-message"></div>')
        .appendTo('#root')
        .append(
            $(`
            <div>
                <p>You lost, press <b>New Game</b> to try again</p>
            </div>
            `)
            .css({  "font-size": "6vmin", "color": "white", 
                    "text-align": "center", "opacity": "1",
                    "background-color": "black"})
        )
    });
    game.onWin(() => {
        // alert("You Win!\n\nKeep going!");
        if(!($('#root').find('#win-message').length)) {
            $('<div id="win-message"></div>').appendTo('#root').append(
                $(`<div>
                    <p>You won! Your score was: ${game.gameState.score}</p>
                    <p> Press <b>Continue</b> to keep going <br>
                        or <b>New Game</b> to start over</p>
                    <button class="button is-white has-text-weight-semibold" id="continue">Continue</button>
                </div>`)
                .css({  "font-size": "6vmin", "color": "white", 
                        "text-align": "center", "opacity": "0.9", 
                        "background-color": "black"}))

                .find('#continue').on('click', () => {
                    $('#win-message').empty();
                })
        }
    });
}

function reloadGame(game) {
    detachAll();
    loadScore(game);
    loadTiles(game);
    attachEventHandlers(game);
}

function initializePage() {
    let body = $('body');
    
    // Load initial empty page
    body.empty()
    body.append(gameview());

    // Load game board
    let game = new Game(4);
    loadGame(game);
    attachEventHandlers(game);

    // Set up new game button
    $('#newgame-button').on('click', () => {
        reloadGame(new Game(4));
    });
}

$(document).ready(initializePage());