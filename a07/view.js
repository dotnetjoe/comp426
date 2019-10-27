import Game from "./engine/game.js";

var createdListeners = false;

export const updateBoard = function(game){
    document.getElementById("score").innerHTML = "Score: " + game.score;
    if(game.over == true){
        document.getElementById("end").innerHTML = "You lost, your score was " + game.score + ". Press <strong>New Game</strong> to try again!";
    }
    for(var i = 0; i < game.board.length; i++){
        document.getElementById(i.toString(10)).innerHTML = game.board[i];
        if(game.board[i] == 0){
            $(`#${i.toString(10)}`).css("visibility", "hidden"); 
        } else if (game.board[i] == 2048) {
            document.getElementById("end").innerHTML = "You won! Keep going!";
        } else {
            $(`#${i.toString(10)}`).css("visibility", "visible"); 
        }
        colorTiles(game, i);
    }
}

export const loadNewGame = function(game){
    for(var i = 0; i < game.board.length; i++){
        document.getElementById(i.toString(10)).innerHTML = game.board[i];
        if(game.board[i] == 0){
            $(`#${i.toString(10)}`).css("visibility", "hidden"); 
        }else{
            $(`#${i.toString(10)}`).css("visibility", "visible"); 

        }
        colorTiles(game, i);

    }
    document.getElementById("score").innerHTML = "Score: " + game.score;
    if(createdListeners == false){
        $(document).keydown(function(e){
            var s = String.fromCharCode(e.which);
            keyPressed(s, game);
            updateBoard(game);
        });
        $('#reset').on("click", function(){
            game.setupNewGame();
            document.getElementById("end").innerHTML = "";
            loadNewGame(game);
        });
        createdListeners = true;
    }
};

export const colorTiles = function(game, i){
    switch(game.board[i]){
        case 2:
            $(`#${i.toString(10)}`).css("background", "#ffffff");
            $(`#${i.toString(10)}`).css("color", "black");
            $(`#${i.toString(10)}`).css("font-size", "2vw");
            break;
        case 4:
            $(`#${i.toString(10)}`).css("background", "#eaeaea");
            $(`#${i.toString(10)}`).css("color", "black");
            $(`#${i.toString(10)}`).css("font-size", "2vw");
            break;
        case 8:
            $(`#${i.toString(10)}`).css("background", "#d4d4d4");
            $(`#${i.toString(10)}`).css("color", "black");
            $(`#${i.toString(10)}`).css("font-size", "2vw");
            break;
        case 16:
            $(`#${i.toString(10)}`).css("background", "#bfbfbf");
            $(`#${i.toString(10)}`).css("color", "black");
            $(`#${i.toString(10)}`).css("font-size", "2vw");
            break;
        case 32:
            $(`#${i.toString(10)}`).css("background", "#aaaaaa");
            $(`#${i.toString(10)}`).css("color", "black");
            $(`#${i.toString(10)}`).css("font-size", "2vw");
            break;
        case 64:
            $(`#${i.toString(10)}`).css("background", "#959595");
            $(`#${i.toString(10)}`).css("color", "black");
            $(`#${i.toString(10)}`).css("font-size", "2vw");
            break;
        case 128:
            $(`#${i.toString(10)}`).css("background", "#808080");
            $(`#${i.toString(10)}`).css("color", "white");
            $(`#${i.toString(10)}`).css("font-size", "2vw");
            break;
        case 256:
            $(`#${i.toString(10)}`).css("background", "#6a6a6a");
            $(`#${i.toString(10)}`).css("color", "white");
            $(`#${i.toString(10)}`).css("font-size", "2vw");
            break;
        case 512:
            $(`#${i.toString(10)}`).css("background", "#555555");
            $(`#${i.toString(10)}`).css("color", "white");
            $(`#${i.toString(10)}`).css("font-size", "2vw");
            break;
        case 1024:
            $(`#${i.toString(10)}`).css("background", "#404040");
            $(`#${i.toString(10)}`).css("color", "white");
            $(`#${i.toString(10)}`).css("font-size", "2vw");
            break;
        case 2048:
            $(`#${i.toString(10)}`).css("background", "#2b2b2b");
            $(`#${i.toString(10)}`).css("color", "white");
            $(`#${i.toString(10)}`).css("font-size", "2vw");
            break;
        case 4096:
            $(`#${i.toString(10)}`).css("background", "#151515");
            $(`#${i.toString(10)}`).css("color", "white");
            $(`#${i.toString(10)}`).css("font-size", "2vw");
            break;
        case 8192:
            $(`#${i.toString(10)}`).css("background", "#000000");
            $(`#${i.toString(10)}`).css("color", "white");
            $(`#${i.toString(10)}`).css("font-size", "2vw");
            break;
        default:
            $(`#${i.toString(10)}`).css("background", "#242431");
            $(`#${i.toString(10)}`).css("color", "white");
            $(`#${i.toString(10)}`).css("font-size", "2vw");
    }
}

export const keyPressed = function(key, game){
    switch (key) {
        case '\'':
            game.move('right');
            break;
        case '%':
            game.move('left');
            break;
        case '(':
            game.move('down');
            break;
        case '&':
            game.move('up');
            break;
    }
}

$(document).ready(function () {
    let game = new Game(4);
    loadNewGame(game);
});