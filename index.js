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

const game = (function () {
  let gameboard = ['_', '_', '_',
                   '_', '_', '_',
                   '_', '_', '_'
                  ]

  const insertX = (location) => gameboard[location] = 'X'
  const insertO = (location) => gameboard[location] = 'O'
  const showBoard = () => console.log(gameboard)

  return { insertX, insertO, showBoard, gameboard}
})();

const playerX = (function () {
  const insert  = (idx) => game.insertX(idx)
  return { insert }
})();

const playerO = (function () {
  const insert  = (idx) => game.insertO(idx);
  return { insert }
})();

const gameflow = (function () {
  const startGame = function() {
    game.showBoard();
    while (winCheck) {
      userInput(playerX);
      game.showBoard();
      winCheck();
      userInput(playerO);
      game.showBoard();
      winCheck();
    }
  }

  const userInput = function(player) {
    while (true) {
      input = parseInt(prompt("Enter sign location, choose a value from 0-8"))

      if (input >= 0 && input <= 8 && Number.isInteger(input)) {
        break
      } else {
        console.log("Enter a valid input")
      }
    }
    player.insert(input)
  }

  const winCheck = function() {
    // return true if win condition
    const diagonal = function(sign) {
      if (game.gameboard[0] === sign && game.gameboard[4] === sign && game.gameboard[8] === sign) {
        return true
      } else if (game.gameboard[2] === sign && game.gameboard[4] === sign && game.gameboard[6] === sign) {
        return true
      } else {
        return false
      }
    }
  
    const vertical = function(sign) {
      if (game.gameboard[0] === sign && game.gameboard[3] === sign && game.gameboard[6] === sign) {
        return true
      } else if (game.gameboard[1] === sign && game.gameboard[4] === sign && game.gameboard[7] === sign) {
        return true
      } else if (game.gameboard[2] === sign && game.gameboard[5] === sign && game.gameboard[8] === sign){
        return true
      } else {
        return false
      }
    }
  
    const horizontal = function(sign) {
      if (game.gameboard[0] === sign && game.gameboard[1] === sign && game.gameboard[2] === sign) {
        return true
      } else if (game.gameboard[3] === sign && game.gameboard[4] === sign && game.gameboard[5] === sign) {
        return true
      } else if (game.gameboard[6] === sign && game.gameboard[7] === sign && game.gameboard[8] === sign){
        return true
      } else {
        return false
      }
    }

    diagonal('X');
    vertical('X');
    horizontal('X');
    diagonal('O');
    vertical('O');
    horizontal('O');
  }

  return { startGame }
})();
