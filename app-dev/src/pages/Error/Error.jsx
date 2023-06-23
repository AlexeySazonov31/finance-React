import React from "react";
import {useError} from "./ErrorContext";
import { Box, Paper, Typography } from "@mui/material";

export default function Error(){

    const error = useError()

    return <Box sx={{
        minHeight: "74vh",
        width: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pb: 25,
    }}>
        <Paper sx={{
        width: {xs: 0.8, sm: 0.5},
        p: 5,
    }}>
        <Typography variant="h1" sx={{fontSize: "24px"}}>
            <Box component="span" sx={{
                color: "#b70909",
                fontWeight: "bold"
            }}>Error: </Box>
            {error.message}
            </Typography>
    </Paper>
    </Box>
}