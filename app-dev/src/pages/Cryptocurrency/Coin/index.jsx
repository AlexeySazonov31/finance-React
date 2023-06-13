import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Chart from "./chart/chart";
import Information from "./information/Information";
import TopCoins from "./topCoins/TopCoins";
import Chartdetailed from "./chartdetailed/Chartdetailed";


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
  Button,
  Modal
} from "@mui/material";


import IconButton, { IconButtonProps } from "@mui/material/IconButton";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

import { useTheme } from "@mui/material/styles";



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Coin({data,id, historyData}) {

  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const theme = useTheme();

  const [loading, setLoading] = useState(true);

  const [expanded, setExpanded] = useState(false);


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
      return  shortDataTableBody ? (
        <TableCell
          key={key}
          align="center"
          sx={{
            px: 1,
            mx: 0,
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
            }}
            color={elem >= 0 ? "#29cf45" : "red"}
          >
            {elem > 0 ? "+" + elem.toFixed(2) : elem.toFixed(2)}%
          </Typography>
        </TableCell>
      ) :(
        <></>
      );
    });

    let namesHead = ["1h", "24h", "7d", "14d", "30d", "60d", "200d", "1y"];
    shortDataTableHead = namesHead.map((elem, key) => {
      return (
        <TableCell
          align="center"
          key={key}
          sx={{
            px: 1,
            mx: 0,
          }}
        >
          <Typography>{elem}</Typography>
        </TableCell>
      );
    });
  } else {
    shortDataTableBody = <></>;
    shortDataTableHead = <></>;
  }
console.log(data)
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
      {data ? (
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
                fontSize: "16px",
              }}
              variant="overline"
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
                  variant="around"
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
                  <Button
                    variant="text"
                    sx={{
                      color: theme.palette.mode === "dark" ? "#fff" : "#000",
                      px: 2,
                      my: 1,
                    }}
                    startIcon={
                      <ExpandMore
                        expand={expanded}
                        aria-expanded={expanded}
                        aria-label="show more"
                        disableRipple
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    }
                    onClick={() => {
                      setExpanded(!expanded);
                    }}
                  >
                    DESCRIPTION
                  </Button>

                  <Collapse sx={{
                    position: 'absolute',
                    width: '800px',
                    backgroundColor: theme.palette.mode === "dark" ? '#313c42' : "#e1e5e5",
                    zIndex: 1,
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "0px 0px 17px 6px rgba(14, 18, 21, 0.2)",
                  }} in={expanded} timeout="auto" unmountOnExit>
                    {decodeHTMLEntities(data.description.en)}
                  </Collapse>
                </Box>

                <Box
                  sx={{
                    px: 3,
                    pt: 2,
                  }}
                >
                  <TopCoins id={data.id} />
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
              <Typography
                variant="overline"
                sx={{
                  pl: 4,
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                Information:
              </Typography>

              <Information data={data} />

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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    pl: 4,
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                >
                  change in 7 days:
                </Typography>
                <Button onClick={handleOpenModal}>More</Button>
                    <Chartdetailed open={open}  handleCloseModal={handleCloseModal} data={historyData}  />
              </Box>

              <Box
                sx={{
                  height: "350px",
                  width: 1,
                  border: "1px solid #515151",
                  borderRadius: 2,
                  my: 1,
                }}
              >
                <Chart historyData={historyData} />
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