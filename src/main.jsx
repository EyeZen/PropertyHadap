import "./index.css";
import React from 'react'
import ReactDOM from 'react-dom/client'
import GameBoard from './components/GameBoard/GameBoard'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameBoard />
  </React.StrictMode>,
)
