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
    Divider,
    Tooltip,
    ListItemText
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

function Currencies() {

    const [data, setData] = useState(null);
    const [convertCur, setConvertCur] = useState("");

    const [inputData, setInputData] = useState([
        {
            iso: "USD",
            value: "1",
        },
        {
            iso: "BYN",
            value: "",
        },
        {
            iso: "EUR",
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
        return <FormControl fullWidth sx={{ mt: 1 }} key={elem.iso}>
            <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">{elem.iso}<Divider orientation="vertical" sx={{ height: "30px", width: "10px" }} /></InputAdornment>}
                value={elem.value}
                type="number"
                onChange={(event) => changeValueInput(event, elem.iso)}
                endAdornment={
                    <InputAdornment position="end" sx={{
                        display: (elem.iso === "USD" || elem.iso === "BYN") ? "none" : "default"
                    }}>
                        <IconButton
                            onClick={() => { removeCurr(elem.iso) }}
                            edge="end"
                            sx={{
                                opacity: 0.5,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </InputAdornment>
                }
            />

        </FormControl>;

    })

    const { showError } = useError();

    useEffect(() => {

        fetch("https://developerhub.alfabank.by:8273/partner/1.0.1/public/nationalRates")
            .then((res) => res.json())
            .then((dt) => {
                if (dt.hasOwnProperty("rates") && dt.rates.length > 0) {
                    setData(dt.rates);
                } else {
                    showError("Error data request");
                }
            })
            .catch((err) => {
                showError(String(err));
            })
    }, []);
    useEffect(() => {
        if (data) {
            changeValueInputDefault();
        }
    }, [data])

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
        const valueUSD = (inputData.find((elem) => {
            return elem.iso === "USD"
        })).value;
        const valueBYN = valueUSD * (showRate("USD").rate / showRate("USD").quantity);
        const resValue = valueBYN / (showRate(convertCur).rate / showRate(convertCur).quantity);
        setInputData([...inputData, { iso: convertCur, value: resValue.toFixed(2) }]);
        setConvertCur("");
    }
    function removeCurr(elemIso) {
        let newArr = inputData.filter((elem) => {
            if (elem.iso !== elemIso) {
                return true;
            } else {
                return false;
            }
        });
        setInputData(newArr);
    }

    function changeValueInputDefault() {
        const valueUSD = (inputData.find((elem) => {
            return elem.iso === "USD"
        })).value;
        const valueBYN = valueUSD * (showRate("USD").rate / showRate("USD").quantity);
        let arr = inputData.map((elem) => {
            if (elem.iso === "BYN") {
                return { iso: elem.iso, value: valueBYN.toFixed(2) };
            } else {
                const resValue = valueBYN / (showRate(elem.iso).rate / showRate(elem.iso).quantity);
                return { iso: elem.iso, value: resValue.toFixed(2) };
            }

        });
        setInputData(arr);
    }


    return data ? (
        <Box sx={{ width: 1, mt: 1, display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center", minHeight: "80vh" }}>
            <Paper sx={{
                display: "flex",
                flexDirection: "row",
                width: { xs: 0.95, sm: 0.7, md: 0.5 },
                mb: 0.5,
                py: { xs: 2, sm: 3 },
                px: { xs: 3, sm: 6 },

            }}>
                <Typography variant="h1" sx={{
                    fontSize: { xs: "22px", sm: "24px" }
                }}>
                    Belarus National Bank's Currency Converter Rates
                </Typography>
            </Paper>
            <Paper
                sx={{
                    width: { xs: 0.95, sm: 0.7, md: 0.5 },
                    height: "auto",
                    display: "flex",
                    py: { xs: 2, sm: 3 },
                    px: { xs: 3, sm: 6 },
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
                width: { xs: 0.95, sm: 0.7, md: 0.5 },
                mt: 0.5,
                py: { xs: 2, sm: 3 },
                px: { xs: 3, sm: 6 },

            }}>

                <FormControl sx={{ width: 1 }} size="small">
                    <InputLabel id="demo-select-small">choose currency</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="outlined-select-currency-native"
                        name="name"
                        label="choose currency"
                        defaultValue="USD"
                        value={convertCur}
                        onChange={changeconvertCur}
                        sx={{
                            display: "flex",
                            flexDirection: "row"
                        }}
                    >
                        {data.map((menuItem) => (
                            (inputData.some((elem) => {
                                return elem.iso === menuItem.iso
                            })) ? (
                                <MenuItem key={menuItem.iso} value={menuItem.iso} divider={true} disabled>
                                    <ListItemText primary={menuItem.iso} />
                                    <Box component="span" sx={{ opacity: 0.5 }}>{showRate(menuItem.iso).name}</Box>
                                </MenuItem>

                            ) : (
                                <MenuItem key={menuItem.iso} value={menuItem.iso} divider={true}>
                                    <ListItemText primary={menuItem.iso} />
                                    <Box component="span" sx={{ opacity: 0.5 }}>{showRate(menuItem.iso).name}</Box>
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