import Space from "../src/space";

/**
 * @test {Space}
 */
describe('Spaces', () => {
  it("creates a space", () => {
    const testName = 'testspace';
    const space = new Space(testName);

    expect(space.name).toEqual(space.name);
  });
});