import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

class Square extends React.Component {

  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
		<span className={'board-value {this.props.value}'}>
			{this.props.value}
		</span>
      </button>
    );
  }
}

class Board extends React.Component {
   constructor() {
    super();
    this.state = {
      squares: Array(9).fill('-'),
	  playerTurn: true,
    };
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.playerTurn ? 'X' : 'O';
    this.setState({
      squares: squares,
      playerTurn: !this.state.playerTurn,
    });
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
	
    const status = (this.state.playerTurn ? 'Player turn' : '...thinking');

    return (
      <div>
        <div className="status">{status}</div>
		
			<div className="board-row">
			  {this.renderSquare(0)}
			  {this.renderSquare(1)}
			  {this.renderSquare(2)}
			</div>
			<div className="board-row">
			  {this.renderSquare(3)}
			  {this.renderSquare(4)}
			  {this.renderSquare(5)}
			</div>
			<div className="board-row">
			  {this.renderSquare(6)}
			  {this.renderSquare(7)}
			  {this.renderSquare(8)}
			</div>
		  
	  </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


export default Game;

