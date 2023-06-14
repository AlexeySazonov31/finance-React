import React from "react";

import Chart from "./chart/chart";
import Information from "./information/Information";
import TopCoins from "./topCoins/TopCoins";
import TableChange from "./TableChange/TableChange";
import DescriptionCoin from "./DescriptionCoin/DescriptionCoin";

import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Chip,
  Divider,
  Link,
  Avatar
} from "@mui/material";

export default function Coin({ data, historyData }) {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: data ? "start" : "center",
        minHeight: data ? "auto" : "93vh",
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
          {/* Start Header Coin Page */}
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
          {/* End Header Coin Page */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "100%", md: "40% 1fr" },
              border: "1px solid green",
            }}
          >
          {/* start Left Side of Page */}
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

                <DescriptionCoin data={data} />
                <TopCoins id={data.id} />

              </Box>
              <Divider
                sx={{
                  width: "1px",
                  display: { xs: "none", md: "block" },
                }}
                orientation="vertical"
              />
            </Box>
            {/* end Left Side of Page */}
            {/* start Right Side of Page */}
            <Box
              sx={{
                p: { xs: 0, md: 2 },
                border: "1px solid red",
              }}
            >
              <Information data={data} />
              <TableChange data={data} />
              <Chart historyData={historyData}/>
            </Box>
            {/* end Right Side of Page */}
          </Box>
        </Paper>
      ) : (
        <CircularProgress size="5rem" />
      )}
    </Box>
  );
}