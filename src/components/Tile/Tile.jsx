import React, { useEffect, useRef, useState } from 'react'
import "./Tile.css";

const Orientation = {
  HORIZONTAL: "HORIZONTAL",
  VERTICAL: "VERTICAL"
};

export const EdgeType = {
  LEFT: "LEFT",
  TOP: "TOP",
  RIGHT: "RIGHT",
  BOTTOM: "BOTTOM",
}

function Tile({ ownerName='', acquired=false, acquiredBackground='none', selected=null, size=90, onEdgeSelect, disabled }) {
  const tileRef = useRef();
  const [tileDots, setTileDots] = useState([]);
  const [tileEdges, setTileEdges] = useState([]);

  useEffect(() => {
    const tile = tileRef.current;
    const { width, height } = tile.getBoundingClientRect();
    setTileDots([
      { x: 0,  y: 0 },
      { x: width, y: 0 },
      { x: width, y: height },
      { x: 0, y: height },
    ]);

    setTileEdges([
      { type: EdgeType.LEFT,   x: 0,     y: 0,      orientation: Orientation.VERTICAL   },
      { type: EdgeType.TOP,    x: 0,     y: 0,      orientation: Orientation.HORIZONTAL },
      { type: EdgeType.RIGHT,  x: width, y: 0,      orientation: Orientation.VERTICAL   },
      { type: EdgeType.BOTTOM, x: 0,     y: height, orientation: Orientation.HORIZONTAL },
    ]);

    return () => {
      setTileDots([]);
      setTileEdges([]);
    }
  }, [tileRef]);
  
  return (
    <div ref={tileRef} className='tile' style={{ width: size, background: acquired ? acquiredBackground : undefined }}>
      { 
        tileDots.map(({x, y}, index) => 
        <Dot key={index} 
          x={x} y={y} 
          parentSize={size} 
        />) 
      }
      { 
        tileEdges.map((edge, index) => 
        <Edge key={index} 
          x={edge.x} y={edge.y} 
          orientation={edge.orientation} 
          parentSize={size}
          selected={selected.has(edge.type)} 
          onSelect={() => !disabled && onEdgeSelect(edge)}
        />)
      }
      {
        acquired && <span>{ownerName}</span>
      }
    </div>
  )
}

function Dot({ x, y, parentSize }) {
  const size = parentSize * 0.1;
  return <div className='tile_dot' style={{ 
    width: size, 
    left: x - size/2, 
    top: y - size/2
  }}></div>
}

function Edge({x, y, orientation, parentSize, selected, onSelect}) {
  const [styles, setStyles] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const dim = parentSize * 0.05;
    switch(orientation) {
      case Orientation.HORIZONTAL:
        
        setStyles({
          width: parentSize,
          height: dim,
          left: x,
          top: y - dim / 2,
        });
        break;
      case Orientation.VERTICAL:
        setStyles({
          width: dim,
          height: parentSize,
          left: x - dim / 2,
          top: y,
        });
        break;
    }

    return () => setStyles({
      left: 0,
      top: 0,
      width: 10,
      height: 10,
    });
  }, [x, y, orientation, parentSize]);

  return (
    <div 
      className={`tile_edge ${!selected ? '' : 'tile_edge__selected'}`} 
      style={styles} 
      onClick={onSelect}
    ></div>
  );
}

export default Tile
