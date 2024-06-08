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

  const printBoard = () => {
    for (let i = 0; i < 9; i += 3) {
      console.log(`${board[i].getValue()}, ${board[i+1].getValue()}, ${board[i+2].getValue()}`)
    }
  }

  return { getBoard, insertToken, printBoard }
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

  function playerInput(){
    while (true) {
      input = parseInt(prompt('Enter a value between 0 and 8:'));
      if (Number.isInteger(input));
        if (input >= 0 && input <= 8) {
          if (board.getBoard()[input].getValue() != '0') {
            console.log('Cell is filled')
          } else {
            return input;
          }
        };
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

  function clickEvent(playerToken, boardObj){
    const gridContainer = document.getElementById("grid-container")
    // Event Delegation https://www.freecodecamp.org/news/event-delegation-javascript/
    gridContainer.addEventListener("click", (event) => {
      buttonIndex = event.target.dataset.index
      boardObj.insertToken(buttonIndex, playerToken);
      updateButtons(boardObj)
      console.log(boardObj.printBoard())
    })

  }

  function play() {
    display.announceTurn(getActivePlayer().name);
    display.clickEvent(getActivePlayer().token, board); // click event will have to be changing players and looping
    //update display with click
    //check for win
    //switch player turn

  }
  // function start() {
    
  //   let i = 0;
  //   while (i < 9){
  //     let boardObj = board.getBoard()
  //     console.log(`${getActivePlayer().name} turn:`);
  //     board.insertToken(playerInput(), getActivePlayer().token);
  //     board.printBoard();
  //     display.updateButtons(boardObj);
  //     if (winCheck(getActivePlayer().token) === true){
  //       console.log(`${getActivePlayer().name} wins!`)
  //       board = Gameboard()
  //       break
  //     }
  //     switchPlayerTurn();
  //     i++;
  //   };
  // }
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

  return { updateButtons, announceTurn, clickEvent };
}

GameController().play()