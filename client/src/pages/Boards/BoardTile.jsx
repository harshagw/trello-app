import React from 'react'
import { Link } from 'react-router-dom';

const BoardTile = () => {
  return (
    <Link to="/board/id">
      <div className='board_tile'>
        Board Tile
      </div>
    </Link>
  )
}

export default BoardTile;