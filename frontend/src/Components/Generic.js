import React from 'react'
import {
    BrowserRouter as Router, Route, Switch, useParams
} from "react-router-dom";
import { Container, Paper } from "@mui/material"

const Generic = () => {
    const { aplication, module, models } = useParams();
    return (
        <Container component={Paper} >
            <h4>{aplication}</h4>
            <h4>{module}</h4>
            <h4>{models}</h4>
        </Container >
    )
}

export default Generic
