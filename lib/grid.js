class Grid {
    constructor(sizeX, sizeY) {
        this._sizeX = sizeX;
        this._sizeY = sizeY;
        this.array = new Array(sizeX).fill(new Array(sizeY));
    }

    checkSquare(x, y) {
        if (x >= this._sizeX || y >= this._sizeY) {
            throw new Error('Coordinates out of grid range');
        }
    }

    getSquare(x, y) {
        this.checkSquare();

        return this.array[x][y];
    }

    setSquare(x, y, block) {
        this.checkSquare();

        this.array[x][y] = block;
    }

    get size() {
        return [this._sizeX, this._sizeY];
    }

    fill(block) {
        for (let x = 0; x < this._sizeX; x++) {
            for (let y = 0; y < this._sizeY; y++) {
                this.setSquare(x, y, block);
            }
        }
    }
}

exports.Grid = Grid;