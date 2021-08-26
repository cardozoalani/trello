//columnas y tarjetas con moveCard
const _ = require("lodash");
const noMoveOldColum = { list: "list" };
const noMoveNewColum = { backlog: "backlog" };

class Trello {
  constructor() {
    this.board = [];
  }

  addColumn(name) {
    this.board = [...this.board, { column: name, cards: [] }];
  }

  getBoard() {
    console.log(this.board);
  }

  addCardColumn(card, column) {
    const columnIndex = this.board.findIndex(
      (element) => element.column === column
    );
    this.board[columnIndex] = {
      ...this.board[columnIndex],
      cards: [...this.board[columnIndex].cards, card],
    };
  }

  moveCard(column, newColumn, card) {
    if (
      Object.values(noMoveOldColum).includes(column) ||
      Object.values(noMoveNewColum).includes(newColumn)
    ) {
      return console.log("it is not possible to make this move");
    }
    const columnIndex = this.board.findIndex(
      (element) => element.column === column
    );

    let newColumnIndex = this.board.findIndex(
      (element) => element.column === newColumn
    );
    const existNewColum = this.board.some(
      (element) => element.column === newColumn
    );
    if (!existNewColum) {
      this.addColumn(newColumn);
      newColumnIndex = this.board.findIndex(
        (element) => element.column === newColumn
      );
    }
    _.remove(
      this.board[columnIndex].cards,
      (element) => element.id !== card.id
    );
    this.board[newColumnIndex].cards = [
      ...this.board[newColumnIndex].cards,
      card,
    ];
  }
}

const trello = new Trello();

trello.addColumn("todo");
trello.addColumn("task");
trello.addCardColumn({ name: "hacer un trello", id: 1 }, "todo");
trello.addCardColumn({ name: "hacer un trellos", id: 2 }, "todo");
trello.getBoard();
trello.moveCard("todo", "backlog", { name: "hacer un trellos", id: 2 });
trello.getBoard();
