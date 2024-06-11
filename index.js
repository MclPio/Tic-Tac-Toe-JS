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

  const players = [
             { name: 'Player1', token: 1, score: 0 },
             { name: 'Player2', token: 2, score: 0 }
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

  function showContinueButton(callback) {
    const continueContainer = document.getElementById('continue-container');
    continueContainer.innerHTML = ''; // Clear any existing content
  
    const continueButton = document.createElement('button');
    continueButton.id = 'continue-button';
    continueButton.innerText = 'Continue';
    continueContainer.appendChild(continueButton);
  
    continueContainer.classList.remove('hidden');

    continueButton.addEventListener('click', () => {
      continueContainer.classList.add('hidden');
      continueContainer.innerHTML = '';
      callback();
    });
  };

  function play() {
    display.announceTurn(getActivePlayer().name);
    const gridContainer = document.getElementById("grid-container");
    gridContainer.addEventListener("click", (event) => {
      let buttonIndex = event.target.dataset.index
      let clean_input = playerInput(buttonIndex)
      if (clean_input || clean_input == '0'){
        board.insertToken(clean_input, getActivePlayer().token);
        display.updateButtons(board);
        if (winCheck(getActivePlayer().token) === true){
          display.announceResults(`${getActivePlayer().name} wins!`)
          getActivePlayer().score += 1;
          display.updateScore(players)
          showContinueButton(() => {
            board = Gameboard();
            display.updateButtons(board);
            display.announceResults(``);
            display.announceTurn(getActivePlayer().name);
          });
        } else if (!board.stepsLeft()) {
          display.announceResults(`Tie game`)
          showContinueButton(() => {
            board = Gameboard();
            display.updateButtons(board);
            display.announceResults(``);
            display.announceTurn(getActivePlayer().name);
          });
        }
        switchPlayerTurn();
        display.announceTurn(getActivePlayer().name);
      };
   });
  };

  function resetButton() {
    const resetButton = document.createElement('button');
    resetButton.innerText = 'Reset';
    resetButton.id = 'resetGame';
    const gameDisplay = document.getElementById('game-display');
    gameDisplay.appendChild(resetButton);

    resetButton.addEventListener('click', () => {
      if (window.confirm("Are you sure?")){
        players[0].score = 0;
        players[1].score = 0;
        display.updateScore(players);
        board = Gameboard();
        display.updateButtons(board);
      }
    })
  }

  function setUp() {
    const main = document.getElementById('game-menu');
    const player1NameInput = document.createElement('input');
    const player2NameInput = document.createElement('input');
    const player1NameLabel = document.createElement('label');
    const player2NameLabel = document.createElement('label');
    const submitButton = document.createElement('button');
    submitButton.id = 'submitNames'
    submitButton.innerText = 'Start'
    player1NameLabel.htmlFor = 'player1NameInput';
    player2NameLabel.htmlFor = 'player2NameInput';
    player1NameLabel.innerText = 'Player 1';
    player2NameLabel.innerText = 'Player 2';
    player1NameInput.id = 'player1NameInput';
    player2NameInput.id = 'player2NameInput';

    main.appendChild(player1NameLabel);
    main.appendChild(player1NameInput);
    main.appendChild(player2NameLabel);
    main.appendChild(player2NameInput);
    main.appendChild(submitButton);
    
    submitButton.addEventListener('click', () => {      
      if (player1NameInput.value && player2NameInput.value) {
        players[0].name = player1NameInput.value
        players[1].name = player2NameInput.value
        main.classList.add('hidden')
        document.getElementById('game-display').classList.remove('hidden')
        play();
        display.setScoreNames(players)
        resetButton();
      }
    })
  }
  
  return { setUp }
};

function displayController() {
  function updateButtons(boardObj){
    buttons = document.getElementsByClassName('tic-tac-toe-button')
    for (i in boardObj.getBoard()){
      if (boardObj.getBoard()[i].getValue() != 0){
        buttons[i].textContent = boardObj.getBoard()[i].getValue()
        if (boardObj.getBoard()[i].getValue() == '1'){
          buttons[i].textContent = 'X';
        } else {
          buttons[i].textContent = 'O';
        }
      } else {
        buttons[i].textContent = null
      }
    }
  }

  function announceTurn(playerName){
    turnAnnouncement = document.getElementById('turn-announcement')
    turnAnnouncement.textContent = `${playerName} turn`
  }

  function announceResults(string){
    announcementHeader = document.getElementById('announce-results');
    announcementHeader.textContent = string
  }

  function setScoreNames(players){
    player1Name = document.getElementById('player1Name');
    player2Name = document.getElementById('player2Name');
    player1Name.innerText = players[0].name
    player2Name.innerText = players[1].name
  }


  function updateScore(players){
    const player1Score = document.getElementById('player1Score');
    const player2Score = document.getElementById('player2Score');
    player1Score.innerText = players[0].score;
    player2Score.innerText = players[1].score;
  }

  return { updateButtons, announceTurn, setScoreNames, updateScore, announceResults };
};

GameController().setUp()
// todo:
// display element that shows the results upon game end
// ask for continue once games finish
// at first randomly choose 
// implement restart button, so game score resets
