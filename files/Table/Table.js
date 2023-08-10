const { Table } = require('console-table-printer');

class GameTable {
  constructor() {
    this.table = new Table();
  }

  addRow(data, options) {
    this.table.addRow(data, options);
  }

  addRows(rows) {
    this.table.addRows(rows);
  }

  printTable() {
    this.table.printTable();
  }
}

module.exports = GameTable;