/**
 * A grid of squares, which contain blocks.
 */
class Grid {
    /**
     * Create a grid with the given dimensions
     * @param {number} sizeX
     * @param {number} sizeY
     */
    constructor(sizeX, sizeY) {
        this._sizeX = sizeX;
        this._sizeY = sizeY;
        this.array = new Array(sizeX).fill(new Array(sizeY));
    }

    /**
     * Throw an exception if square does not exist
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @throws {Error}
     */
    checkSquare(x, y) {
        if (x >= this._sizeX || y >= this._sizeY) {
            throw new Error('Coordinates out of grid range');
        }
    }

    /**
     * Access the square at the given coordinates
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @return {Block} the block contained by this square
     */
    getSquare(x, y) {
        this.checkSquare();

        return this.array[x][y];
    }

    /**
     * Place a block into a square
     * @param {number} x 
     * @param {number} y 
     * @param {Block} block 
     */
    setSquare(x, y, block) {
        this.checkSquare();

        this.array[x][y] = block;
    }

    /**
     * The size of this grid
     * @type {{x: number, y: number}}
     */
    get size() {
        return {x: this._sizeX, y: this._sizeY};
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