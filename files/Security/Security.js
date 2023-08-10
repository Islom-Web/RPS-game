const crypto = require('crypto');
class Security {
  constructor(moves) {
    this.moves = moves
    this.key = this.generateRandomNumber(256);
  }

  generateRandomNumber(bits) {
    return crypto.randomBytes(Math.ceil(bits / 8)).toString('hex');
  }

  calculateHMAC(key, data) {
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(data);
    return hmac.digest('hex');
  }

  generateComputerMove() {
    const computerMoveIndex = Math.floor(Math.random() * this.moves.length);
    return this.moves[computerMoveIndex];
  }

  play() {
    const computerMove = this.generateComputerMove();
    const hmac = this.calculateHMAC(this.key, computerMove);
    console.log('HMAC:', hmac.toUpperCase());
  }
}



module.exports = Security