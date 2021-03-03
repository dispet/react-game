import React from "react";

import {IBoardProps, IBoardState} from '../interfaces'
import Square from "./Square";

class Board extends React.Component<IBoardProps, IBoardState> {
    render() {
        const row = [0, 1, 2]
        const col = [0, 1, 2]

        return (
            <div className="status">{this.props.status}
                {col.map((it, x) => {
                    return (
                        <div className="board-row" key={x}>
                            {row.map((item, i) => {
                                return (
                                    <Square
                                        key={i}
                                        value={this.props.squares[x * 3 + i]}
                                        onClick={() => this.props.onClick(x * 3 + i)}/>

                                )
                            })
                            }
                        </div>
                    )
                })}
            </div>
        )

    }
}

export default Board
