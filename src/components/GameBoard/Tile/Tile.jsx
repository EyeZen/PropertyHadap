import "./Tile.css";
import React, { useEffect, useRef, useState } from 'react'
import Orientation from "../../../../helpers/Orientation";

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
    <div ref={tileRef} className='tile' style={{ background: acquired ? acquiredBackground : undefined }}>
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
          type={edge.type}
          selected={selected.some(edgeType => edgeType === edge.type)} 
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

function Edge({type, selected, onSelect}) {

  return (
    <div 
      className={`tile_edge ${!selected ? '' : 'tile_edge__selected'} ${
        type === EdgeType.TOP ? 'tile_edge__top'
        : type === EdgeType.RIGHT ? 'tile_edge__right'
        : type === EdgeType.BOTTOM ? 'tile_edge__bottom'
        : type === EdgeType.LEFT ? 'tile_edge__left'
        : ''
      }`} 
      onClick={onSelect}
    ></div>
  );
}

export default Tile
