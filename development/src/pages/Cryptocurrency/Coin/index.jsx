import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Chart from './chart/chart';

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
              }}
            >
              Information:
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell align="right">Price:</TableCell>
                      <TableCell align="left">
                        {data.market_data.current_price.usd} $
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell align="right">ath:</TableCell>
                      <TableCell align="left">
                        {data.market_data.ath.usd} ${" "}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right">ath:</TableCell>
                      <TableCell align="left">
                        {data.market_data.ath_date.usd} ${" "}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right">ath:</TableCell>
                      <TableCell align="left">
                        {data.market_data.ath_change_percentage.usd}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell align="right">atl:</TableCell>
                      <TableCell align="left">
                        {data.market_data.atl.usd} ${" "}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right">atl:</TableCell>
                      <TableCell align="left">
                        {data.market_data.atl_date.usd} ${" "}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right">atl:</TableCell>
                      <TableCell align="left">
                        {data.market_data.atl_change_percentage.usd}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell align="right">high_24h:</TableCell>
                      <TableCell align="left">
                        {data.market_data.high_24h.usd} ${" "}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right">low_24h:</TableCell>
                      <TableCell align="left">
                        {data.market_data.low_24h.usd}{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right">
                        price_change_24h_In_Cur:
                      </TableCell>
                      <TableCell align="left">
                        {data.market_data.price_change_24h_in_currency.usd} ${" "}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell align="right">market_cap:</TableCell>
                      <TableCell align="left">
                        {data.market_data.market_cap.usd}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell align="right">
                        market_cap_change_percentage_24h:
                      </TableCell>
                      <TableCell align="left">
                        {
                          data.market_data
                            .market_cap_change_percentage_24h_in_currency.usd
                        }{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell align="right">total_volume:</TableCell>
                      <TableCell align="left">
                        {data.market_data.total_volume.usd}${" "}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell align="right">genesis_date:</TableCell>
                      <TableCell align="left">{data.genesis_date} </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              change:
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>1h</TableCell>
                      <TableCell>24h</TableCell>
                      <TableCell>7d</TableCell>
                      <TableCell>14d</TableCell>
                      <TableCell>30d</TableCell>
                      <TableCell>60d</TableCell>
                      <TableCell>200d</TableCell>
                      <TableCell>1y</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        {
                          data.market_data
                            .price_change_percentage_1h_in_currency.usd
                        }
                      </TableCell>
                      <TableCell>
                        {
                          data.market_data
                            .price_change_percentage_24h_in_currency.usd
                        }
                      </TableCell>
                      <TableCell>
                        {
                          data.market_data
                            .price_change_percentage_7d_in_currency.usd
                        }
                      </TableCell>
                      <TableCell>
                        {
                          data.market_data
                            .price_change_percentage_14d_in_currency.usd
                        }
                      </TableCell>
                      <TableCell>
                        {
                          data.market_data
                            .price_change_percentage_30d_in_currency.usd
                        }
                      </TableCell>
                      <TableCell>
                        {
                          data.market_data
                            .price_change_percentage_60d_in_currency.usd
                        }
                      </TableCell>
                      <TableCell>
                        {
                          data.market_data
                            .price_change_percentage_200d_in_currency.usd
                        }
                      </TableCell>
                      <TableCell>
                        {
                          data.market_data
                            .price_change_percentage_1y_in_currency.usd
                        }
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              change 7d:
              <Box sx={{
                  height: '300px',
              }}>
                  <Chart data={formatData(data.market_data.sparkline_7d.price)}/>
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

function formatData(data){
  let arr = [];
  for( let i = 0; i <= data.length-1; i++ ){
    let obj = {
      "x": i,
      "y": data[i],
    }
    arr.push(obj);
  }

  return [
    {
      "id": "price",
      "color": "hsl(13, 70%, 50%)",
      "data": arr
    },
  ];
}


let data7d = [
  22338.565597628796, 22235.574210864193, 22190.42166932646, 22265.723213702437,
  22214.487822144336, 22300.27911757367, 22407.93267365611, 22342.923778351127,
  22297.66235249094, 22219.09848587256, 22402.410013204157, 22534.613722181795,
  22526.940733015006, 21610.403193894967, 21316.01584556709, 21067.366531481257,
  20864.167327350406, 20773.20359265033, 20792.143445211783, 20253.46331014825,
  20276.183451100984, 20310.327147269836, 20100.219821471135,
  20187.072462934208, 20177.75073928847, 20162.35057392865, 20287.31226460833,
  20408.345336243998, 20318.191607406225, 20402.59129743194, 20356.429714772552,
  20243.112738977485, 20241.214741450378, 20348.20895111923, 20340.24401174397,
  20365.218144424485, 20237.460871526488, 20306.07122707456, 20277.02405432857,
  20267.256875956005, 20186.28417893739, 20193.633348638894, 20176.33596773749,
  19850.47671454887, 19989.25525850508, 19970.81845984509, 20195.581020961064,
  20296.65495045268, 20238.823171784203, 20181.80356858929, 20134.08277349681,
  20072.48165582401, 20017.664914669414, 20045.211071435988, 20148.041524590546,
  20146.097364100835, 20201.584840640535, 20113.609050222913,
  20161.732728077364, 20149.18452880627, 20155.311342943103, 20140.133395759807,
  20141.220149276945, 19783.354195681368, 19754.33385904475, 19844.632582109185,
  19838.928066992314, 19763.104363642375, 19812.055579381802,
  19797.074799868453, 19832.497920528807, 19744.308143002712,
  19706.118843195443, 19728.94730794866, 19765.21646958178, 19756.195555340742,
  19764.125975662202, 19849.081779689204, 19763.091636917074, 19786.99450055538,
  19742.905696891135, 19686.96215607134, 19780.29867162903, 19834.56500378783,
  19877.977087031624, 19694.477379430067, 19532.43085061006, 19707.810609616103,
  19650.750212138188, 19542.14533961992, 19473.36978414912, 19562.248114515758,
  19647.431972036582, 19757.443997676535, 19776.587501387727,
  19740.612796398564, 19764.411712043777, 19954.754563059774,
  19999.640271216682, 19891.38281027494, 19901.610323118253, 19943.73444776567,
  19856.664922236272, 19839.890073082697, 19852.282855587484,
  19892.709655035913, 19877.229460555158, 19862.843065369456,
  19823.114380540428, 19856.471086066922, 19895.033431323864,
  19906.915074798828, 19969.98691392883, 20110.66411879399, 20084.29944050228,
  20096.354423018503, 20022.176689452004, 20083.48379465311, 20060.921344057486,
  20128.716177152077, 20129.877778640617, 20002.68000456196, 20006.617231646207,
  20041.15817273507, 20002.09931352539, 20011.24210933423, 20077.123367389915,
  20045.4454780591, 20058.017177043836, 20050.15629247851, 19988.5099150583,
  19955.41268796204, 19929.694935236184, 20009.966350515646, 19975.540601917564,
  19798.739202065623, 19838.681855106406, 19797.43679527315, 19693.041455432674,
  19674.818580605563, 19738.324136879353, 19734.715040825704,
  19528.583240156255, 19422.59394859203, 19440.93216955394, 19459.41623477264,
  19458.652556832738, 18746.92089683798, 18776.330377164395, 18813.965253933402,
  18755.931673391373, 18492.623682283283, 18474.1066619127, 18471.224601532595,
  18479.50337751628, 18704.88170580541, 18721.995366741372, 18828.439331054396,
  19165.81135271528, 19344.40433592218, 19045.042462354908, 19218.495786143714,
  18980.91406443351, 19101.611719444067, 19496.140995678343, 19549.679390282075,
  19549.62267526214, 19610.73981971188,
];
