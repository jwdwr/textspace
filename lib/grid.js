/**
 * A grid of cubes, which contain blocks.
 */
class Grid {
    /**
     * Create a grid with the given dimensions
     * @param {number} sizeX
     * @param {number} sizeY
     * @param {number} sizeZ
     */
     constructor(sizeX, sizeY, sizeZ) {
        this._sizeX = sizeX;
        this._sizeY = sizeY;
        this._sizeZ = sizeZ;
        this.array = new Array(sizeX).fill(new Array(sizeY).fill(new Array(sizeZ)));
    }

    /**
     * Throw an exception if cube does not exist
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {number} z - Z coordinate
     * @throws {Error}
     */
    checkCube(x, y, z) {
        if (x < 0 || y < 0 || z < 0
            || x >= this._sizeX || y >= this._sizeY || z >= this._sizeZ) {
            throw new Error('Coordinates out of grid range');
        }
    }

    /**
     * Access the cube at the given coordinates
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {number} z - Z coordinate
     * @return {Block} the block contained by this cube
     */
    getCube(x, y, z) {
        this.checkCube(x, y, z);

        return this.array[x][y][z];
    }

    /**
     * Place a block into a cube
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {number} z - Z coordinate
     * @param {Block} block - The block to place
     */
    setCube(x, y, z, block) {
        this.checkCube(x, y, z);

        this.array[x][y][z] = block;
    }

    /**
     * The size of this grid
     * @type {{x: number, y: number, z: number}}
     */
    get size() {
        return {x: this._sizeX, y: this._sizeY, z: this._sizeZ};
    }

    /**
     * Fill an entire area with one block.
     * @param {Block} block
     * @param {number} x1
     * @param {number} y1
     * @param {number} z1
     * @param {number} x2
     * @param {number} y2
     * @param {number} z2
     */
    fillArea(block, x1, y1, z1, x2, y2, z2) {
        this.checkCube(x1, y1, z1);
        this.checkCube(x2, y2, z2);

        for (let x = x1; x <= x2; x++) {
            for (let y = y1; y <= y2; y++) {
                for (let z = z1; z <= z2; z++) {
                    this.setCube(x, y, z, block);
                }
            }
        }
    }
}

exports.Grid = Grid;