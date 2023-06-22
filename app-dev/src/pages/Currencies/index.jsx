import React, { useEffect, useState, useMemo } from "react";
import { useError } from "../Error/ErrorContext";

import "../../styles/hideArrowsCurr.css";

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
    CircularProgress,
    OutlinedInput,
    Button,
    Divider
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

function Currencies() {

    const [data, setData] = useState(null);
    const [convertCur, setConvertCur] = useState("UAH");

    const [inputData, setInputData] = useState([
        {
            iso: "BYN",
            value: "",
        },
        {
            iso: "EUR",
            value: "",
        },
        {
            iso: "USD",
            value: "1",
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
        return <FormControl fullWidth sx={{ mt: 1 }} key={elem.iso}>
            <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">{elem.iso}</InputAdornment>}
                value={elem.value}
                type="number"
                onChange={(event) => changeValueInput(event, elem.iso)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => {removeCurr(elem.iso)}}
                            edge="end"
                        >
                            <CloseIcon />
                        </IconButton>
                    </InputAdornment>
                }
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

    function addCurr() {
        setInputData([...inputData, { iso: convertCur, value: "" }]);
    }
    function removeCurr(elemIso){
        let newArr = inputData.filter((elem) => {
            if(elem.iso !== elemIso){
                return true;
            } else {
                return false;
            }
        });
        setInputData(newArr);
    }

    console.log(data);

    return data ? (
        <Box sx={{ width: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
            <Paper
                sx={{
                    width: 0.5,
                    height: "auto",
                    display: "flex",
                    py: 3,
                    px: 6,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "1s",
                }}
            >
                {inputList}
            </Paper>
            <Paper sx={{
                display: "flex",
                flexDirection: "row",
                width: 0.5,
                mt: 0.5,
                py: 3,
                px: 6,

            }}>

                <FormControl sx={{ width: 1 }} size="small">
                    <Select
                        labelId="demo-select-small"
                        id="outlined-select-currency-native"
                        name="name"
                        defaultValue="USD"
                        value={convertCur}
                        onChange={changeconvertCur}
                    >
                        {data.map((menuItem) => (
                            (inputData.some((elem) => {
                                return elem.iso === menuItem.iso
                            })) ? (
                            <MenuItem key={menuItem.iso} value={menuItem.iso} divider={true} disabled>
                                {menuItem.iso}
                            </MenuItem>
                            ) : (
                            <MenuItem key={menuItem.iso} value={menuItem.iso} divider={true}>
                                {menuItem.iso}
                            </MenuItem>
                            )
                        ))}
                    </Select>
                </FormControl>

                <Button variant="outlined" color="success" onClick={addCurr} endIcon={<AddIcon />}>
                    ADD
                </Button>
            </Paper>


        </Box>
    ) : (
        <Box
            sx={{
                width: "1",
                display: "flex",
                justifyContent: "center",
                minHeight: "93vh",
                alignItems: "center",
            }}
        >
            <CircularProgress size="5rem" />
        </Box>
    )
}


export default Currencies;