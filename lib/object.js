const { Block } = require('./block');

/**
 * An object, which is made out of blocks arranged in a certain shape.
 */
class Object {
    constructor(name, blocks) {
        this.name = name;
        this.array = blocks || [];
    }

    /**
     * add a block to the object
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {string} blockType type of block to add
     */
    addBlock(x, y, z, blockType) {
        this.array.push({x, y, z, block: new Block({type: blockType})});
    }

    /**
     * dimensions of this object's bounding box
     */
    get dimensions() {
        const bounds = this.array.reduce((acc, block) => {
            ['x', 'y', 'z'].forEach(dimension => {
                if (acc.min[dimension] === undefined || acc.min[dimension] > block[dimension])
                    acc.min[dimension] = block[dimension];
                if (acc.max[dimension] === undefined || acc.max[dimension] < block[dimension])
                    acc.max[dimension] = block[dimension];
                    console.log(dimension, acc.min[dimension], block[dimension]);
            });
            return acc;
        }, {min: {}, max: {}});

        const dimensions = {};
        ['x', 'y', 'z'].forEach(dimension => {
            dimensions[dimension] = bounds.max[dimension] - bounds.min[dimension] + 1;
        })

        return dimensions;
    }
}

exports.Object = Object;