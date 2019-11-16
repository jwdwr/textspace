const test = require('tape');
const { Block } = require('../lib/block');

/**
 * @test {Block}
 */
test('Blocks', t => {
    t.plan(3);

    let block, blockType = 'dirt';

    t.doesNotThrow(() => block = new Block({type: blockType}), Error, 'Block created successfully');
    t.ok(block, 'Block exists');
    t.equal(block.info.type, blockType, 'Block has correct type');
});