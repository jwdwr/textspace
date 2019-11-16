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
    }

    /**
     * Get info about this block
     * @return {{type: string}} block info
     */
    get info() {
        return {
            type: this._type
        }
    }
}

exports.Block = Block;