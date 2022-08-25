import React from "react";
import { useTheme } from "@mui/material/styles";

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
  Link,
  Chip,
} from "@mui/material";

import { blueGrey, grey } from "@mui/material/colors/";

function TableCoins({ rows }) {
  const theme = useTheme();

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          margin: 3,
          mx: { xs: 1, sm: 3, md: 3, lg: 3, xl: 10 },
        }}
      >
        <Table sx={{ width: 1 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                bgcolor:
                  theme.palette.mode === "dark" ? "#253036" : blueGrey[100],
              }}
            >
              <TableCell align="left" sx={{
                    display: { xs: "none", sm: "table-cell" },
                  }}>rank</TableCell>

              <TableCell align="center">icon</TableCell>
              <TableCell align="center">name</TableCell>
              <TableCell
                align="center"
                sx={{
                  display: { xs: "none", lg: "table-cell" },
                }}
              >
                symbol
              </TableCell>
              <TableCell align="left">price</TableCell>
              <TableCell align="right" sx={{
                    display: { xs: "none", lg: "table-cell" },
                  }}>hour</TableCell>
              <TableCell align="right" sx={{
                    display: { xs: "none", lg: "table-cell" },
                  }}>day</TableCell>
              <TableCell align="right" sx={{
                    display: { xs: "none", sm: "table-cell" },
                  }}>week</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, key) => (
              <TableRow
                key={key}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  bgcolor: key % 2 !== 0 ? "#28343b" : "#2e3c42",
                }}
              >
                <TableCell align="left"  sx={{
                    display: { xs: "none", sm: "table-cell" },
                  }}>
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

                <TableCell align="right" sx={{
                    display: { xs: "none", lg: "table-cell" },
                  }}>
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

                <TableCell align="right" sx={{
                    display: { xs: "none", lg: "table-cell" },
                  }}>
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

                <TableCell align="right" sx={{
                    display: { xs: "none", sm: "table-cell" },
                  }}>
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
      ab[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " . " + past
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
