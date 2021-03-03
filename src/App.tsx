import React from "react";

import ControlPanel from "./Components/ControlPanel";
import Board from "./Components/Board";
import {IGameState} from './interfaces';

function calculateWinner(squares: string[]) {
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

let play: string = '';

class App extends React.Component<{}, IGameState> {
    constructor(props: any) {
        super(props);
        this.state = {
            stepNumber: 0,
            history: [{
                squares: window.localStorage.game ? JSON.parse(window.localStorage.game) : Array(9)
            }],
            xIsNext: true,
        };
    }

    handleClick(i: number) {
        if (play !== 'play') play = 'play'; else play = '';

        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        window.localStorage.setItem('game', JSON.stringify(squares))
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step: number) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    autoPlay = () => {
        let it = 0;
        window.localStorage.setItem('game', '')
        this.setState({
            stepNumber: 0,
            history: [{
                squares: Array(9)
            }],
            xIsNext: true,
        });

        const interval = setInterval(() => {
            this.handleClick(it);
            if (it < 6) it++; else {
                clearInterval(interval);
            }

        }, 1000);
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
            window.localStorage.setItem('game', '')
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        status={status}
                        onClick={(i) => this.handleClick(i)}
                    />
                    <ControlPanel
                        play={play}
                        autoPlay={this.autoPlay}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default App
