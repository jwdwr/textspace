const test = require('tape');
const { Space } = require('../lib/space');

test('Spaces', t => {
    t.plan(3);

    let space, testName = 'testspace';

    t.doesNotThrow(() => space = new Space(testName), Error, 'Space created successfully');
    t.ok(space, 'Space exists');
    t.equal(testName, space.name, 'Space has the right name');
});