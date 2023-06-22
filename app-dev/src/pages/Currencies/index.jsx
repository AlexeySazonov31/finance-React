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
    Typography,
    TextField,
    FilledInput,
    InputAdornment,
} from "@mui/material";

function Currencies() {

    const [data, setData] = useState(null);
    const [convertCur, setConvertCur] = useState("USD");

    const [inputData, setInputData] = useState([
        {
            iso: "BYN",
            value: "13",
        },
        {
            iso: "EUR",
            value: "",
        },
        {
            iso: "USD",
            value: "",
        },
        {
            iso: "PLN",
            value: "",
        },
        {
            iso: "RUB",
            value: "",
        },
    ]);

    const inputList = inputData.map((elem) => {
        return <FormControl fullWidth sx={{ m: 1 }} variant="filled" key={elem.iso}>
            <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
            <FilledInput
                id="filled-adornment-amount"
                startAdornment={<InputAdornment position="start">{elem.iso}</InputAdornment>}
                value={elem.value}
                type="number"
                onChange={(event) => changeValueInput(event, elem.iso)}
            />
        </FormControl>;

    })

    // const primaryCur = "BYN";

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

    function showRate(cur) {
        return (data.find((elem) => { return elem.iso === cur }));
    }

    const changeconvertCur = (event) => {
        setConvertCur(event.target.value);
    };

    function changeValueInput(event, isoElem) {
        let sumBYN;
        if (isoElem === "BYN") {
            sumBYN = event.target.value;
        } else {
            sumBYN = event.target.value * (showRate(isoElem).rate / showRate(isoElem).quantity);
        }
        let arr = inputData.map((elem) => {
            if (elem.iso === isoElem) {
                return { iso: elem.iso, value: event.target.value }
            } else if (elem.iso === "BYN") {
                return { iso: elem.iso, value: sumBYN.toFixed(2) };
            } else {
                const resValue = sumBYN / (showRate(elem.iso).rate / showRate(elem.iso).quantity);
                return { iso: elem.iso, value: resValue.toFixed(2) };
            }

        });
        setInputData(arr);
    }

    return data ? (
        <Box sx={{ width: 1, display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
            <Paper
                sx={{
                    width: 0.5,
                    height: "fit-content",
                    padding: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: 0.7,
                        mt: 1
                    }}
                >
                    <FormControl sx={{ width: 1 }} size="small">
                        <InputLabel id="demo-select">currency</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="outlined-select-currency-native"
                            name="name"
                            defaultValue="USD"
                            value={convertCur}
                            label="currency"
                            onChange={changeconvertCur}
                            sx={{ my: 1 }}
                        >
                            {data.map((menuItem) => (
                                <MenuItem key={menuItem.iso} value={menuItem.iso}>
                                    {menuItem.iso}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {inputList}
                </Box>

                {/* <Typography variant="h5">
                    {`${showRate(convertCur).quantity} ${convertCur} = ` + showRate(convertCur).rate + ` ${primaryCur}`}
                </Typography> */}

            </Paper>
        </Box>
    ) : (<></>)
}


export default Currencies;