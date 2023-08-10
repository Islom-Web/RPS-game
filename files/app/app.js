const GameTable = require('../Table/Table');
const Define = require('../Judge/Judge');
const Security = require('../Security/Security');

class Game {
  constructor() {
    const args = process.argv.slice(2);
    this.moves = args.map(move => move.toLowerCase());

    if (args.length < 3 || args.length % 2 === 0 || new Set(this.moves).size !== this.moves.length) {
      console.error('Error: Please provide an odd number >= 3 of unique moves.');
      process.exit(1);
    }

    this.key = '';
  }

  async getUserInput(prompt) {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      readline.question(prompt, (input) => {
        readline.close();
        resolve(input);
      });
    });
  }

  async playRound() {
    const computerMoveIndex = Math.floor(Math.random() * this.moves.length);
    const computerMove = this.moves[computerMoveIndex];
    const security = new Security(computerMove);
    security.play();
    this.key = security.key;

    console.log('Available moves:');
    for (let i = 0; i < this.moves.length; i++) {
      console.log(`${i + 1} - ${this.moves[i]}`);
    }
    console.log('0 - Exit');
    console.log('? - help');

    const userInput = await this.getUserInput('Enter your move> ');
    const userChoice = userInput === '?' ? userInput : parseInt(userInput);

    if (userChoice === 0) {
      console.log('Exit the game.');
      process.exit(0);
    } else if (userChoice === '?') {
      const gameTable = new GameTable();

      gameTable.addRow({ ' v PC/User >': 'Rock', Rock: 'Draw', Paper: 'Win', 'Scissors': 'Win', 'Spock': 'Lose', 'Lizard': 'Lose' });
      gameTable.addRow({ ' v PC/User >': 'Paper', Rock: 'Lose', Paper: 'Draw', 'Scissors': 'Win', 'Spock': 'Win', 'Lizard': 'Lose' });
      gameTable.addRows([
        { ' v PC/User >': 'Scissors', Rock: 'Lose', Paper: 'Lose', 'Scissors': 'Draw', 'Spock': 'Win', 'Lizard': 'Win' },
        { ' v PC/User >': 'Spock', Rock: 'Win', Paper: 'Lose', 'Scissors': 'Lose', 'Spock': 'Draw', 'Lizard': 'Win' },
        { ' v PC/User >': 'Lizard', Rock: 'Win', Paper: 'Win', 'Scissors': 'Lose', 'Spock': 'Lose', 'Lizard': 'Draw' },
      ]);
      
      gameTable.printTable();
    } else if (userChoice >= 1 && userChoice <= this.moves.length) {
      const userMove = this.moves[userChoice - 1];
      console.log(`Your move: ${userMove}`);

      const define = new Define(this.moves.length);
      const result = define.calculateResult(userChoice, computerMoveIndex);

      console.log(`Computer Move: ${computerMove}`);
      console.log(`Result: ${result}`);
      console.log(`HMAC key: ${this.key.toUpperCase()}`);
      console.log('\n');



      await this.playRound();
    }
  }

  async startGame() {
    console.log('Welcome to the game!');
    await this.playRound();
  }
}

const game = new Game();
game.startGame();
