class Block {
    constructor(config) {
        this._type = config.type;
        this._height = config.height;
    }

    get info() {
        return {
            type: this._type,
            height: this._height
        }
    }
}

exports.Block = Block;