import React from 'react'
import {Button, FormControl} from "@mui/material";

export default function Todo(){
    return(
        <FormControl  className="todo-form">
            <input className="todo-input"></input>
            <Button onClick={() => {console.log("my button works hehe")}} className="todo-button">Add</Button>
        </FormControl>
    )
}