export class Connect4 {
  /*
    connect 4
     Considering that the game has:
     - Initial state (board)
     - actions (possible Actions)
     - transition model (updateBoard)
     - goal test (winner)
  */
  constructor() {
    // Each array represents a column. Thus, board[0] is column 0
    // board.length = 7 (columns), and board[0].length = 6 (rows)
    // cell board = null when empty, or 1 ocupied by player 1 or 2 when ocupied by player 2
    this.board = [[null, null, null, null, null, null],
                  [null, null, null, null, null, null],
                  [null, null, null, null, null, null],
                  [null, null, null, null, null, null],
                  [null, null, null, null, null, null],
                  [null, null, null, null, null, null],
                  [null, null, null, null, null, null]]
    
    this.winnerPlayer = null
  }
  

  play(col_number) {
    if (this.winnerPlayer != null) {
      return "Game has finished!"
    }
    
    if (col_number > this.board.length-1) {
      return "invalid move"
    }

    let possibleActions = this.actions()
    if (!possibleActions.includes(col_number)) {
      return "Column full!"
    } else {
      this.updateBoard(col_number);
      this.winnerPlayer = this.winner()
      if (this.winnerPlayer != null) {
        return `Player ${this.winnerPlayer} wins!`
      } else {
        return `Player ${this.nextPlayer()} has a turn`
      }
    }
  }

  updateBoard(col_num) {
    /*
    parameters: int column number
    update the board.
    */
    let index = 0
    for (let i = 0; i < this.board[col_num].length; i++) {
      if (this.board[col_num][i] === null) {
        index = i;
      } else {
        break
      }
    }
    this.board[col_num].splice(index + 1, 0, this.nextPlayer())
    this.board[col_num].shift()
    
  }

  nextPlayer() {
    /*
    return int
    return next player based on the current board. 
    1 for player 1 and 2 for player 2 
    */
    let player1_count = 0
    let player2_count = 0
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === 1) {
            player1_count += 1;
        } else if (this.board[i][j] === 2) {
          player2_count += 1;
        }
      }
    }
    
    if (player1_count <= player2_count) {
      return 1
    } else {
      return 2
    }
  }

  actions() {
    /*
    return int array of all possible actions (columns)
    */
   let possibleActions = []

   for (let i = 0; i < this.board.length; i++) {
      let availableCells = this.board[i].filter((elem) => elem === null)
      if (availableCells.length > 0) {
        possibleActions.push(i)
      }
   }

   return possibleActions
  }

  winner() {
    /*
    return 1 if player 1 won, 2 if player 2 won or null if there is no winner yet
    */

   let waysTowin = []
   // generate all combinations to win
   // ways to win vertically
   for (let i = 0; i < this.board.length; i++) {
    for (let k = 0; k < this.board[0].length - 3; k++) {
      let winnerSequence = []
      for (let n = k; n < k + 4; n++) {
        winnerSequence.push(`${i},${n}`)
      }
      waysTowin.push(winnerSequence)
    }
   }
    
    // ways to win horizontally
    for (let j = 0; j < this.board[0].length; j++) {
    for (let k = 0; k < this.board.length - 3; k++) {
      let winnerSequence = []
      for (let n = k; n < k + 4; n++) {
        winnerSequence.push(`${n},${j}`)
      }
      waysTowin.push(winnerSequence)
    }
   }

    //ways  to win diagonally
    // NOT YET IMPLEMENTED
    // TODO

    let player1_cells = this.playerCells(1)
    let player2_cells = this.playerCells(2)
    
    for (const item of waysTowin) {
      if (item.every(element => player1_cells.includes(element))) {
        return 1
      } else if (item.every(element => player2_cells.includes(element))) {
        return 2
      } 
    }
    return null
  }

  playerCells(player) {
    /* 
  parameter: int (player)
  return: [string "col,row", string "col2, row2", ...]
  return an array of cells occupied by a player in format ["col,row", ...]
  */
   let cells = []
   for (let i = 0; i < this.board.length; i++) {
    for (let j = 0; j < this.board[i].length; j++) {
      if (this.board[i][j] === player) {
        cells.push(`${i},${j}`)
      }
    }
  }
   return cells
  }
}

