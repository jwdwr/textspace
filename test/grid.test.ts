import Grid from "../src/grid";
import Block from "../src/block";
import Structure from "../src/structure";

/**
 * @test {Grid}
 */
describe('Grids', () => {
    it("creates a grid", () => {
        const sizeX = 5;
        const sizeY = 5;
        const sizeZ = 5;
        const randomX = Math.round(Math.random() * (sizeX - 1));
        const randomY = Math.round(Math.random() * (sizeY - 1));
        const randomZ = Math.round(Math.random() * (sizeZ - 1));

        const grid = new Grid(sizeX, sizeY, sizeZ);
        expect(grid).toBeTruthy();
        expect(grid.size).toEqual({x: sizeX, y: sizeY, z: sizeZ});

        // Can't access cube outside grid
        expect(() => grid.checkCube({x: sizeX, y: sizeY, z: sizeZ})).toThrowError();
        // Random cube inside grid exists
        expect(() => grid.checkCube({x: randomX, y: randomY, z: randomZ})).not.toThrowError();
        // Random cube is empty
        expect(grid.getCube({x: randomX, y: randomY, z: randomZ})).toBeFalsy();

        // Fill bottom plane with dirt
        grid.fillArea({x: 0, y: 0, z: 0}, {x: sizeX - 1, y: sizeY - 1, z: 0}, new Block({type: 'dirt'}))
        // Random cube from bottom plane contains dirt
        expect(grid.getCube({x: randomX, y: randomY, z: 0}).info.type).toEqual('dirt');

        // Set up our structure
        const structureName = 'test structure';
        const structureBlockType = 'stone';
        const structure = new Structure(structureName);
        structure.addBlock({x: 0, y: 0, z: 0}, structureBlockType);
        structure.addBlock({x: 0, y: 1, z: 0}, structureBlockType);
        structure.addBlock({x: 0, y: 1, z: 1}, structureBlockType);
        structure.addBlock({x: -1, y: 1, z: 0}, structureBlockType);

        // Can't add structure where stuff already exists
        expect(() => grid.addStructure({x: 3, y: 3, z: 0}, structure)).toThrowError();
        // Can add structure where stuff doesn't exist
        expect(() => grid.addStructure({x: 3, y: 3, z: 1}, structure)).not.toThrowError();
        // Cube in structure exists in grid where expected
        expect(grid.getCube({x: 3, y: 4, z: 2}).info.type).toEqual(structureBlockType);
    });
});