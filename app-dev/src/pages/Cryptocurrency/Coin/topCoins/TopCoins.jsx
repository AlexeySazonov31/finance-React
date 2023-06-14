import React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Chip,
  Avatar
} from "@mui/material";

function TopCoins({ id }) {
  const [data, setData] = useState(null);

  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/search/trending")
      .then((res) => res.json())
      .then((data) => {
        setData(data.coins);
      });
  }, []);

  let result = <></>;
  if (data) {
    result = data.map((elem, key) => {
      if (elem.item.id !== id && key <= 4) {
        return (
          <Box
            key={key}
            sx={{
              width: 1,
              p: 2,
              my: 1,
              border: "1px solid #515151",
              borderRadius: 2,
              display: "grid",
              gridTemplateColumns: '1fr 60%',
              "&:hover": {
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0px 0px 17px 6px rgba(14, 18, 21, 0.3)"
                    : "0px 0px 17px 6px rgba(182, 182, 182, 0.3)",
                WebkitBoxShadow:
                  theme.palette.mode === "dark"
                    ? "0px 0px 17px 6px rgba(14, 18, 21, 0.3)"
                    : "0px 0px 17px 6px rgba(182, 182, 182, 0.3)",
                MozBoxShadow:
                  theme.palette.mode === "dark"
                    ? "0px 0px 17px 6px rgba(14, 18, 21, 0.3)"
                    : "0px 0px 17px 6px rgba(182, 182, 182, 0.3)",
              },
              transition: '0.2s',
            }}

            onClick={ () => {
                navigate(`/crypto/${elem.item.id}`);
              } }
          >
            <Avatar
              src={elem.item.small}
              sx={{
                width: "60px",
                height: "min-content",
                my: 0,
                mx: 4
              }}
              variant="around"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{
                mx: 'auto'
              }}>
                <Chip
                  sx={{
                    width: "fit-content",
                  }}
                  label={elem.item.market_cap_rank}
                  variant="outlined"
                  key="1"
                />
                <Chip
                  label={elem.item.symbol}
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    ml: { xs: 0.5, md: 1 },
                  }}
                  key="2"
                />
              </Box>

              <Typography align="center" variant="overline">
                {elem.item.name}
              </Typography>
            </Box>
          </Box>
        );
      }
    });
  }

  return data ? (
    <Box
    sx={{
      px: 3,
      pt: 2,
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {result}
    </Box>
    </Box>
  ) : (
    <></>
  );
}

export default TopCoins;
