import React from "react";
import {useError} from "./ErrorContext";

export default function Error(){

    const error = useError()

    return <>
    <h1>Error: {error.message}</h1>
    </>
}