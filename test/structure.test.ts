import Structure from "../src/structure";

/**
 * @test {Block}
 */
describe('structures', () => {
  it("creates an structure", () => {
    const structureName = 'test structure';
    let structure = new Structure(structureName);

    expect(structure.name).toEqual(structureName);

    structure.addBlock({x: 0, y: 0, z: 0}, 'stone');
    structure.addBlock({x: 0, y: 1, z: 0}, 'stone');
    structure.addBlock({x: 0, y: 1, z: 1}, 'stone');
    structure.addBlock({x: -1, y: 1, z: 0}, 'stone');

    // Block has correct X size
    expect(structure.dimensions.x).toEqual(2);
    // Block has correct Y size
    expect(structure.dimensions.y).toEqual(2);
    // Block has correct Z size
    expect(structure.dimensions.z).toEqual(2);
    // structure array includes block where expected
    expect(structure.array[-1][1][0].info.type).toEqual('stone');
  });
});