class Board {
    constructor(width = 4, height = 4) {
        this.width = width;
        this.height = height;
        this.board = this.#setBoard(width, height);
        this.score = 0;
        this.won = false;
    }

    #setBoard(w, h) {
        const array = new Array(h);
        for (let i = 0; i < array.length; i++) {
            array[i] = new Array(w).fill(0);
        }
        return array;
    }

    #getRandomInt(min = 0, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    #addRandomTile() {
        let x, y;
        do {
            x = this.#getRandomInt(0, this.width - 1);
            y = this.#getRandomInt(0, this.height - 1);
        } while (this.board[y][x] !== 0);

        this.board[y][x] = Math.random() < 0.9 ? 2 : 4;
    }

    #slideLeft(row) {
        let newRow = row.filter(val => val); // Remove zeros
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] === newRow[i + 1]) {
                newRow[i] *= 2;
                newRow[i + 1] = 0;
                this.score += newRow[i];
            }
        }
        newRow = newRow.filter(val => val); // Remove new zeros
        while (newRow.length < this.width) newRow.push(0); // Add zeros to the end
        return newRow;
    }

    #slideRight(row) {
        let newRow = row.filter(val => val); // Remove zeros
        for (let i = newRow.length - 1; i > 0; i--) {
            if (newRow[i] === newRow[i - 1]) {
                newRow[i] *= 2;
                this.score += newRow[i];
                newRow[i - 1] = 0;
            }
        }
        newRow = newRow.filter(val => val); // Remove new zeros
        while (newRow.length < this.width) newRow.unshift(0); // Add zeros to the start
        return newRow;
    }

    didIWon() {
        if (!this.won) {
            for (let i = 0; i < this.board.length; i++) {
                if (this.board[i].includes(16)) {
                    this.won = true;
                    return alert("Congratulations, you Won!!! \n Keep playing and now go for the 8192");
                }
            }
        }
    }

    didILost() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.board[y][x] === 0) {
                    return false; // There is at least one empty space
                }
                if (x !== this.width - 1 && this.board[y][x] === this.board[y][x + 1]) {
                    return false; // There is a mergeable horizontal pair
                }
                if (y !== this.height - 1 && this.board[y][x] === this.board[y + 1][x]) {
                    return false; // There is a mergeable vertical pair
                }
            }
        }
        return alert("Game Over! No more possible moves."); // No moves left
    }

    #compareBoards(board1, board2) {
        for (let y = 0; y < board1.length; y++) {
            for (let x = 0; x < board1[y].length; x++) {
                if (board1[y][x] !== board2[y][x]) {
                    return false;
                }
            }
        }
        return true;
    }

    #copyBoard() {
        return this.board.map(row => row.slice());
    }

    initializeBoard() {
        const maxDimension = Math.max(this.width, this.height);
        const amountOfNums = Math.ceil(maxDimension / 2);

        for (let i = 0; i < amountOfNums; i++) {
            this.#addRandomTile();
        }
    }

    // This moves Right or Left depending on the argument passed
    moveXAxis(direction) {
        const oldBoard = this.#copyBoard();

        for (let i = 0; i < this.height; i++) {
            let row = this.board[i];
            row = direction === 1 ? this.#slideRight(row) : this.#slideLeft(row);
            this.board[i] = row;
        }

        if (!this.#compareBoards(oldBoard, this.board)) {
            this.#addRandomTile();
        }
    }

    // This moves Up or Down depending on the argument passed
    moveYAxis(direction) {
        const oldBoard = this.#copyBoard();

        for (let i = 0; i < this.width; i++) {
            let column = this.board.map(row => row[i]);
            column = direction === 1 ? this.#slideRight(column) : this.#slideLeft(column);
            for (let j = 0; j < this.height; j++) {
                this.board[j][i] = column[j];
            }
        }

        if (!this.#compareBoards(oldBoard, this.board)) {
            this.#addRandomTile();
        }
    }
}

export default Board;
