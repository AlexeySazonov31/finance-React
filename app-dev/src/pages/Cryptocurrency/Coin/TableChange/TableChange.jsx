import React, {useMemo} from "react";
import { Typography, TableCell, TableContainer, Table, TableHead, TableBody, TableRow } from "@mui/material";

export default function TableChange({ data }) {

    // --------  head -------------------------------
    const shortDataTableHead = useMemo(() => {
        return createTableHead();
    }, [data])
    // ----------------------------------------------


    // --------  body -------------------------------

    const shortDataTableBody = useMemo(() => {
        if(!data || !data.market_data.price_change_percentage_1h_in_currency.usd){
            return false;
        } else {
            return createTableBody(data);
        }
    }, [data])
    // ----------------------------------------------

    return shortDataTableBody ? <>
        <Typography
            variant="overline"
            sx={{
                pl: 4,
                fontSize: "15px",
                fontWeight: 600,
            }}
        >
            change table:
        </Typography>
        <TableContainer
            sx={{
                border: "1px solid #515151",
                borderRadius: 2,
                my: 1,
            }}
        >
            <Table>
                <TableHead>
                    <TableRow>{shortDataTableHead}</TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>{shortDataTableBody}</TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </> : <></>
}

// ----------------- additional items --------------------------------------

const currencies = "usd";
const dataTableBodyElems = ["price_change_percentage_1h_in_currency", "price_change_percentage_24h_in_currency", "price_change_percentage_7d_in_currency", "price_change_percentage_14d_in_currency", "price_change_percentage_30d_in_currency", "price_change_percentage_60d_in_currency", "price_change_percentage_200d_in_currency", "price_change_percentage_1y_in_currency"];
const namesHead = ["1h", "24h", "7d", "14d", "30d", "60d", "200d", "1y"];

function createTableBody(dataGlobal){
    return dataTableBodyElems.map((elem, item) => {
        const valueBody = dataGlobal.market_data[elem][currencies];
        return <TableCell
            key={item}
            align="center"
            sx={{
                px: 1,
                mx: 0,
                fontWeight: "600",
            }}
            // 
            style={{ color: valueBody ? (valueBody >= 0 ? "#29cf45" : "red") : ("#fff") }}
        >
            {valueBody ? (valueBody > 0 ? "+" + valueBody.toFixed(2) : valueBody.toFixed(2) + "%") : ("-")}
        </TableCell>


    });
}

function createTableHead(){
    return namesHead.map((elem, key) => {
        return (
            <TableCell
                align="center"
                key={key + "-head"}
                sx={{
                    px: 1,
                    mx: 0,
                }}
            >
                <Typography>{elem}</Typography>
            </TableCell>
        );
    });

    }