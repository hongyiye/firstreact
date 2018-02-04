import React from 'react';

//计算胜负的算法
function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

class Square extends React.Component {
    constructor() {
        super();
        this.state = {
            value: null
        };
    }
    render() {
      return (
        <button className="square" onClick={this.props.onClick}>
          {this.props.value}
        </button>
      );
    }
  }

class Board extends React.Component{

    renderSquare(i){
        return <Square value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}/>
    }
    render() {
    
        return (
            <div>
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

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0
        };
    }
    handleClick(squreIndex){
        const history = this.state.history.slice(0,this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        
        if (calculateWinner(squares) || squares[squreIndex]) {
            return;
        }
        squares[squreIndex] = this.state.xIsNext?'X':'O';
        this.setState({
            history: history.concat({
                squares: squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }
    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: ((Number.parseInt(step) % 2) === 0)
        });
    }
    render() {
        const history = this.state.history.slice(0,this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step,move) => {
            const desc = move?'Move #' + move:'Game start';
            //console.log(step);//元素
            //console.log(move);//下标
            return (
                <li key={move}>
                    <div onClick={() => this.jumpTo(move)}>{desc}</div>
                </li>
            );
        });

        let status;
        if(winner){
            status = 'Winner: ' + winner;
        }else{
            status = 'Next player: ' + (this.state.xIsNext?'X':'Y');
        }
        
      return (
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares}
            onClick={(i) => this.handleClick(i)}/>{/*这里定义了一个方法传给子类*/}
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

/*游戏测试用样式，例子完成之后删除
ol, ul {
    padding-left: 30px;
  }
  
  .board-row:after {
    clear: both;
    content: "";
    display: table;
  }
  
  .status {
    margin-bottom: 10px;
  }
  
  .square {
    background: #fff;
    border: 1px solid #999;
    float: left;
    font-size: 24px;
    font-weight: bold;
    line-height: 34px;
    height: 34px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;
    width: 34px;
  }
  
  .square:focus {
    outline: none;
  }
  
  .kbd-navigation .square:focus {
    background: #ddd;
  }
  
  .game {
    display: flex;
    flex-direction: row;
  }
  
  .game-info {
    margin-left: 20px;
  }
*/