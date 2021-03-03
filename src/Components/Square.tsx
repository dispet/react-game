import React from "react";
import {ISquareProps} from '../interfaces'

export default (props: ISquareProps) => {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
