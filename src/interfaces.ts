export interface IBoardState {
    squares?: string[],
    stepNumber: number,
    xIsNext: boolean,
    value?: string,
}

export interface IGameState extends IBoardState {
    history: {
        squares: string[]
    }[],
}

export interface ISquareProps {
    value?: string,

    onClick(i: any): void,
}

export interface IBoardProps extends ISquareProps {
    squares: string[],
    status: string
}


