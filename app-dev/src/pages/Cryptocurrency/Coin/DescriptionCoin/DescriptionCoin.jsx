import React, { useState } from "react";
import { Box, Button, Grow } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useTheme } from "@mui/material/styles";

export default function DescriptionCoin({ data }) {

    const theme = useTheme();

    const [expanded, setExpanded] = useState(false);

    return <Box
        sx={{
            px: 3,
            pt: 2,
        }}
    >
        <Button
            variant="text"
            sx={{
                color: theme.palette.mode === "dark" ? "#fff" : "#000",
                px: 2,
                my: 1,
            }}
            startIcon={
                <ExpandMoreIcon />
            }
            onClick={() => {
                setExpanded(!expanded);
            }}
        >
            DESCRIPTION
        </Button>

        <Grow sx={{
            position: 'absolute',
            width: '70vw',
            backgroundColor: theme.palette.mode === "dark" ? '#313c42' : "#e1e5e5",
            zIndex: 1,
            p: 2,
            borderRadius: 2,
            boxShadow: "0px 0px 17px 6px rgba(14, 18, 21, 0.2)",
        }} in={expanded} >
            <Box>
                {decodeHTMLEntities(data.description.en)}
            </Box>
        </Grow>
    </Box>
}

function decodeHTMLEntities(str) {
    let textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    let textHTML = textarea.value;
    textHTML = textHTML.replace(/<.+>/g, "");
    return textHTML;
}