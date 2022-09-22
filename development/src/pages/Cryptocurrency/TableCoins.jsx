import React from "react";
import { useTheme } from "@mui/material/styles";

import { Link, useNavigate } from "react-router-dom";


import {
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Avatar,
  Chip,
  IconButton,
  Button,
} from "@mui/material";

import LinkElem from '@mui/material/Link';

import { useState } from "react";

import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import Sort from "@mui/icons-material/Sort";

function TableCoins({ rows, sorting, changeSorting }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const changeButton = (name) => {
    if (sorting.name !== name) {
      changeSorting({ target: { name: "name", value: "" } });
      changeSorting({ target: { name: "name", value: name } });
    } else {
      if (!sorting.reverse) {
        changeSorting({ target: {  } });
      } else {
        changeSorting({ target: { name: "name", value: "" } });
      }
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          my: 1,
          mx: { xs: 1, sm: 3, md: 3, lg: 3, xl: 10 },
        }}
      >
        <Table sx={{ width: 1 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                bgcolor: theme.palette.mode === "dark" ? "#253036" : "#d5dcde",
              }}
            >
              <TableCell
                align="right"
                sx={{
                  display: { xs: "none", sm: "table-cell" },
                  fontWeight: "600",
                  px: 1,
                }}
              >
                <Button
                  variant={sorting.name === "rank" ? "outlined" : "string"}
                  endIcon={
                    sorting.name === "rank" ? (
                      sorting.reverse ? (
                        <SouthIcon />
                      ) : (
                        <NorthIcon />
                      )
                    ) : (
                      <Sort />
                    )
                  }
                  onClick={ () => changeButton('rank') }
                  sx={{
                    m: 0,
                    fontWeight: "600",
                    px: 1
                  }}
                  size="small"
                >
                  RANK
                </Button>
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  fontWeight: "600",
                }}
              >
                ICON
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "600",
                }}
              >
                NAME
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  fontWeight: "600",
                }}
              >
                SYMBOL
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontWeight: "600",
                  px: 1,
                }}
              >
                <Button
                  variant={sorting.name === "price" ? "outlined" : "string"}
                  name="price"
                  endIcon={
                    sorting.name === "price" ? (
                      sorting.reverse ? (
                        <SouthIcon />
                      ) : (
                        <NorthIcon />
                      )
                    ) : (
                      <Sort />
                    )
                  }
                  onClick={ () => changeButton('price') }
                  sx={{
                    m: 0,
                    fontWeight: "600",
                    px: 1
                  }}
                  size="small"
                >
                  PRICE
                </Button>
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  fontWeight: "600",
                  px: 1,
                }}
              >
                <Button
                  variant={
                    sorting.name === "priceChange1h" ? "outlined" : "string"
                  }
                  name="priceChange1h"
                  endIcon={
                    sorting.name === "priceChange1h" ? (
                      sorting.reverse ? (
                        <SouthIcon />
                      ) : (
                        <NorthIcon />
                      )
                    ) : (
                      <Sort />
                    )
                  }
                  onClick={ () => changeButton('priceChange1h') }
                  sx={{
                    m: 0,
                    fontWeight: "600",
                    px: 1
                  }}
                  size="small"
                >
                  HOUR
                </Button>
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  fontWeight: "600",
                  px: 1,
                }}
              >
                <Button
                  variant={
                    sorting.name === "priceChange1d" ? "outlined" : "string"
                  }
                  name="priceChange1d"
                  endIcon={
                    sorting.name === "priceChange1d" ? (
                      sorting.reverse ? (
                        <SouthIcon />
                      ) : (
                        <NorthIcon />
                      )
                    ) : (
                      <Sort />
                    )
                  }
                  onClick={ () => changeButton('priceChange1d') }
                  sx={{
                    m: 0,
                    fontWeight: "600",
                    px: 1,
                  }}
                  size="small"
                >
                  DAY
                </Button>
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  display: { xs: "none", sm: "table-cell" },
                  fontWeight: "600",
                  px: 1,
                }}
              >
                <Button
                  variant={
                    sorting.name === "priceChange1w" ? "outlined" : "string"
                  }
                  name="priceChange1w"
                  endIcon={
                    sorting.name === "priceChange1w" ? (
                      sorting.reverse ? (
                        <SouthIcon />
                      ) : (
                        <NorthIcon />
                      )
                    ) : (
                      <Sort />
                    )
                  }
                  onClick={ () => changeButton('priceChange1w') }
                  sx={{
                    m: 0,
                    fontWeight: "600",
                    px: 1,
                  }}
                  size="small"
                >
                  WEEK
                </Button>
              </TableCell>


              <TableCell
                align="center"
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  fontWeight: "600",
                }}
              >
                SITE
              </TableCell>



            </TableRow>
          </TableHead>



          <TableBody>
            {rows.map((row, key) => (
              <TableRow
                hover={true}
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? key % 2 !== 0
                        ? "#28343b"
                        : "#2e3c42"
                      : key % 2 !== 0
                      ? "#e1eaed"
                      : "#ebf4f7",
                }}
                onClick={ () => {
                  navigate(`/coin/${row.id}`);
                } }
              >
                <TableCell
                  align="right"
                  sx={{
                    display: { xs: "none", sm: "table-cell" },
                  }}
                >
                  <Chip label={row.rank} variant="outlined" />
                </TableCell>
                <TableCell align="center">
                  <Avatar
                    src={row.icon}
                    sx={{
                      width: "32px",
                      height: "32px",
                    }}
                    variant="square"
                  />
                </TableCell>
                <TableCell align="center">
                  {titleAbbreviation(row.name)}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    display: { xs: "none", lg: "table-cell" },
                  }}
                >
                  <Chip label={row.symbol} variant="outlined" />
                </TableCell>
                <TableCell align="left">
                  {numberSpace(row.price.toFixed(3))} $
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    display: { xs: "none", lg: "table-cell" },
                  }}
                >
                  <Typography
                    variant="body2"
                    color={row.priceChange1h >= 0 ? "#29cf45" : "red"}
                  >
                    {row.priceChange1h > 0
                      ? "+" + row.priceChange1h
                      : row.priceChange1h}
                    %
                  </Typography>
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    display: { xs: "none", lg: "table-cell" },
                  }}
                >
                  <Typography
                    variant="body2"
                    color={row.priceChange1d >= 0 ? "#29cf45" : "red"}
                  >
                    {row.priceChange1d > 0
                      ? "+" + row.priceChange1d
                      : row.priceChange1d}
                    %
                  </Typography>
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    display: { xs: "none", sm: "table-cell" },
                  }}
                >
                  <Typography
                    variant="body2"
                    color={row.priceChange1w >= 0 ? "#29cf45" : "red"}
                  >
                    {row.priceChange1w > 0
                      ? "+" + row.priceChange1w
                      : row.priceChange1w}
                    %
                  </Typography>
                </TableCell>


                <TableCell
                align="center"
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                  fontWeight: "600",
                }}
              >
                              <LinkElem
                href={row.websiteUrl}
                rel="noopener"
                underline="none"
                variant="body1"
                target="_blank"
              >
                link
              </LinkElem>
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableCoins;

function numberSpace(x) {
  let ab = x.toString().split(".");
  if (ab.length > 1) {
    let past = ab[1]
      .split("")
      .reverse()
      .join("")
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      .split("")
      .reverse()
      .join("");
    return (
      ab[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ." + past
    );
  } else {
    return ab[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
}

function titleAbbreviation(str) {
  if (str.length <= 16) {
    return str;
  } else {
    return str.split(" ")[0] + "...";
  }
}
