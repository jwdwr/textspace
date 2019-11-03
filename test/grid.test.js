const test = require('tape');
const { Grid } = require('../lib/grid');
const { Block } = require('../lib/block');

test('Grids', t => {
    t.plan(8);

    let grid, sizeX = 5, sizeY = 5, randomX = Math.round(Math.random() * (sizeX - 1)), randomY = Math.round(Math.random() * (sizeY - 1));

    t.doesNotThrow(() => grid = new Grid(sizeX, sizeY), Error, 'Grid created successfully');
    t.ok(grid, 'Grid exists');
    t.looseEqual(grid.size, [sizeX, sizeY], 'Grid has the right size');
    t.throws(() => grid.checkSquare(sizeX, sizeY), Error, "Can't access square outside grid");
    t.doesNotThrow(() => grid.checkSquare(randomX, randomY), Error, 'Can access random square inside grid');
    t.false(grid.getSquare(randomX, randomY), 'Randomly chosen square is empty');

    t.doesNotThrow(() => grid.fill(new Block({type: 'dirt', height: 0})), 'Grid filled with dirt');
    t.looseEqual(grid.getSquare(randomX, randomY).info.type, 'dirt', 'Randomly chosen square is filled with dirt');
});