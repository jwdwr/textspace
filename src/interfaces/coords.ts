export enum Dimension {
  x = 'x',
  y = 'y',
  z = 'z'
}

export type Coords  = {
  [dimension: string]: number
};