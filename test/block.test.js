const test = require('tape');
const { Block } = require('../lib/block');

test('Blocks', t => {
    t.plan(4);

    let block, blockType = 'dirt', blockHeight = 0;

    t.doesNotThrow(() => block = new Block({type: blockType, height: blockHeight}), Error, 'Block created successfully');
    t.ok(block, 'Block exists');
    t.equal(block.info.type, blockType, 'Block has correct type');
    t.equal(block.info.height, blockHeight, 'Block has correct height');
});