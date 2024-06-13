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
        row = row.filter(val => val); // Remove zeros
        for (let i = 0; i < row.length - 1; i++) {
            if (row[i] === row[i + 1]) {
                row[i] *= 2;
                row[i + 1] = 0;
                this.score += row[i]
            }
        }
        row = row.filter(val => val); // Remove new zeros
        while (row.length < this.width) row.push(0); // Add zeros to the end
        return row;
    }

    #slideRight(row) {
        row = row.filter(val => val); // Remove zeros
        for (let i = row.length - 1; i > 0; i--) {
            if (row[i] === row[i - 1]) {
                row[i] *= 2;
                this.score += row[i]
                row[i - 1] = 0;
            }
        }
        row = row.filter(val => val); // Remove new zeros
        while (row.length < this.width) row.unshift(0); // Add zeros to the start
        return row;
    }

    #won() {
        for (let i = 0; i < this.board.length; i++) {
            if(this.board[i].includes(2048))
                this.won === true
        }
    }

    initializeBoard() {
        const maxDimension = Math.max(this.width, this.height);
        const amountOfNums = Math.ceil(maxDimension / 2);

        for (let i = 0; i < amountOfNums; i++) {
            this.#addRandomTile();
        }
    }

    //This moves Right or Left depending on the argument passed
    moveXAxis(direction) {
        for (let i = 0; i < this.height; i++) {
            let row = this.board[i];
            row = direction === 1 ? this.#slideRight(row) : this.#slideLeft(row);
            this.board[i] = row;
        }
        this.#addRandomTile();
        this.#won();
    }

    //this moves Up or Down depending on the argument passed
    moveYAxis(direction) {
        for (let i = 0; i < this.width; i++) {
            let column = this.board.map(row => row[i]);
            column = direction === 1 ? this.#slideRight(column) : this.#slideLeft(column);
            for (let j = 0; j < this.height; j++) {
                this.board[j][i] = column[j];
            }
        }
        this.#addRandomTile();
    }

}

export default Board;
