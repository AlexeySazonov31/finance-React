import React from "react";
//import { ResponsiveLine } from "@nivo/line";
import { VictoryChart, VictoryArea, VictoryTheme, VictoryLine, VictoryAxis, VictoryZoomContainer, VictoryBrushContainer } from "victory";
import { useEffect, useState } from "react";

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
  Modal,
  Slider
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 10;


<<<<<<< HEAD
function Chartdetailed({ id, open, handleCloseModal }) {

  const [data, setData] = useState([]);
=======
function Chartdetailed({ datah, open, handleCloseModal }) {
>>>>>>> 61e0f10 (detailed chart currecy)

  const [zoomDomain, handleZoom] = useState({ x: [new Date(1990, 1, 1), new Date(2009, 1, 1)] });

  const theme = useTheme();

<<<<<<< HEAD
  console.log(theme.palette.mode);

  console.log(id)


  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=max`
    )
      .then((res) => res.json())
      .then((dt) => {
        setData(dt.prices);
        //console.log(dt.prices);
      });
  }, []);

  console.log(data);
=======
>>>>>>> 61e0f10 (detailed chart currecy)

  const sharedAxisStyles = {
    axis: {
      stroke: "transparent",
    },
    tickLabels: {
      fill: theme.palette.mode === "dark" ? "#fff" : "#000",
      fontSize: 9,
    },
    axisLabel: {
      fill: "#ffffff",
      padding: 36,
      fontSize: 15,
      fontStyle: "italic",
    },
  };

  // -----

  const [value2, setValue2] = React.useState([20, 37]);

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };

  // -----

<<<<<<< HEAD
  return data ? (
=======
  return datah ? (
>>>>>>> 61e0f10 (detailed chart currecy)
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "80%",
        // height: "95%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        color: theme.palette.mode === "dark" ? "#fff" : "#000",
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Hard Chart
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Please use slider below
        </Typography>

        <VictoryChart
          height={200}
          width={450}
          scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={zoomDomain}
              onZoomDomainChange={handleZoom}
            />
          }
<<<<<<< HEAD
          maxDomain={{ y: (formatData(data)).high }}
          minDomain={{ y: (formatData(data)).low }}
=======
          maxDomain={{ y: (formatData(datah)).high }}
          minDomain={{ y: (formatData(datah)).low }}
>>>>>>> 61e0f10 (detailed chart currecy)

        >
          <VictoryLine
            style={{
              data: { stroke: "tomato" }
            }}
<<<<<<< HEAD
            data={formatData1(data)}
=======
            data={formatData1(datah)}
>>>>>>> 61e0f10 (detailed chart currecy)
            x="a"
            y="b"

          />
        </VictoryChart>
        <VictoryChart
          padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
          width={600} height={100} scale={{ x: "time" }}
          containerComponent={
            <VictoryBrushContainer
              brushDimension="x"
              brushDomain={zoomDomain}
              onBrushDomainChange={handleZoom}
            />
          }
        >
          <VictoryAxis
            tickFormat={(x) => new Date(x).getFullYear()}

          />
          <VictoryLine
            style={{
              data: { stroke: "tomato" }
            }}
<<<<<<< HEAD
            data={formatData2(data)}
=======
            data={formatData2(datah)}
>>>>>>> 61e0f10 (detailed chart currecy)
            x="key"
            y="b"

          />
<<<<<<< HEAD
          {/* <VictoryAxis
        style={{
          ...sharedAxisStyles,
          grid: {
            fill: "#fff",
            stroke: theme.palette.mode === "dark" ? "#666" : "#000",
            pointerEvents: "painted",
            strokeWidth: 0.5,
          },
        }}
        dependentAxis
      />

      <VictoryArea
        style={{
          data: {
            fill: theme.palette.mode === "dark" ? "#1f292e" : "#D0DEE5",
            fillOpacity: 0.8,
            stroke: "#7bacd4",
            strokeWidth: 0.5,
          },
        }}
        theme={VictoryTheme.material}
        data={data.data}
      />*/}
=======
>>>>>>> 61e0f10 (detailed chart currecy)
        </VictoryChart>

        <Slider
          getAriaLabel={() => 'Minimum distance shift'}
          value={value2}
          onChange={handleChange2}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
        />
      </Box>
    </Modal>


  ) : (
    <></>
  );
}

export default Chartdetailed;

function formatData1(data) {
  let newData = [];
  for (let elem of data) {
    newData.push({ a: new Date(elem[0]), b: elem[1] });
  }
  return newData;
}
function formatData2(data) {
  let newData = [];
  for (let elem of data) {
    newData.push({ key: new Date(elem[0]), b: elem[1] });
  }
  return newData;
}

function formatData(data) {
  let arr = [];
  for (let i = 0; i <= data.length - 1; i++) {
    let obj = {
      x: i,
      y: Number(data[i][1].toFixed(4)),
    };
    arr.push(obj);
  }
  let low, high;

  arr.sort((a, b) => parseFloat(a.y) - parseFloat(b.y));

  let x = 0;
  if (arr[0].y >= 0 && arr[0].y < 1) {
    //
    x = 0.01;
  } else if (arr[0].y >= 1 && arr[0].y < 5) {
    //
    x = 0.5;
  } else if (arr[0].y >= 5 && arr[0].y < 10) {
    //
    x = 0.8;
  } else if (arr[0].y >= 10 && arr[0].y < 30) {
    //
    x = 3;
  } else if (arr[0].y >= 30 && arr[0].y < 100) {
    //
    x = 5;
  } else if (arr[0].y >= 100 && arr[0].y < 1000) {
    //
    x = 10;
  } else if (arr[0].y >= 1000 && arr[0].y < 5000) {
    //
    x = 50;
  } else if (arr[0].y >= 5000) {
    //
    x = 500;
  }
  console.log(x);
  low = arr[0].y - x;

  high = arr[arr.length - 1].y + x;

  arr.sort((a, b) => parseFloat(a.x) - parseFloat(b.x));

  console.log({
    low: low,
    high: high,
    data: arr,
  });

  return {
    low: low,
    high: high,
    data: arr,
  };
<<<<<<< HEAD
}
=======
}
>>>>>>> 61e0f10 (detailed chart currecy)
