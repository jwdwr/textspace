const test = require('tape');
const { Grid } = require('../lib/grid');
const { Block } = require('../lib/block');
const { Object } = require('../lib/object');

/**
 * @test {Grid}
 */
test('Grids', t => {
    t.plan(11);

    let grid, sizeX = 5, sizeY = 5, sizeZ = 5,
        randomX = Math.round(Math.random() * (sizeX - 1)), 
        randomY = Math.round(Math.random() * (sizeY - 1)),
        randomZ = Math.round(Math.random() * (sizeZ - 1));

    t.doesNotThrow(() => grid = new Grid(sizeX, sizeY, sizeZ), Error, 'Grid created successfully');
    t.ok(grid, 'Grid exists');
    t.looseEqual(grid.size, {x: sizeX, y: sizeY, z: sizeZ}, 'Grid has the right size');
    t.throws(() => grid.checkCube({x: sizeX, y: sizeY, z: sizeZ}), Error, "Can't access cube outside grid");
    t.doesNotThrow(() => grid.checkCube({x: randomX, y: randomY, z: randomZ}), Error, 'Can access random cube inside grid');
    t.false(grid.getCube({x: randomX, y: randomY, z: randomZ}), 'Randomly chosen cube is empty');

    t.doesNotThrow(() => grid.fillArea({x: 0, y: 0, z: 0}, {x: sizeX - 1, y: sizeY - 1, z: 0}, new Block({type: 'dirt'})), 'Bottom plane is filled with dirt');
    t.equal(grid.getCube({x: randomX, y: randomY, z: 0}).info.type, 'dirt', 'Randomly chosen cube in plane is filled with dirt');

    const objectName = 'test object';
    const objectBlockType = 'stone';
    object = new Object(objectName);
    object.addBlock({x: 0, y: 0, z: 0}, objectBlockType);
    object.addBlock({x: 0, y: 1, z: 0}, objectBlockType);
    object.addBlock({x: 0, y: 1, z: 1}, objectBlockType);
    object.addBlock({x: -1, y: 1, z: 0}, objectBlockType);

    t.throws(() => grid.addObject({x: 3, y: 3, z: 0}, object), Error, "Can't add object where stuff already exists");
    t.doesNotThrow(() => grid.addObject({x: 3, y: 3, z: 1}, object), Error, "Can add object where stuff doesn't exist");
    t.equal(grid.getCube({x: 3, y: 4, z: 2}).info.type, objectBlockType, 'Cube in object exists in grid where expected');
});