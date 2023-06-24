import React, { useState, useEffect } from "react";

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


} from "@mui/material";

export default function Home() {

    const [data, setData] = useState(null);

    const { showError } = useError();

    useEffect(() => {

        let arr = [
            fetch("https://api.coinstats.app/public/v1/news/trending?skip=0&limit=2"),
            fetch("https://api.coinstats.app/public/v1/coins?skip=0&limit=6&currency=USD"),
            fetch("https://developerhub.alfabank.by:8273/partner/1.0.1/public/nationalRates?currencyCode=840,978,985,643")
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
                        rate: dt[2].rates,
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
                    maxWidth: "1150px"
                }}
            >
                {/* !!!   news   !!! */}
                {data.news.map((elem, itemG) => (
                    itemG == 0 ? (
                        <Card sx={{ px: 1,
                        width: 0.3 }}>
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
                minWidth: "550px",
                width: 0.5,
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
            }}>
                {data.coins.map((elem, index) => (
                    <Box key={index} sx={{
                        display: 'flex',
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        minHeight: "200px",
                        px: 2,
                        borderRight: index < data.coins.length - 1 && index != 2 ? "1px solid rgba(255, 255, 255, 0.12)" : "none",
                        borderBottom: index < 3 ? "1px solid rgba(255, 255, 255, 0.12)" : "none",
                    }}>
                        <Box sx={{
                            width: 1,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <Chip label={elem.rank} variant="outlined" size="small" />
                            <Typography component="h4">{elem.name}</Typography>
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
                                <Avatar alt={elem.id} src={elem.icon} sx={{ width: 55, height: 55 }} />
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                    // width: 0.5,
                                    justifyContent: "center"
                                }}>
                                {["priceChange1h", "priceChange1d", "priceChange1w"].map((elemPr,index) => (
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