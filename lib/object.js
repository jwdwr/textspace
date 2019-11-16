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
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {string} blockType type of block to add
     */
    addBlock(x, y, z, blockType) {
        this.blocks.push({x, y, z, block: new Block({type: blockType})});
    }

    /**
     * dimensions of this object's bounding box
     */
    get dimensions() {
        const bounds = this.blocks.reduce((acc, block) => {
            ['x', 'y', 'z'].forEach(dimension => {
                if (acc.min[dimension] === undefined || acc.min[dimension] > block[dimension])
                    acc.min[dimension] = block[dimension];
                if (acc.max[dimension] === undefined || acc.max[dimension] < block[dimension])
                    acc.max[dimension] = block[dimension];
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
            _array[block.x] = _array[block.x] || [];
            _array[block.x][block.y] = _array[block.x][block.y] || [];
            _array[block.x][block.y][block.z] = block.block;
        });

        return _array;
    }
}

exports.Object = Object;