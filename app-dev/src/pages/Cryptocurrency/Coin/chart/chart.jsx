import React from "react";
//import { ResponsiveLine } from "@nivo/line";
import { VictoryChart, VictoryArea, VictoryTheme, VictoryAxis } from "victory";
import { useEffect, useState } from "react";

import { useTheme } from "@mui/material/styles";

<<<<<<< HEAD
function Chart({ id }) {
  const [data, setData] = useState([]);
=======
function Chart({ data }) {

  const SevendayData = data.slice(data.length - 7);
>>>>>>> 61e0f10 (detailed chart currecy)

  const theme = useTheme();

  console.log( theme.palette.mode );

<<<<<<< HEAD

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
    )
      .then((res) => res.json())
      .then((dt) => {
        setData(formatData(dt.prices));
        //console.log(dt.prices);
      });
  }, []);

=======
>>>>>>> 61e0f10 (detailed chart currecy)
  console.log(data);

  const sharedAxisStyles = {
    axis: {
      stroke: "transparent",
    },
    tickLabels: {
      fill: theme.palette.mode === "dark" ? "#fff" : "#000",
<<<<<<< HEAD
      fontSize: 14,
=======
      fontSize: 13,
>>>>>>> 61e0f10 (detailed chart currecy)
    },
    axisLabel: {
      fill: "#ffffff",
      padding: 36,
      fontSize: 15,
      fontStyle: "italic",
    },
  };

<<<<<<< HEAD
  return data ? (
    <VictoryChart
      maxDomain={{ y: data.high }}
      minDomain={{ y: data.low }}
      padding={{ bottom: 10, right: 10, left: 50 }}
      width={450}
=======
  return SevendayData ? (
    <VictoryChart
      maxDomain={{ y: (formatData(SevendayData)).high }}
      minDomain={{ y: (formatData(SevendayData)).low }}
      padding={{ bottom: 10, right: 10, left: 50 }}
      width={450}
      height={200}
>>>>>>> 61e0f10 (detailed chart currecy)

    >
      <VictoryAxis
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
            strokeWidth: 1.5,
          },
        }}
        theme={VictoryTheme.material}
<<<<<<< HEAD
        data={data.data}
=======
        data={(formatData(SevendayData)).data}
>>>>>>> 61e0f10 (detailed chart currecy)
      />
    </VictoryChart>
  ) : (
    <></>
  );
}

export default Chart;

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
<<<<<<< HEAD
  console.log(x);
=======
>>>>>>> 61e0f10 (detailed chart currecy)
  low = arr[0].y - x;

  high = arr[arr.length - 1].y + x;

  arr.sort((a, b) => parseFloat(a.x) - parseFloat(b.x));

  return {
    low: low,
    high: high,
    data: arr,
  };
}

/*


function formatData(data) {
  let arr = [];
  for (let i = 0; i <= data.length - 1; i++) {
    let obj = {
      x: i,
      y: [data[i][1],data[i][2],data[i][3],data[i][4]],
    };
    arr.push(obj);
  }

  return arr;
}




 (
    <ResponsiveLine

    data={data}
    margin={{ top: 50, right: 50, bottom: 50, left: 80 }}
    xScale={{ type: 'linear' }}
    xFormat=" >-c"
    yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 6,
        tickRotation: 90,
        legend: 'time',
        legendOffset: 30,
        legendPosition: 'middle'
    }}
    axisLeft={{
        orient: 'left',
        tickSize: 6,
        tickPadding: 4,
        tickRotation: 0,
        legend: 'price',
        legendOffset: -46,
        legendPosition: 'middle'
    }}
    enableGridX={false}
    enableGridY={false}
    enablePoints={false}
    pointSize={8}
    pointColor={{ from: 'color', modifiers: [] }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    enableArea={true}
    areaOpacity={0.15}
    debugSlices={true}
    crosshairType="x"
    useMesh={true}
    legends={[]}
    />
  );


 */