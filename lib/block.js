/**
 * A block, which can be placed in a grid
 */
class Block {
    /**
     * Create a new block from the configuration object
     * @param {Object} config initial block config
     */
    constructor(config) {
        this._type = config.type;
        this._height = config.height;
    }

    /**
     * Get info about this block
     * @return {{type: string, height: number}} block info
     */
    get info() {
        return {
            type: this._type,
            height: this._height
        }
    }
}

exports.Block = Block;