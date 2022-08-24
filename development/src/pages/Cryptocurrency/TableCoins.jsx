import React from "react";

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

function TableCoins({ rows }) {
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          margin: 3,
        }}
      >
        <Table
          sx={{ width: 1, }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">rank</TableCell>

              <TableCell>icon</TableCell>
              <TableCell align="left">name</TableCell>
              <TableCell align="left">symbol</TableCell>
              <TableCell align="left">price</TableCell>
              <TableCell align="right">hour</TableCell>
              <TableCell align="right">day</TableCell>
              <TableCell align="right">week</TableCell>
              <TableCell align="right">link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, key) => (
              <TableRow
                key={key}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="left">
                  {" "}
                  <Chip label={row.rank} variant="outlined" />
                </TableCell>
                <TableCell>
                  <Avatar src={row.icon} variant="square" />
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">
                  <Chip label={row.symbol} variant="outlined" />
                </TableCell>
                <TableCell align="left">{numberSpace(row.price)} $</TableCell>

                <TableCell align="right">
                  <Typography
                    color={row.priceChange1h >= 0 ? "#29cf45" : "red"}
                  >
                    {row.priceChange1h > 0
                      ? "+" + row.priceChange1h
                      : row.priceChange1h}
                    %
                  </Typography>
                </TableCell>

                <TableCell align="right">
                  <Typography
                    color={row.priceChange1d >= 0 ? "#29cf45" : "red"}
                  >
                    {row.priceChange1d > 0
                      ? "+" + row.priceChange1d
                      : row.priceChange1d}
                    %
                  </Typography>
                </TableCell>

                <TableCell align="right">
                  <Typography
                    color={row.priceChange1w >= 0 ? "#29cf45" : "red"}
                  >
                    {row.priceChange1w > 0
                      ? "+" + row.priceChange1w
                      : row.priceChange1w}
                    %
                  </Typography>
                </TableCell>

                <TableCell align="right">
                  <Link
                    href={row.websiteUrl}
                    rel="noopener"
                    underline="none"
                    variant="body1"
                    target="_blank"
                  >
                    site
                  </Link>
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
