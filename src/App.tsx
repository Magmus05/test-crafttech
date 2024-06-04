import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, Line } from 'react-konva';
import { Toolbar } from './Toolbar';
import { ShapeType, ShapeUnion } from './types';
import './App.css';
import Konva from 'konva';


const App: React.FC = () => {
  const [tool, setTool] = useState<ShapeType>('cursor');
  const [shapes, setShapes] = useState<ShapeUnion[]>([]);
  const stageRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    const checkSize = () => {
      const stage = stageRef.current;
      if (stage) {
        const container = stage.container();
        stage.width(container.offsetWidth);
        stage.height(container.offsetHeight);
      }
    };

    window.addEventListener('resize', checkSize);
    checkSize();

    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, []);

  const handleMouseDown = () => {
    if (tool === 'cursor') return;

    const stage = stageRef.current;
    if (!stage) return;
    
    const pointerPosition = stage.getPointerPosition();
    if (!pointerPosition) return;
    
    const newShape = createShape(tool, pointerPosition);

    setShapes([...shapes, newShape]);
  };

  const createShape = (shapeType: ShapeType, position: { x: number; y: number }): ShapeUnion => {
    switch (shapeType) {
      case 'rectangle':
        return { id: "1", type: 'rectangle', x: position.x, y: position.y, width: 100, height: 100, fill: 'red' };
      case 'circle':
        return { id: "2", type: 'circle', x: position.x, y: position.y, radius: 50, fill: 'green' };
      case 'line':
        return { id: "3", type: 'line', points: [position.x, position.y, position.x + 100, position.y + 100], stroke: 'blue' };
      default:
        throw new Error('Unknown shape type');
    }
  };



  const handleZoom = (e: WheelEvent) => {
    e.preventDefault();
    const stage = stageRef.current;
    if (!stage) return;

    const scaleBy = 1.1;
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition()!.x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition()!.y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: -(mousePointTo.x - stage.getPointerPosition()!.x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition()!.y / newScale) * newScale,
    };
    stage.position(newPos);
    stage.batchDraw();
  };

  useEffect(() => {
    const stage = stageRef.current;
    if (stage) {
      stage.container().addEventListener('wheel', handleZoom);
    }
    return () => {
      if (stage) {
        stage.container().removeEventListener('wheel', handleZoom);
      }
    };
  }, []);

  return (
    <div className="app">
      <Toolbar tool={tool} setTool={setTool} />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        ref={stageRef}
        draggable={true}
      >
        <Layer>
          {shapes.map((shape) => {
            switch (shape.type) {
              case 'rectangle':
                return <Rect key={shape.id} {...shape} draggable />;
              case 'circle':
                return <Circle key={shape.id} {...shape} draggable />;
              case 'line':
                return <Line key={shape.id} {...shape} draggable />;
              default:
                return null;
            }
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default App;
