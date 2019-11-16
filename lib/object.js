const { Block } = require('./block');

/**
 * An object, which is made out of blocks arranged in a certain shape.
 */
class Object {
  constructor(name, blocks) {
    this.name = name;
    this.blocks = blocks || [];
  }

  /**
   * add a block to the object
   * @param {{x: number, y: number, z: number}} coords - coordinates
   * @param {string} blockType type of block to add
   */
  addBlock(coords, blockType) {
    this.blocks.push({coords, block: new Block({type: blockType})});
  }

  /**
   * dimensions of this object's bounding box
   */
  get dimensions() {
    const bounds = this.blocks.reduce((acc, block) => {
      ['x', 'y', 'z'].forEach(dimension => {
        if (acc.min[dimension] === undefined || acc.min[dimension] > block.coords[dimension])
          acc.min[dimension] = block.coords[dimension];
        if (acc.max[dimension] === undefined || acc.max[dimension] < block.coords[dimension])
          acc.max[dimension] = block.coords[dimension];
        });
      return acc;
    }, {min: {}, max: {}});

    const dimensions = {};
    ['x', 'y', 'z'].forEach(dimension => {
      dimensions[dimension] = bounds.max[dimension] - bounds.min[dimension] + 1;
    })

    return dimensions;
  }

  /**
   * array representation of this object
   */
  get array() {
    const _array = [];
    this.blocks.forEach(block => {
      _array[block.coords.x] = _array[block.coords.x] || [];
      _array[block.coords.x][block.coords.y] = _array[block.coords.x][block.coords.y] || [];
      _array[block.coords.x][block.coords.y][block.coords.z] = block.block;
    });

    return _array;
  }
}

exports.Object = Object;