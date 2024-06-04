import React from "react";
import { ShapeType } from "./types";

type ToolbarProps = {
  tool: ShapeType;
  setTool: (tool: ShapeType) => void;

};

export const Toolbar: React.FC<ToolbarProps> = ({
  tool,
  setTool,

}) => {
  return (
    <div className="toolbar">
      <button
        className={`cursorbtn ${tool === "cursor" ? "active" : ""}`}
        onClick={() => setTool("cursor")}
      >
        Cursor
      </button>
      <div className="dropdown">
        <button className={`dropbtn ${tool !== "cursor" ? "active" : ""}`}>
          Shapes
        </button>
        <div className="dropdown-content">
          <button onClick={() => setTool("rectangle")}>Rectangle</button>
          <button onClick={() => setTool("circle")}>Circle</button>
          <button onClick={() => setTool("line")}>Line</button>
        </div>
      </div>

    </div>
  );
};

