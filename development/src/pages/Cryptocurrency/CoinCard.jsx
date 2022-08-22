import React from "react";

import {
  Grid,
  Card,
  Box,
  Typography,
  CardMedia,
  CardActions,
  Link,
  Chip,
} from "@mui/material";

function CoinCard({ elem }) {
  return (
    <>
      <Grid
        item
        xs={9}
        sm={5}
        md={6}
        lg={4}
        xl={3}
        sx={{
          width: "fit-content",
        }}
      >
        <Card sx={{ px: 2, pt: 1, m: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: 'center'
              }}
            >
              <Chip label={elem.rank} variant="outlined" />

              <Typography sx={{
                fontWeight: 600,
              }}>{elem.name}</Typography>
              <Chip label={elem.symbol} variant="outlined" />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                my: 1,
              }}
            >
              <CardMedia
                component="img"
                image={elem.icon}
                alt="image"
                sx={{
                  borderRadius: 1,
                  width: "75px",
                  height: "75px",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "110px",
                  }}
                >
                  <Typography
                    color="text.secondary"
                    sx={{
                      width: "45px",
                      textAlign: "end",
                    }}
                  >
                    hour:
                  </Typography>
                  <Typography
                    color={elem.priceChange1h >= 0 ? "#29cf45" : "red"}
                  >
                    {elem.priceChange1h > 0
                      ? "+" + elem.priceChange1h
                      : elem.priceChange1h}
                    %
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "110px",
                  }}
                >
                  <Typography
                    color="text.secondary"
                    sx={{
                      width: "45px",
                      textAlign: "end",
                    }}
                  >
                    day:
                  </Typography>
                  <Typography
                    color={elem.priceChange1d >= 0 ? "#29cf45" : "red"}
                  >
                    {elem.priceChange1d > 0
                      ? "+" + elem.priceChange1d
                      : elem.priceChange1d}
                    %
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "110px",
                  }}
                >
                  <Typography
                    color="text.secondary"
                    sx={{
                      width: "45px",
                      textAlign: "end",
                    }}
                  >
                    week:
                  </Typography>
                  <Typography
                    color={elem.priceChange1w >= 0 ? "#29cf45" : "red"}
                  >
                    {elem.priceChange1w > 0
                      ? "+" + elem.priceChange1w
                      : elem.priceChange1w}
                    %
                  </Typography>
                </Box>
              </Box>
            </Box>

            <CardActions
              sx={{
                displat: "flex",
                justifyContent: "space-between",
              }}
            >
              {numberSpace(elem.price.toFixed(2))} $
              <Link
                href={elem.websiteUrl}
                rel="noopener"
                underline="none"
                variant="body1"
                target="_blank"
              >
                site
              </Link>
            </CardActions>
          </Box>
        </Card>
      </Grid>
    </>
  );
}

export default CoinCard;


function numberSpace(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
} 