// 1. have as little global variables as possible. Try tucking in factories. If need single instance of something,
// wrap inside IIFE so it cannot reused to create additional instances.

// 2. Each piece of functionality should be able to fit in the game, player, or gameboard objects.

// 3. Avoid DOM/HTML/CSS until working game in console.

// Gameboard Obj
//    gameboard = []

// player Obj
// player 1
// player 2

// flow of game Obj

function Gameboard() {
  const board = []
  for (let i = 0; i < 9; i ++) {
    board.push(Cell());
  }
  const getBoard = () => board;

  const insertToken = (idx, playerToken) => {
      board[idx].addToken(playerToken)
  }
  const stepsLeft = () => {
    for (i in board) {
      if (board[i].getValue() === '0') {
        return true
      }
    }
    return false
  }

  const printBoard = () => {
    for (let i = 0; i < 9; i += 3) {
      console.log(`${board[i].getValue()}, ${board[i+1].getValue()}, ${board[i+2].getValue()}`)
    }
  }

  return { getBoard, insertToken, printBoard, stepsLeft }
};

function Cell() {
  let value = '0';

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { addToken, getValue };
};

function GameController() {

  let board = Gameboard()
  let display = displayController()

  players = [
             { name: 'Player1', token: 1 },
             { name: 'Player2', token: 2 }
            ]
  let activePlayer = players[0]
  function getActivePlayer() {
    return activePlayer;
  }
  function switchPlayerTurn() { 
    if (activePlayer === players[0]) {
      activePlayer = players[1];
    } else {
      activePlayer = players[0];
    }
  }

  function playerInput(idx){
    input = parseInt(idx);
    if (Number.isInteger(input));
      if (input >= 0 && input <= 8) {
        if (board.getBoard()[input].getValue() != '0') {
          console.log('Cell is filled')
        } else {
          return input;
        }
      };
  };
  function winCheck(sign) {
    function diagonal(sign) {
      if (board.getBoard()[0].getValue() === sign && board.getBoard()[4].getValue() === sign && board.getBoard()[8].getValue() === sign) {
        return true
      } else if (board.getBoard()[2].getValue() === sign && board.getBoard()[4].getValue() === sign && board.getBoard()[6].getValue() === sign) {
        return true
      } else {
        return false
      }
    }
  
    function vertical(sign) {
      if (board.getBoard()[0].getValue() === sign && board.getBoard()[3].getValue() === sign && board.getBoard()[6].getValue() === sign) {
        return true
      } else if (board.getBoard()[1].getValue() === sign && board.getBoard()[4].getValue() === sign && board.getBoard()[7].getValue() === sign) {
        return true
      } else if (board.getBoard()[2].getValue() === sign && board.getBoard()[5].getValue() === sign && board.getBoard()[8].getValue() === sign){
        return true
      } else {
        return false
      }
    }
  
    function horizontal(sign) {
      if (board.getBoard()[0].getValue() === sign && board.getBoard()[1].getValue() === sign && board.getBoard()[2].getValue() === sign) {
        return true
      } else if (board.getBoard()[3].getValue() === sign && board.getBoard()[4].getValue() === sign && board.getBoard()[5].getValue() === sign) {
        return true
      } else if (board.getBoard()[6].getValue() === sign && board.getBoard()[7].getValue() === sign && board.getBoard()[8].getValue() === sign){
        return true
      } else {
        return false
      }
    }

    if (diagonal(sign) || vertical(sign) || horizontal(sign)){
      return true
    } else {
      return false
    }
  }

  function play() {
    display.announceTurn(getActivePlayer().name);
    const gridContainer = document.getElementById("grid-container");
    gridContainer.addEventListener("click", (event) => {
      console.log(board.stepsLeft())
      let buttonIndex = event.target.dataset.index
      console.log(buttonIndex)
      let clean_input = playerInput(buttonIndex)
      board.insertToken(clean_input, getActivePlayer().token);
      display.updateButtons(board);
      if (winCheck(getActivePlayer().token) === true){
        console.log(`${getActivePlayer().name} wins!`)
        board = Gameboard();
        display.updateButtons(board);
      } else if (board.stepsLeft() == false) {
        console.log(`Tie game`)
        board = Gameboard();
        display.updateButtons(board);
      }
      board.printBoard()
      switchPlayerTurn();
      display.announceTurn(getActivePlayer().name);
   });
  };
  
  return { play }
};

function displayController() {
  function updateButtons(boardObj){
    buttons = document.getElementsByClassName('tic-tac-toe-button')
    for (i in boardObj.getBoard()){
      buttons[i].textContent = boardObj.getBoard()[i].getValue()
    }
  }

  function announceTurn(playerName){
    turnAnnouncement = document.getElementById('turn-announcement')
    turnAnnouncement.textContent = `${playerName} turn`
  }

  return { updateButtons, announceTurn };
}

GameController().play()