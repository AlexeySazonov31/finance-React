import React, { useEffect } from "react";
import { useState } from "react";

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
  Grow,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Button,
  Icon
} from "@mui/material";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import { styled } from "@mui/material/styles";

import { useTheme } from "@mui/material/styles";
import TableChange from "./TableChange/TableChange";

export default function Coin({ data, id, historyData }) {

  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const theme = useTheme();

  const [loading, setLoading] = useState(true);

  const [expanded, setExpanded] = useState(false);

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
                      <ExpandMoreIcon />
                    }
                    onClick={() => {
                      setExpanded(!expanded);
                    }}
                  >
                    DESCRIPTION
                  </Button>

                  <Grow sx={{
                    position: 'absolute',
                    width: '800px',
                    backgroundColor: theme.palette.mode === "dark" ? '#313c42' : "#e1e5e5",
                    zIndex: 1,
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "0px 0px 17px 6px rgba(14, 18, 21, 0.2)",
                  }} in={expanded} >
                    <Box>
                      {decodeHTMLEntities(data.description.en)}
                    </Box>
                  </Grow>
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
              <Information data={data} />
              <TableChange data={data} />

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
                <Chartdetailed open={open} handleCloseModal={handleCloseModal} data={historyData} />
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