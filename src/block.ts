/**
 * A block, which can be placed in a grid
 */
export default class Block {
    private type: string;

    /**
     * Create a new block from the configuration object
     * @param {Object} config initial block config
     */
    constructor(config: {type: string}) {
        this.type = config.type;
    }

    /**
     * Get info about this block
     * @return {{type: string}} block info
     */
    get info() {
        return {
            type: this.type
        }
    }
};