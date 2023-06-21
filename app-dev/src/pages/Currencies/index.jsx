import React, { useEffect, useState, useMemo } from "react";
import { useError } from "../Error/ErrorContext";

import {
    Paper,
    Box,
    ToggleButtonGroup, 
    ToggleButton, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    IconButton,
    Typography
} from "@mui/material";

function Currencies() {
    const [data, setData] = useState(null);
    const [convertCur, setConvertCur] = useState("USD");

    const primaryCur = "BLR";

    const { showError } = useError();

    useEffect(() => {

        fetch("https://developerhub.alfabank.by:8273/partner/1.0.1/public/nationalRates")
            .then((res) => res.json())
            .then((dt) => {
                dt ? setData(dt.rates) : showError("Error data request");
            })
            .catch((err) => {
                showError(String(err));
            })
    }, []);

    console.log(data)

    function showRate(cur) {
        return (data.find((elem) => { return elem.iso === cur }));
    }

    console.log(data)

    const listCur = data ? (data.map((elem, index) => {
        return <MenuItem key={index} value={elem.iso}>{elem.iso}</MenuItem>
    })) : <></>;

    console.log(listCur);

    const changeconvertCur = (event) => {
        setConvertCur(event.target.value);
      };
    
    return data ? (<Paper
        sx={{
            width: 0.5,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}
    >
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                width: 1,
                mt: 1
            }}
        >
            <FormControl sx={{ width: 0.5 }} size="small">
                <InputLabel id="demo-select-small">currency</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    name="name"
                    defaultValue="USD"
                    value={convertCur}
                    label="Age"
                    onChange={changeconvertCur}
                >
{listCur}
                </Select>
            </FormControl>
        </Box>
        <Typography variant="h5">
             {`${showRate(convertCur).quantity} ${convertCur} = ` + showRate(convertCur).rate + ` ${primaryCur}`}
        </Typography>

    </Paper>) : (<></>)
}


export default Currencies;