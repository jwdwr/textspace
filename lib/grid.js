const { Object } = require('./object');

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
   * @param {{x: number, y: number, z: number}} coords - coordinates
   * @throws {Error}
   */
  checkCube(coords, checkOccupancy) {
    if (coords.x < 0 || coords.y < 0 || coords.z < 0
      || coords.x >= this._sizeX || coords.y >= this._sizeY || coords.z >= this._sizeZ) {
      throw new Error(`Coordinates (${coords.x}, ${coords.y}, ${coords.z}) out of grid range`);
    } else if (checkOccupancy && this.getCube({x: coords.x, y: coords.y, z: coords.z})) {
      throw new Error(`Coordinates (${coords.x}, ${coords.y}, ${coords.z} are already occupied)`);
    }
  }

  /**
   * Access the cube at the given coordinates
   * @param {{x: number, y: number, z: number}} coords - coordinates
   * @return {Block} the block contained by this cube
   */
  getCube(coords) {
    this.checkCube(coords);
    return this.array[coords.x][coords.y][coords.z];
  }

  /**
   * Place a block into a cube
   * @param {{x: number, y: number, z: number}} coords - coordinates
   * @param {Block} block - The block to place
   */
  setCube(coords, block) {
    this.checkCube({x: coords.x, y: coords.y, z: coords.z});
    this.array[coords.x][coords.y][coords.z] = block;
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
   * @param {{x: number, y: number, z: number}} startCoords starting coordinates
   * @param {{x: number, y: number, z: number}} endCoords ending coordinates
   * @param {Block} block
   * @param {boolean} overwrite if you want to overwrite whatever exists
   */
  fillArea(startCoords, endCoords, block, overwrite) {
    for (let x = startCoords.x; x <= endCoords.x; x++) {
      for (let y = startCoords.y; y <= endCoords.y; y++) {
        for (let z = startCoords.z; z <= endCoords.z; z++) {
          this.checkCube({x, y, z}, !overwrite);
        }
      }
    }

    for (let x = startCoords.x; x <= endCoords.x; x++) {
      for (let y = startCoords.y; y <= endCoords.y; y++) {
        for (let z = startCoords.z; z <= endCoords.z; z++) {
          this.setCube({x, y, z}, block);
        }
      }
    }
  }

  /**
   * Add object to grid
   * @param {{x: number, y: number, z: number}} coords - coordinates
   * @param {Object} object Object to add
   * @param {boolean} overwrite if you want to overwrite whatever exists
   */
  addObject(coords, object, overwrite) {
    object.blocks.forEach(block => {
      this.checkCube({x: coords.x + block.coords.x, y: coords.y + block.coords.y, z: coords.z + block.coords.z}, !overwrite);
    });

    object.blocks.forEach(block => {
      this.setCube({x: coords.x + block.coords.x, y: coords.y + block.coords.y, z: coords.z + block.coords.z}, block.block);
    });
  }
}

exports.Grid = Grid;