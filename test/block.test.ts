import Block from "../src/block";

/**
 * @test {Block}
 */
describe('Blocks', () => {
    it("creates a block", () => {
        const blockType = 'dirt';
        const block = new Block({type: blockType});
        expect(block).toBeTruthy();
        expect(block.info.type).toEqual(blockType);
    })
});
