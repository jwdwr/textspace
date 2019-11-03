const test = require('tape');
const { Space } = require('../lib/space');

test('Space is created with a name', t => {
    t.plan(2);

    const testName = 'testspace';
    const space = new Space(testName);

    t.ok(space, 'Space exists');
    t.equal(testName, space.name, 'Space has the right name');
});