class Define {
	constructor(moves) {
	  this.moves = moves;
	}
  
	calculateResult(userChoice, computerMoveIndex) {
	  const diff = (this.moves + computerMoveIndex - (userChoice - 1)) % this.moves;
	  let result;
  
	  if (diff === 0) {
		result = 'Draw';
	  } else if (diff % 2 === 1) {
		result = 'You win!';
	  } else {
		result = 'You lost';
	  }
  
	  return result;
	}
  }

module.exports = Define