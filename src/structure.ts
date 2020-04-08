import Block from './block';
import { Dimension, Coords } from './interfaces/coords';

/**
 * A structure, which is made out of blocks arranged in a certain shape.
 */
export default class Structure {
  name: string;
  blocks: {coords: Coords, block: Block}[];

  constructor(name: string, blocks?: {coords: Coords, block: Block}[]) {
    this.name = name;
    this.blocks = blocks || [];
  }

  /**
   * add a block to the structure
   * @param {{x: number, y: number, z: number}} coords - coordinates
   * @param {string} blockType type of block to add
   */
  addBlock(coords: Coords, blockType: string) {
    this.blocks.push({coords, block: new Block({type: blockType})});
  }

  /**
   * dimensions of this structure's bounding box
   */
  get dimensions(): Coords {
    const bounds = this.blocks.reduce((acc: {min: Coords, max: Coords}, block: {coords: Coords, block: Block}) => {
      for (let dimension in Dimension) {
        if (acc.min[dimension] === undefined || acc.min[dimension] > block.coords[dimension])
          acc.min[dimension] = block.coords[dimension];
        if (acc.max[dimension] === undefined || acc.max[dimension] < block.coords[dimension])
          acc.max[dimension] = block.coords[dimension];
        }
      return acc;
    }, {min: {}, max: {}});

    const dimensions: Coords = {};

    for (let dimension in Dimension) {
      dimensions[dimension] = bounds.max[dimension] - bounds.min[dimension] + 1;
    }

    return dimensions;
  }

  /**
   * array representation of this structure
   */
  get array() {
    const array: Block[][][] = [];
    this.blocks.forEach(block => {
      array[block.coords.x] = array[block.coords.x] || [];
      array[block.coords.x][block.coords.y] = array[block.coords.x][block.coords.y] || [];
      array[block.coords.x][block.coords.y][block.coords.z] = block.block;
    });

    return array;
  }
}