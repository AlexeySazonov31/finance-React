import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import TextField from "@mui/material/TextField";

import CoinCard from "./CoinCard";
import TableCoins from "./TableCoins";

import {
  Card,
  Grid,
  Paper,
  Divider,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Button,
} from "@mui/material";

import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";

function Сryptocurrency() {
  const [dataCoins, setDataCoins] = useState(null);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [viewCoins, setViewCoins] = useState("table");

  const [sorting, setSorting] = useState({ name: "", reverse: false });

  useEffect(() => {
    fetch(
      "https://api.coinstats.app/public/v1/coins?skip=0&limit=100&currency=USD"
    )
      .then((res) => res.json())
      .then((data) => {
        setDataCoins(data.coins.length > 30 ? data.coins : null);
        setLoading(true);
      });
  }, []);

  useEffect(() => {
    setLoading(false);
    let controller = new AbortController();

    if (search.length >= 1) {
      fetch(`https://api.coinpaprika.com/v1/search/?q=${search}&limit=100`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.currencies.length) {
            let arr = [];
            for (let el of data.currencies) {
              arr.push(
                fetch(
                  `https://api.coinstats.app/public/v1/coins/${el.id.replace(
                    /[a-z]+-/,
                    ""
                  )}?currency=USD`
                )
              );
            }

            Promise.all(arr)
              .then((responses) => Promise.all(responses.map((r) => r.json())))
              .then((coinsData) => {
                let arr = [];
                for (let coin of coinsData) {
                  if (coin.coin) {
                    arr.push(coin.coin);
                  }
                }
                if (search) {
                  setDataCoins(arr.length ? arr : null);
                }
                setLoading(true);
              });
          } else {
            setDataCoins(null);
            setLoading(true);
          }

          controller = null;
        });
    } else {
      fetch(
        "https://api.coinstats.app/public/v1/coins?skip=0&limit=100&currency=USD",
        { signal: controller.signal }
      )
        .then((res) => res.json())
        .then((data) => {
          setDataCoins(data.coins.length > 30 ? data.coins : null);
          setLoading(true);
          controller = null;
        });
    }

    return () => controller?.abort();
  }, [search]);

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const changeSorting = (event) => {
    if (event.target.name === "name") {
      if( event.target.value === "" ){
        setSorting({name: '', reverse: false});
      } else {
        setSorting({ ...sorting, [event.target.name]: event.target.value });
      }
    } else {
      setSorting({ ...sorting, reverse: !sorting.reverse });
    }
  };

  const changeViewCoins = (event) => {
    setViewCoins(event.target.value);
  }

  let finishData;
  if( sorting.name === '' ){
    if( dataCoins ) finishData = dataCoins.sort(sort_by("rank", false));
  } else {
    finishData = dataCoins.sort(sort_by(sorting.name, sorting.reverse));
  }


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "1",
        px: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5},
      }}
    >

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: 1,
        }}
      >
        <Box
          sx={{
            padding: 1,
            px: 0,
            mx: "auto",
            height: "fit-content",
            position: { xs: "block", md: "sticky" },
            top: { xs: "0", sm: "80px" },
            width: "auto",
          }}
        >
          <Paper
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ToggleButtonGroup
              value={viewCoins}
              exclusive
              onChange={changeViewCoins}
              color="primary"
              fullWidth={true}
              sx={{
                my: 0,
              }}
            >
              <ToggleButton value="table">Table</ToggleButton>
              <ToggleButton value="grid">Grid</ToggleButton>
            </ToggleButtonGroup>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: 1,
                mt: 1
              }}
            >
              <FormControl sx={{ width: 1 }} size="small">
                <InputLabel id="demo-select-small">sorting</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  name="name"
                  defaultValue=""
                  value={sorting.name}
                  label="Age"
                  onChange={changeSorting}
                >
                  <MenuItem value="">none</MenuItem>
                  <MenuItem value="rank">rank</MenuItem>
                  <MenuItem value="price">price</MenuItem>
                  <MenuItem value="priceChange1h">hour</MenuItem>
                  <MenuItem value="priceChange1d">day</MenuItem>
                  <MenuItem value="priceChange1w">week</MenuItem>
                </Select>
              </FormControl>

              <IconButton
                disabled={sorting.name === "" ? true : false}
                onClick={changeSorting}
                variant="outlined"
              >
                {sorting.reverse ? <SouthIcon /> : <NorthIcon />}
              </IconButton>
            </Box>

            </Paper>

            <Divider/>

            <Paper
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >




            <TextField
              id="demo-helper-text-misaligned-no-helper"
              label="search coin"
              value={search}
              onChange={handleChangeSearch}
              sx={{
                width: 1,
              }}
            />
          </Paper>

        </Box>

        <Box
          sx={{
            width: "1",
            display: "flex",
            justifyContent: "center",
            minHeight: "93vh",
            alignItems: loading ? "start" : "center",
          }}
        >
          {!loading ? (
            <CircularProgress size="5rem" />
          ) : finishData ? (
            viewCoins === "grid" ? (
              <Grid
                container
                sx={{
                  justifyContent: "center",
                  mx: { xs: 0, sm: 2, md: 2, lg: 3, xl: 10 },

                }}
              >
                {finishData.map((elem) => (
                  <CoinCard elem={elem} key={elem.id} />
                ))}
              </Grid>
            ) : (
              <TableCoins rows={finishData} sorting={sorting} changeSorting={changeSorting} />
            )
          ) : (
            <Card sx={{ px: 3, py: 2, m: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6">
                  Sorry. According to your request{" "}
                  <strong>
                    <u>{search}</u>
                  </strong>{" "}
                  nothing was found.
                </Typography>
                <Divider />

                <Typography variant="h6">
                  Try searching for a different name
                </Typography>
              </Box>
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Сryptocurrency;

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

/*



          {!loading ? (
            <CircularProgress size="5rem" />
          ) : search ? (
            dataSearch ? (
              viewCoins === "grid" ? (
                <Grid
                  container
                  sx={{
                    border: "1px solid green",
                    justifyContent: "center",
                    p: { xs: 0, md: 2 },
                  }}
                >
                  {dataSearch.map((elem) => (
                    <CoinCard elem={elem} key={elem.id} />
                  ))}
                </Grid>
              ) : (
                <TableCoins data={dataSearch} />
              )
            ) : (
              <Card sx={{ px: 3, py: 2, m: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h6">
                    Sorry. According to your request{" "}
                    <strong>
                      <u>{search}</u>
                    </strong>{" "}
                    nothing was found.
                  </Typography>
                  <Divider />

                  <Typography variant="h6">
                    Try searching for a different name
                  </Typography>
                </Box>
              </Card>
            )
          ) : viewCoins === "grid" ? (
            <Grid
              container
              sx={{
                border: "1px solid green",
                justifyContent: "center",
                p: { xs: 0, md: 2 },
              }}
            >
              {dataCoins.map((elem) => (
                <CoinCard elem={elem} key={elem.id} />
              ))}
            </Grid>
          ) : (
            <TableCoins rows={dataCoins} />
          )}


*/
