class Board {
    constructor(width = 4, height = 4) {
        this.width = width;
        this.heigth = height
        this.board = this.#setBoard(width, height)
    }

    #setBoard(w, h) {
        const array = new Array(h);

        for (let i = 0; i < array.length; i++) {
            array[i] = new Array(w);
            for (let j = 0; j < array[i].length; j++) {
                array[i][j] = 0;
            }
        }

        console.log(array);

        return array;
    }

    initializeBoard() {
        const maxDimension = Math.max(this.width, this.heigth);
        const amountOfNums = Math.ceil(maxDimension / 2);

        for (let i = 0; i < amountOfNums; i++) {
            const randomCoordinates = [this.#getRandomInt(0, this.width -1), this.#getRandomInt(0, this.heigth -1)];
            this.board[randomCoordinates[0]][randomCoordinates[1]] = Math.ceil(Math.random()) * 2;
        }
    }

    #getRandomInt(min = 0, max) {
        return Math.floor(Math.random() * max)
    }
}

const board = new Board(4, 5);
console.log(board.initializeBoard());
