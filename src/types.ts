export type ShapeType = 'rectangle' | 'circle' | 'line' | 'cursor';

export interface Rectangle {
  id: string;
  type: 'rectangle';
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
}

export interface Circle {
  id: string;
  type: 'circle';
  x: number;
  y: number;
  radius: number;
  fill: string;
}

export interface Line {
  id: string;
  type: 'line';
  points: number[];
  stroke: string;
}

export type ShapeUnion = Rectangle | Circle | Line;



