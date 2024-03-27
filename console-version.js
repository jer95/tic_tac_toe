 
 const game = (function (){

    const board = []
    const rows = 3;
    const columns = 3;

    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push(Square())
        }
    }
    
        const boardDisplay = () =>  board.map((row) => row.map((square) => square.getMarker()))

        let changeTurns = true;

        const getChangeTurns = () => changeTurns;

        let gameBoard = boardDisplay();

        const resetGameBoard = function () {
            for(let row = 0; row < gameBoard.length; row++){
                for(let col = 0; col < gameBoard.length; col++){
                    gameBoard[row][col] = null;
                }
            }
        }

        const placeMarker = (row,column,playersTurn) => {
            if(row > 2 || column > 2 || row < 0 || column < 0){
                console.log('Error! Out of Range, Enter a number between 0 and 2')
                changeTurns = false;
            }
            else if(gameBoard[row][column] === null){
            gameBoard[row][column] = playersTurn.marker;
                console.log(`Placing ${playersTurn.player}'s marker.`)
                changeTurns = true;
            }
            else {
                console.log(`This square is not empty. Please try another square.`)
                console.log(`It's still ${playersTurn.player}'s turn`)
                changeTurns = false;
        }
        console.log(gameBoard)
    }
    
    const getGameBoard = () => gameBoard;

    console.log(gameBoard);

    return {placeMarker,getChangeTurns,getGameBoard,resetGameBoard};
})()


function Square() { 
    let marker = null 

    const getMarker =  () => marker;
    
    return {getMarker}
}


function createPlayer(){

function Players(player,marker){
    this.player = player;
    this.marker = marker;
   }

    const playerOneName = prompt("Player 1 enter your display name:",'Player 1')
    let playerOneMarker = prompt(`${playerOneName} please enter X or O as a marker`,'X')

    while(!(playerOneMarker === 'X' || playerOneMarker === 'x' || playerOneMarker === 'O' || playerOneMarker === 'o')){
         console.log('Error please enter a valid marker')
         console.log(playerOneMarker)
         playerOneMarker = prompt(`${playerOneName} please enter X or O as a marker`,'X')
         
    }
    const player1 = new Players(playerOneName,playerOneMarker)
    let playerTwoName = prompt("Player 2 Please enter a display name: ",'Player 2')
    let playerTwoMarker = playerOneMarker == 'X' || playerOneMarker == 'x' ? 'O' : 'X'
    const player2 = new Players(playerTwoName,playerTwoMarker)
    const players = []
    players.push(player1)
    players.push(player2)
    console.log(players)

    const getPlayers = () => players

    return{getPlayers}
}


function GameControls() {

    const gameCtrl = game;

    const getPlayersTurn = () => playersTurn;
    const changeTurns = () =>  playersTurn === players[0] ? playersTurn = players[1] : playersTurn = players[0];
    
    const addPlayers = createPlayer()
    const players = addPlayers.getPlayers()

    let playersTurn = players[0]

    let gameBoardArr = game.getGameBoard();
    
    let gameOver = false;


    function winCheck(){

        for(let a = 0; a < players.length; a++) {       
            for(let j = 0; j < gameBoardArr.length; j++){
                if ((gameBoardArr[j][0] == players[a].marker &&
                    gameBoardArr[j][1] == players[a].marker &&
                    gameBoardArr[j][2] == players[a].marker) ||

                    (gameBoardArr[0][j] == players[a].marker &&
                    gameBoardArr[1][j] == players[a].marker &&
                    gameBoardArr[2][j] == players[a].marker) ||

                    (gameBoardArr[0][0] == players[a].marker &&
                    gameBoardArr[1][1] == players[a].marker &&
                    gameBoardArr[2][2] == players[a].marker) ||

                    (gameBoardArr[0][2] == players[a].marker &&
                    gameBoardArr[1][1] == players[a].marker &&
                    gameBoardArr[2][0] == players[a].marker)) {

                        console.log(`Congratulations ${players[a].player} you are the winner!`)
                        const winningBoard = gameBoardArr.map((row) => row.map((square) => square))
                        console.log(winningBoard)
                        gameOver = true;
                        console.log('Play Again?')
                } 
            }
        }

        const tie = gameBoardArr.every(row => row.every(square => square !== null))

        if(tie){
            console.log("Oops we have a tie! Run it back?")
            gameOver = true;
        }
    }

    
        const playRound = (row,column) => {

        gameCtrl.placeMarker(row,column,playersTurn)

        if(gameCtrl.getChangeTurns() == true){
            changeTurns()
            winCheck()
            console.log(`It's now ${playersTurn.player}'s turn`);
            console.log(gameBoardArr)
        }

        if(gameOver){
            gameCtrl.resetGameBoard();
        }
  }
  
    return {playRound,getPlayersTurn,changeTurns}
}

const runGame = GameControls();
console.log('Execute runGame.playRound(row,column) with a row and column to play. Score is not tracked from game to game in console version.')