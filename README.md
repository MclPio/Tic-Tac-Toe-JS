# Tic-Tac-Toe-JS

* [Project Description](https://www.theodinproject.com/lessons/javascript-tic-tac-toe)
* [Live](https://www.michaelpious.com/Tic-Tac-Toe-JS/)

## Table of Contents
1. [About](#about)
2. [Features](#features)
3. [Main Functions and Methods](#main-functions-and-methods)
4. [Gettings Started](#getting-started)
5. [How to Play](#how-to-play)
6. [Contributing](#contributing)
7. [License](#license)


## About
The project's goal is to create a Tic Tac Toe game using JavaScript, following the principles of the Factory Function pattern and Immediately Invoked Functional Expressions (IIFE) for modular design. This approach encapsulates functionality and minimizes global variables.

## Features
* **Modular Design:** Uses IIFE and factory functions to keep code organized and avoid global variable pollution.
* **Interactive Gameplay:** Users can play Tic Tac Toe against another player.
* **Responsive UI:**: The game interface adjusts to different screen sizes.
* **Live Score Updates:** Keeps track of player scores across games.

## Main Functions and Methods
1. `Gameboard` Manages the state and functionality of Tic Tac Toe board.
    * `getBoard()`: Returns the current state of the game board as an array of `Cell` objects. 
    * `insertToken(idx, playerToken)`: Inserts the player's token at the specified index on the board.
    * `printBoard()`: Prints the current state of the game board to the console, helpful for debugging. 
    * `stepsLeft`: Checks if there are any empty cells left on the board, returning `true` if so, and `false` otherwise.

2. `Cell` Represents a single cell on the game board.
    * `addToken(player)`: Assigns the player's token to the cell.
    * `getValue()`: Retrieves the current value of the cell, which can be a player's token or an empty state.

3. `Gamecontroller` Controls the flow of the game, including player turns and win conditions. 
    * `setUp()`: Initializes the game setup, including player name input and starting the game.
    * **Other Methods**: Contains internal methods for managing player input, checking win conditions, and handling game continuation or reset.

4. `displayController`: Handles the user interface and announcements.
    * `updateButtons(boardObj)`: Updates the button elements on the UI to reflect the current game board state.
    * `announceTurn(playerName)`: Displays whose turn it is on the UI.
    * `setScoreNames(players)`: Updates the UI with the names of the players.
    * `updateScore(players)`: Updates the score display on the UI.
    * `announceResults(message)`: Announce the result of the game, such as a win or a tie, on the UI.

## Getting Started
### Prerequisites
* A modern web broswer that supports JavaScript.
* Basic understanding of HTML, CSS, and JavaScript.

### Installation
1. Clone the repository:
    ```
    git clone https://github.com/MclPio/Tic-Tac-Toe-JS
    ```
2. Navigate to the project directory:
    ```
    cd Tic-Tac-Toe-JS
    ```
3. Open `index.html` in your broswer to start the game.

## How to Play
1. Enter the names of the two players in the provided input fields.
2. Click "Start" to begin the game.
3. Player 1 (X) and Player 2 (O) take turns clicking on the cells of the grid to place their tokens.
4. The game will automatically check for a winner or a tie after each move and update the display accordingly.
5. The score is updated after each game, and players can click the "Reset" button to start a new game.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bugfix:
    ```
    git checkout -b feature-name
    ```
3. Commit your changes:
    ```
    git commit -m 'Describe your feature or fix'
    ```
4. Push to your branch:
    ```
    git push origin feature-name
    ```
5. Create a pull request explaining your changes.

## License
This project is licensed under the MIT License.