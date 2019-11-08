const test = require('tape');
const { Grid } = require('../lib/grid');
const { Block } = require('../lib/block');

/**
 * @test {Grid}
 */
test('Grids', t => {
    t.plan(8);

    let grid, sizeX = 5, sizeY = 5, sizeZ = 5,
        randomX = Math.round(Math.random() * (sizeX - 1)), 
        randomY = Math.round(Math.random() * (sizeY - 1)),
        randomZ = Math.round(Math.random() * (sizeZ - 1));

    t.doesNotThrow(() => grid = new Grid(sizeX, sizeY, sizeZ), Error, 'Grid created successfully');
    t.ok(grid, 'Grid exists');
    t.looseEqual(grid.size, {x: sizeX, y: sizeY, z: sizeZ}, 'Grid has the right size');
    t.throws(() => grid.checkCube(sizeX, sizeY, sizeZ), Error, "Can't access cube outside grid");
    t.doesNotThrow(() => grid.checkCube(randomX, randomY, randomZ), Error, 'Can access random cube inside grid');
    t.false(grid.getCube(randomX, randomY, randomZ), 'Randomly chosen cube is empty');

    t.doesNotThrow(() => grid.fillArea(new Block({type: 'dirt'}), 0, 0, 0, sizeX - 1, sizeY - 1, 0), 'Bottom plane is filled with dirt');
    t.looseEqual(grid.getCube(randomX, randomY, 0).info.type, 'dirt', 'Randomly chosen cube in plane is filled with dirt');
});