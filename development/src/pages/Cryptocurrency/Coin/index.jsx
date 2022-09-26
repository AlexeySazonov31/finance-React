import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Chart from "./chart/chart";

import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Chip,
  Divider,
  Link,
  Avatar,
  Stack,
  Collapse,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
} from "@mui/material";

import IconButton, { IconButtonProps } from "@mui/material/IconButton";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Coin({ id }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`
    )
      .then((res) => res.json())
      .then((data) => {
        data.hasOwnProperty("error")
          ? navigate("/not-found-404")
          : console.log(data);
        setLoading(true);
        setData(data);
      });
  }, []);

  let shortDataTableBody, shortDataTableHead;
  if (data && data.market_data.price_change_percentage_1h_in_currency) {
    const {
      price_change_percentage_1h_in_currency,
      price_change_percentage_24h_in_currency,
      price_change_percentage_7d_in_currency,
      price_change_percentage_14d_in_currency,
      price_change_percentage_30d_in_currency,
      price_change_percentage_60d_in_currency,
      price_change_percentage_200d_in_currency,
      price_change_percentage_1y_in_currency,
    } = data.market_data;

    const currencies = "usd";

    const shortDataTableInfo = [
      price_change_percentage_1h_in_currency[currencies],
      price_change_percentage_24h_in_currency[currencies],
      price_change_percentage_7d_in_currency[currencies],
      price_change_percentage_14d_in_currency[currencies],
      price_change_percentage_30d_in_currency[currencies],
      price_change_percentage_60d_in_currency[currencies],
      price_change_percentage_200d_in_currency[currencies],
      price_change_percentage_1y_in_currency[currencies],
    ];

    shortDataTableBody = shortDataTableInfo.map((elem, key) => {
      return (
        <TableCell key={key} align="center" sx={{
          px: 1,
          mx: 0,
        }}>
          <Typography
            sx={{
              fontWeight: "600",
            }}
            color={elem >= 0 ? "#29cf45" : "red"}
          >
            {elem > 0 ? "+" + elem.toFixed(2) : elem.toFixed(2)}%
          </Typography>
        </TableCell>
      );
    });

    let namesHead = ['1h', '24h', '7d', '14d', '30d', '60d', '200d', '1y'];
    shortDataTableHead = namesHead.map( (elem, key) => {
      return <TableCell align="center" key={key} sx={{
        px: 1,
        mx: 0,
      }}><Typography>{elem}</Typography></TableCell>
    } )
  } else {
    shortDataTableBody = <></>;
    shortDataTableHead = <></>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: loading ? "start" : "center",
        minHeight: loading ? "auto" : "93vh",
        width: "1",
        alignItems: "center",
        border: "1px solid green",
        px: { xs: 2, sm: 4, md: 7, lg: 12, xl: 15 },
      }}
    >
      {loading ? (
        <Paper
          sx={{
            py: 3,
            px: { xs: 3, sm: 3, md: 5, lg: 8, xl: 10 },
            width: 1,
            marginTop: 1,
            mx: { xs: 2, sm: 3, md: 5, lg: 8, xl: 10 },
            maxWidth: "1300px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: 1,
              alignItems: "center",
            }}
          >
            <Box>
              <Chip label={data.market_cap_rank} variant="outlined" />
              <Chip
                label={data.symbol}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  ml: { xs: 0.5, md: 1 },
                }}
              />
            </Box>
            <Typography
              sx={{
                fontWeight: 600,
                textAlign: "center",
                mx: 1,
              }}
            >
              {data.name}
            </Typography>
            <Link
              href={data.links.homepage[0]}
              rel="noopener"
              underline="none"
              variant="body1"
              target="_blank"
              sx={{
                pl: 6,
              }}
            >
              site
            </Link>
          </Box>
          <Divider
            sx={{
              my: 1,
            }}
          />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "100%", md: "40% 1fr" },
              border: "1px solid green",
            }}
          >
            <Box
              sx={{
                display: "flex",
                p: { xs: 4, md: 2 },
              }}
            >
              <Box width={1}>
                <Avatar
                  src={data.image.large}
                  sx={{
                    width: "60%",
                    height: "min-content",
                    mx: "auto",
                    my: 2,
                  }}
                  variant="square"
                />
                <Box
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {data.categories.map((elem, item) =>
                    item < 4 ? (
                      <Chip
                        key={item}
                        label={elem}
                        variant="filled"
                        sx={{
                          borderRadius: 2,
                          m: 0.5,
                        }}
                      />
                    ) : (
                      <></>
                    )
                  )}
                </Box>
                <Box
                  sx={{
                    px: 3,
                    pt: 2,
                  }}
                >
                  <ExpandMore
                    expand={expanded}
                    onClick={() => {
                      setExpanded(!expanded);
                    }}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {decodeHTMLEntities(data.description.en)}
                  </Collapse>
                </Box>
              </Box>
              <Divider
                sx={{
                  width: "1px",
                  display: { xs: "none", md: "block" },
                }}
                orientation="vertical"
              />
            </Box>
            <Box
              sx={{
                p: { xs: 0, md: 2 },
                border: "1px solid red",
              }}
            >
              Information:
              <TableContainer
                sx={{
                  border: "1px solid orange",
                }}
              >
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell align="right">
                        <Typography>Price:</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          sx={{
                            fontWeight: "600",
                          }}
                        >
                          {numberSpace(data.market_data.current_price.usd)} $
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell align="right">
                        <Typography>All Time High:</Typography>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "600",
                          }}
                        >
                          {numberSpace(data.market_data.ath.usd)} $
                        </Typography>
                        <Typography
                          sx={{
                            mx: 1,
                          }}
                        >
                          ({dateFormat(data.market_data.ath_date.usd)})
                        </Typography>
                        <Typography
                          color={
                            data.market_data.ath_change_percentage.usd >= 0
                              ? "#29cf45"
                              : "red"
                          }
                        >
                          {data.market_data.ath_change_percentage.usd > 0
                            ? "+" +
                              numberSpace(
                                data.market_data.ath_change_percentage.usd.toFixed(
                                  2
                                )
                              )
                            : numberSpace(
                                data.market_data.ath_change_percentage.usd.toFixed(
                                  2
                                )
                              )}
                          %
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell align="right">
                        <Typography>All Time Low:</Typography>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "600",
                          }}
                        >
                          {numberSpace(data.market_data.atl.usd)} $
                        </Typography>
                        <Typography
                          sx={{
                            mx: 1,
                          }}
                        >
                          ({dateFormat(data.market_data.atl_date.usd)})
                        </Typography>
                        <Typography
                          color={
                            data.market_data.atl_change_percentage.usd >= 0
                              ? "#29cf45"
                              : "red"
                          }
                        >
                          {data.market_data.atl_change_percentage.usd > 0
                            ? "+" +
                              numberSpace(
                                data.market_data.atl_change_percentage.usd.toFixed(
                                  2
                                )
                              )
                            : numberSpace(
                                data.market_data.atl_change_percentage.usd.toFixed(
                                  2
                                )
                              )}
                          %
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell align="right">
                        <Typography>Low - High 24h:</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          sx={{
                            fontWeight: "600",
                          }}
                        >
                          {" "}
                          {numberSpace(data.market_data.low_24h.usd)} $ -{" "}
                          {numberSpace(data.market_data.high_24h.usd)} $
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell align="right">
                        <Typography>Market Cap:</Typography>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "600",
                            mr: 1,
                          }}
                        >
                          {numberSpace(data.market_data.market_cap.usd)} $
                        </Typography>
                        <Typography
                          color={
                            data.market_data
                              .market_cap_change_percentage_24h_in_currency
                              .usd >= 0
                              ? "#29cf45"
                              : "red"
                          }
                        >
                          {data.market_data
                            .market_cap_change_percentage_24h_in_currency.usd >
                          0
                            ? "+" +
                              data.market_data.market_cap_change_percentage_24h_in_currency.usd.toFixed(
                                2
                              )
                            : data.market_data.market_cap_change_percentage_24h_in_currency.usd.toFixed(
                                2
                              )}
                          %
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell align="right">
                        <Typography>Total volume:</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          sx={{
                            fontWeight: "600",
                          }}
                        >
                          {numberSpace(data.market_data.total_volume.usd)} $
                        </Typography>
                      </TableCell>
                    </TableRow>

                    {data.genesis_date ? (<TableRow>
                      <TableCell align="right">
                        <Typography>Genesis Date:</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          sx={{
                            fontWeight: "600",
                          }}
                        >
                          {data.genesis_date.split("-").reverse().join(".")}
                        </Typography>
                      </TableCell>
                    </TableRow>) : (<></>)}
                    
                  </TableBody>
                </Table>
              </TableContainer>
              change:
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {shortDataTableHead}

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>{shortDataTableBody}</TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              change 7d:
              <Box
                sx={{
                  height: "300px",
                  width: 1,
                  p: 0,
                  border: '1px solid #515151',
                  borderRadius: 2,
                }}
              >
                <Chart id={data.id} img={data.image.thumb} />
              </Box>
            </Box>
          </Box>
        </Paper>
      ) : (
        <CircularProgress size="5rem" />
      )}
    </Box>
  );
}

//export default Coin;

function decodeHTMLEntities(str) {
  let textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  let textHTML = textarea.value;
  textHTML = textHTML.replace(/<.+>/g, "");
  return textHTML;
}



function dateFormat(str) {
  return str.replace(/T.+/, "").split("-").reverse().join(".");
}

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
    return ab[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ." + past;
  } else {
    return ab[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
}

