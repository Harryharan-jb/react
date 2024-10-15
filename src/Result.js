import React from "react";

function Result ({secretNum, term}){
    let result;

    if(term){
    if(term > secretNum){
        result = "Wrong answer";
    }
    else if(term < secretNum){
        result = "Wrong answer";
    }
    else if(term == secretNum){
        result ="Yeah its correct!..";
    }
    else {
        result ="Enter the valid input";
    }
}
    return <h3>You Guessed: {result}</h3>
}

export default Result;