import "./Tile.css";
import React, { useEffect, useRef, useState } from 'react'
import Orientation from "../../../../helpers/Orientation";

export const EdgeType = {
  LEFT: "LEFT",
  TOP: "TOP",
  RIGHT: "RIGHT",
  BOTTOM: "BOTTOM",
}

export const DotType = {
  TOP_LEFT: "TOP_LEFT",
  TOP_RIGHT: "TOP_RIGHT",
  BOTTOM_RIGHT: "BOTTOM_RIGHT",
  BOTTOM_LEFT: "BOTTOM_LEFT",
}

function Tile({ ownerName='', acquired=false, acquiredBackground='none', selected=null, size=90, onEdgeSelect, disabled }) {
  const tileRef = useRef();
  const [tileDots, setTileDots] = useState([]);
  const [tileEdges, setTileEdges] = useState([]);

  useEffect(() => {
    const tile = tileRef.current;
    const { width, height } = tile.getBoundingClientRect();
    setTileDots([
      DotType.TOP_LEFT,
      DotType.TOP_RIGHT,
      DotType.BOTTOM_RIGHT,
      DotType.BOTTOM_LEFT,
    ]);

    setTileEdges([
      EdgeType.LEFT,
      EdgeType.TOP,
      EdgeType.RIGHT,
      EdgeType.BOTTOM,
    ]);

    return () => {
      setTileDots([]);
      setTileEdges([]);
    }
  }, [tileRef]);
  
  return (
    <div ref={tileRef} className='tile' style={{ background: acquired ? acquiredBackground : undefined }}>
      { 
        tileDots.map((dotType, index) => <Dot key={index} type={dotType} />) 
      }
      { 
        tileEdges.map((edgeType, index) => 
        <Edge key={index} 
          type={edgeType}
          selected={selected.some(selectedEdgeType => selectedEdgeType === edgeType)} 
          onSelect={() => !disabled && onEdgeSelect(edgeType)}
        />)
      }
      {
        acquired && <span>{ownerName}</span>
      }
    </div>
  )
}

function Dot({ type }) {
  return <div className={`tile_dot ${
    type === DotType.TOP_LEFT ? 'tile_dot__top-left' 
    : type === DotType.TOP_RIGHT ? 'tile_dot__top-right'
    : type === DotType.BOTTOM_RIGHT ? 'tile_dot__bottom-right'
    : type === DotType.BOTTOM_LEFT ? 'tile_dot__bottom-left'
    : ''
  }`} ></div>
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
