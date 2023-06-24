import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";

import { useError } from "../Error/ErrorContext";

import {
    Box,
    CircularProgress,
    Typography,
    Grid,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Divider,
    Link,
    Paper,
    Avatar,
    Chip,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableRow,

} from "@mui/material";

export default function Home() {

    const [data, setData] = useState(null);

    const { showError } = useError();

    const theme = useTheme();

    useEffect(() => {

        let arr = [
            fetch("https://api.coinstats.app/public/v1/news/trending?skip=0&limit=2"),
            fetch("https://api.coinstats.app/public/v1/coins?skip=0&limit=6&currency=USD"),
            fetch("https://developerhub.alfabank.by:8273/partner/1.0.1/public/nationalRates?currencyCode=840,978,985,643,980,784,156")
        ];

        Promise.all(arr)
            .then((responses) => Promise.all(responses.map((r) => r.json())))
            .then((dt) => {
                if (dt[0].hasOwnProperty("news") && dt[0].news.length > 0 &&
                    dt[1].hasOwnProperty("coins") && dt[1].coins.length > 0 &&
                    dt[2].hasOwnProperty("rates") && dt[2].rates.length > 0) {
                    setData({
                        news: dt[0].news,
                        coins: dt[1].coins,
                        rates: (dt[2].rates).sort(sort_by("quantity", false)),
                    });
                } else {
                    showError("Error: request data");
                }
            })
            .catch(err => {
                showError(String(err));
            })

    }, []);

    console.log(data);

    return data ? (
        <Box sx={{
            width: 1,
            mt: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            minHeight: "80vh"
        }}>
            <Box
                container
                sx={{
                    width: 1,
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    maxWidth: "1150px",
                    flexDirection: { xs: "column-reverse", sm: "row" }
                }}
            >
                {/* !!!   news   !!! */}
                {data.news.map((elem, itemG) => (
                    itemG == 0 ? (
                        <Card sx={{
                            px: 1,
                            width: { xs: 0.95, sm: 0.35 },
                            mt: { xs: 2, sm: 0 },

                        }}>
                            <CardHeader
                                title={titleAbbreviation(elem.title)}
                                subheader={elem.author ? elem.author : elem.source}
                            />
                            <CardMedia
                                component="img"
                                image={
                                    elem.imgURL
                                        ? elem.imgURL
                                        : `https://via.placeholder.com/300x430.png?text=${elem.title}`
                                }
                                alt="image"
                                sx={{
                                    borderRadius: 1,
                                    height: "150px",
                                }}
                            />
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: "500",
                                        fontSize: "18px",
                                        mb: 0
                                    }}
                                    paragraph={true}
                                >
                                    {elem.description}
                                </Typography>
                            </CardContent>
                            <Divider />
                            <CardActions
                                sx={{ display: "flex", justifyContent: "space-between" }}
                            >
                                {dateFormat(elem.feedDate)}
                                <Link
                                    href={elem.link}
                                    rel="noopener"
                                    underline="none"
                                    variant="body2"
                                    target="_blank"
                                >
                                    READ MORE
                                </Link>
                            </CardActions>
                        </Card>
                    ) : (
                        <></>
                    )
                ))}
                {/* !!!   crypto coins   !!! */}
                <Paper sx={{
                    minWidth: { xs: 0.95, sm: "200px", md: "550px" },
                    width: { sm: 0.6, md: 0.5 },
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
                }}>
                    {data.coins.map((elem, index) => (
                        <Box key={index} sx={{
                            display: 'flex',
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            minHeight: { xs: "170px", sm: "160px", md: "200px" },
                            px: { xs: 1.5, sm: 2 },
                            borderRight: {
                                xs: index % 2 == 0 ? "1px solid rgba(255, 255, 255, 0.12)" : "none",
                                md: index < data.coins.length - 1 && index != 2 ? "1px solid rgba(255, 255, 255, 0.12)" : "none",
                            },
                            borderBottom: {
                                xs: index < 4 ? "1px solid rgba(255, 255, 255, 0.12)" : "none",
                                md: index < 3 ? "1px solid rgba(255, 255, 255, 0.12)" : "none",
                            }
                        }}>
                            <Box sx={{
                                width: 1,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <Chip label={elem.rank} variant="outlined" size="small" />
                                <Typography component="h4">{titleAbbreviation1Word(elem.name)}</Typography>
                                <Chip label={elem.symbol} variant="outlined" size="small" />
                            </Box>
                            <Box sx={{
                                width: 1,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}>
                                <Box sx={{
                                    // width: 0.5,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-evenly",
                                    alignItems: "flex-start",
                                }}>
                                    <Avatar alt={elem.id} src={elem.icon}
                                        sx={{
                                            width: { xs: 50, sm: 55 },
                                            height: { xs: 50, sm: 55 },
                                        }} />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-end",
                                        // width: 0.5,
                                        justifyContent: "center"
                                    }}>
                                    {["priceChange1h", "priceChange1d", "priceChange1w"].map((elemPr, index) => (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                alignItems: "stretch",
                                                width: "80px",
                                            }}
                                            key={index}
                                        >
                                            <Typography
                                                color="text.secondary"
                                                sx={{
                                                }}
                                            >
                                                {elemPr[elemPr.length - 1]}:
                                            </Typography>
                                            <Typography
                                                color={elem[elemPr] >= 0 ? "#29cf45" : "red"}
                                            >
                                                {elem[elemPr] > 0
                                                    ? "+" + elem[elemPr]
                                                    : elem[elemPr]}%
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                            <Box sx={{
                                width: 1,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}>
                                <Typography component="h3">{numberSpace(elem.price)} $</Typography>
                                <Link
                                    href={elem.websiteUrl}
                                    rel="noopener"
                                    underline="none"
                                    variant="body1"
                                    target="_blank"
                                >
                                    site
                                </Link>
                            </Box>


                        </Box>
                    ))}
                </Paper>
            </Box>

            {/* !!!   second line   !!! */}

            <Box
                container
                sx={{
                    width: 1,
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    maxWidth: "1150px",
                    flexDirection: { xs: "column", sm: "row" },
                    my: {xs: 2, sm: 3},
                }}
            >
                {/* !!!   currency rates   !!! */}
                <TableContainer
                    component={Paper}
                    sx={{
                        //   my: 1,
                        //   mx: { xs: 1, sm: 3, md: 3, lg: 3, xl: 10 },
                        // minWidth: { xs: 0.95, sm: "200px", md: "550px" },
                        width: {xs: 0.95, sm: 0.5, md: 0.4 },
                    }}

                >
                    <Table sx={{ width: 1 }} aria-label="simple table">
                        <TableBody>
                            {data.rates.map((cur, key) => (
                                <TableRow
                                    key={key}
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
                                >
                                    <TableCell align="right">
                                        {cur.quantity}
                                    </TableCell>
                                    <TableCell align="left">
                                        {cur.iso}
                                    </TableCell>
                                    <TableCell align="center">
                                        =
                                    </TableCell>
                                    <TableCell align="right">
                                        {cur.rate}
                                    </TableCell>
                                    <TableCell align="left">
                                        BYN
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* !!!   news   !!! */}
                {data.news.map((elem, itemG) => (
                    itemG == 1 ? (
                        <Card sx={{
                            px: 1,
                            width: { xs: 0.95, sm: 0.35 },
                            mt: { xs: 2, sm: 0 },

                        }}>
                            <CardHeader
                                title={titleAbbreviation(elem.title)}
                                subheader={elem.author ? elem.author : elem.source}
                            />
                            <CardMedia
                                component="img"
                                image={
                                    elem.imgURL
                                        ? elem.imgURL
                                        : `https://via.placeholder.com/300x430.png?text=${elem.title}`
                                }
                                alt="image"
                                sx={{
                                    borderRadius: 1,
                                    height: "150px",
                                }}
                            />
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: "500",
                                        fontSize: "18px",
                                        mb: 0
                                    }}
                                    paragraph={true}
                                >
                                    {elem.description}
                                </Typography>
                            </CardContent>
                            <Divider />
                            <CardActions
                                sx={{ display: "flex", justifyContent: "space-between" }}
                            >
                                {dateFormat(elem.feedDate)}
                                <Link
                                    href={elem.link}
                                    rel="noopener"
                                    underline="none"
                                    variant="body2"
                                    target="_blank"
                                >
                                    READ MORE
                                </Link>
                            </CardActions>
                        </Card>
                    ) : (
                        <></>
                    )
                ))}

            </Box>
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



function dateFormat(timestamp) {
    const months = [
        "Dec",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
    ];
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const date = new Date(timestamp);
    return (
        date.getDate() +
        " " +
        months[date.getMonth()] +
        " " +
        date.getFullYear() +
        ", " +
        days[date.getDay()]
    );
}

function numberSpace(x) {
    x = x.toFixed(2);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function titleAbbreviation(str) {
    if (str.length <= 16) {
        return str;
    } else {
        return str.split(" ")[0] + " " + str.split(" ")[1] + " " + str.split(" ")[2] + "...";
    }
}

function titleAbbreviation1Word(str) {
    if (str.split(" ").length <= 1) {
        return str;
    } else {
        return str.split(" ")[0] + "...";
    }
}

const sort_by = (field, reverse, primer) => {
    const key = primer
      ? function (x) {
          return primer(x[field]);
        }
      : function (x) {
          return x[field];
        };
  
    reverse = !reverse ? 1 : -1;
  
    return function (a, b) {
      return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
    };
  };