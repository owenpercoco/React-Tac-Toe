import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './App.css';

class Square extends React.Component {

  render() {
	var _class ='board-value ' + this.props.value;
    return (
      <button className="square" onClick={() => this.props.onClick()}>
		<span className={_class}>
			{this.props.value}
		</span>
      </button>
    );
  }
}

class Board extends React.Component {
   
  renderSquare(i, j) {
    return (
      <Square
        value={this.props.squares[i][j]}
        onClick={() => this.props.onClick(i, j)}
      />
    );
  }
  
  render() {
	

    return (
      <div className="container">
	  
			<div className="board-row">
			  {this.renderSquare(0, 0)}
			  {this.renderSquare(0, 1)}
			  {this.renderSquare(0, 2)}
			</div>
			<div className="board-row">
			  {this.renderSquare(1, 0)}
			  {this.renderSquare(1,1)}
			  {this.renderSquare(1,2)}
			</div>
			<div className="board-row">
			  {this.renderSquare(2, 0)}
			  {this.renderSquare(2, 1)}
			  {this.renderSquare(2, 2)}
			</div>
		  
	  </div>
    );
  }
}
class Score extends React.Component{

  render(){
	  return(
	  <div>
		  <span>Player: {this.props.playerScore}</span>
		  <span>Computer:  {this.props.computerScore}</span>
	  </div>
	  )
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares:[['-', '-', '-'],
			  ['-', '-', '-'],
			  ['-', '-', '-']
			],
	  playerTurn: true,
	  playerScore: 0,
	  computerScore: 0,
    };
  }
  computerMove(){
	  console.log('in computer method');
	  
	  for(var i = 0; i < this.state.squares.length; i++) {
		for(var j = 0; j < this.state.squares[i].length; j++) {
			if(this.state.squares[i][j] === '-'){
					this.handleClick(i, j);
				return
			}
	    }
	  }
  }
  handleClick(i, j) {
    const squares = this.state.squares.slice();
	if (calculateWinner(squares) || squares[i][j] !== '-') {
      return;
    }
    squares[i][j] = this.state.playerTurn ? 'X' : 'O';
    this.setState({
      squares: squares,
      playerTurn: !this.state.playerTurn,
    });
  }
  resetBoard(){
	  this.setState({
      squares: [['-', '-', '-'],['-', '-', '-'],['-', '-', '-']]
    });
  }
  render() {
	
	const winner = calculateWinner(this.state.squares, this.state.playerTurn);
    let status;
    if (winner) {
	  this.state.playerTurn ? this.state.computerScore+=1 : this.state.playerScore += 1;
	  console.log(this.state.playerScore);
      status = winner;
	  
    } else {
      status = (this.state.playerTurn ? 'Player turn' : '...thinking');
    }
	if(this.state.playerTurn !== true){
		this.computerMove();
	}
    return (
	<div className="row">
      <div className="game">
	  <div className="row">
	    <div className="col-md-12">
        <div className="status">{status}</div>
		</div>
	  </div>
        <div className="game-board">
          <Board squares={this.state.squares}
            onClick={(i, j) => this.handleClick(i, j)}
			/>
        </div>
	</div>
	<div className="row">
        <div className="game-info">
          <Score playerScore = {this.state.playerScore}
		         computerScore = {this.state.computerScore}/>
		  <button onClick={() => this.resetBoard()} >Reset Board </button>
        </div>
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
function calculateWinner(squares, player) {
	
	  var status = (player ? 'better luck next time' : 'You won!');
	  if (squares[0][0] === squares[1][1] && squares[0][0] === squares[2][2] && squares[0][0] !== '-') {
			console.log('thats a diagonal win');
			return status;
	  }else if (squares[0][2] === squares[1][1] && squares[1][1] === squares[2][2] && squares[2][0] !== '-') {
			console.log('thats a diagonal win');
			return status;
	  }
	  for(var i = 0; i < squares.length; i++) {
		if (squares[i][0] === squares[i][1] && squares[i][1] === squares[i][2] && squares[i][1] !== '-') {
			console.log('thats a horizontal win');
			return status;
		}
		if (squares[0][i] === squares[1][i] && squares[1][i] === squares[2][i] && squares[0][i] !== '-') {
			console.log('thats a vertical win');
			return status;
		}
	}
	  return false;
	  
}

export default Game;

