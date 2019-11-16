const test = require('tape');
const { Object } = require('../lib/object');

/**
 * @test {Block}
 */
test('Objects', t => {
    t.plan(7);

    let object, objectName = 'test object';

    t.doesNotThrow(() => object = new Object(objectName), Error, 'Object created successfully');
    t.ok(object, 'Object exists');
    t.equal(object.name, objectName, 'Block has correct name');

    object.addBlock(0, 0, 0, 'stone');
    object.addBlock(0, 1, 0, 'stone');
    object.addBlock(0, 1, 1, 'stone');
    object.addBlock(-1, 1, 0, 'stone');

    t.equal(object.dimensions.x, 2, 'Block has correct X size');
    t.equal(object.dimensions.y, 2, 'Block has correct Y size');
    t.equal(object.dimensions.z, 2, 'Block has correct Z size');
    t.equal(object.array[-1][1][0].info.type, 'stone', 'Object array includes block where expected')
});