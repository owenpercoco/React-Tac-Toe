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
      <div className=" ">
	  
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
	  if (this.props.playerScore > this.props.computerScore){
		return(
		  <div>
			  <span  className="winning">Player: {this.props.playerScore}</span>
			  <span>Computer:  {this.props.computerScore}</span>
			  <span>Ties: {this.props.ties}</span>
		  </div>
	  )  
	  }else{
		  return(
		  <div>
			  <span>Player: {this.props.playerScore}</span>
			  <span className="winning">Computer:  {this.props.computerScore}</span>
			  <span>Ties: {this.props.ties}</span>
		  </div>
	  )
	  }
	  
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
	  ties: 0,
    };
  }
  computerMove(){
	if(calculateWinner(this.state.squares) === 'tie'){
		return
	}
	setTimeout(function(){ 
	  console.log('in computer method');
	  var x = Math.floor(Math.random() * 3);
	  var y = Math.floor(Math.random() * 3);
	  while( calculateWinner(this.state.squares) === false && this.state.squares[x][y] !== '-'){
		  x = Math.floor(Math.random() * 3);
		  y = Math.floor(Math.random() * 3);
		  console.log('is this an infinite loop...?');
	  }
	    if(calculateWinner(this.state.squares)){
			return
		}
			
		this.handleClick(x, y);
				return
			
	    
	  }.bind(this), 1500);
  }
  
  handleClick(i, j) {
    const squares = this.state.squares.slice();
	if (calculateWinner(this.state.squares) || this.state.squares[i][j] !== '-') {
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
	  if (winner == 'tie'){
		  this.state.ties += 1;
	  }else{
		  this.state.playerTurn ? this.state.computerScore+=1 : this.state.playerScore += 1;
	  }
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
	  <div className="row">
        <div className="game-board">
          <Board squares={this.state.squares}
            onClick={(i, j) => this.handleClick(i, j)}
			/>
        </div>
	   </div>
	</div>
	<div className="row">
        <div className="game-info">
          <Score playerScore = {this.state.playerScore}
		         computerScore = {this.state.computerScore}
				 ties = {this.state.ties}/>
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
	  }else if (squares[0][2] === squares[1][1] && squares[1][1] === squares[2][0] && squares[2][0] !== '-') {
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
	var spaces = false;
	for (var i = 0; i <squares.length; i++) {
        for(var j = 0; j < squares[i].length; j++){
			if (squares[i][j] == '-'){
				spaces = true;
			}
		}
	}
	if(spaces === false){
		return 'tie';
	}
	  return false;
	  
}

export default Game;

