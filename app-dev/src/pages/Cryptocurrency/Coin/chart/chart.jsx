//import { ResponsiveLine } from "@nivo/line";
import React from "react";
import { VictoryChart, VictoryArea, VictoryTheme, VictoryAxis } from "victory";
import { useEffect, useState } from "react";

import { useTheme } from "@mui/material/styles";

function Chart({ historyData }) {

  const theme = useTheme();
  
  const sharedAxisStyles = {
    axis: {
      stroke: "transparent",
    },
    tickLabels: {
      fill: theme.palette.mode === "dark" ? "#fff" : "#000",
      fontSize: 13,
    },
    axisLabel: {
      fill: "#ffffff",
      padding: 36,
      fontSize: 15,
      fontStyle: "italic",
    },
  };

  return historyData ? (
    <VictoryChart
      maxDomain={{ y: (formatData(historyData)).high }}
      minDomain={{ y: (formatData(historyData)).low }}
      padding={{ bottom: 10, right: 10, left: 50 }}
      width={450}
      height={200}
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
        data={(formatData(historyData)).data}
      />
    </VictoryChart>
  ) : (
    <></>
  );
}

export default Chart;

function formatData(data) {

  let arr7day = (data.prices.slice( (data.prices.length - 7) ));
  let arr = [];
  for (let i = 0; i <= arr7day.length - 1; i++) {
    let obj = {
      x: i,
      y: Number(arr7day[i][1].toFixed(4)),
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
  low = arr[0].y - x;

  high = arr[arr.length - 1].y + x;

  arr.sort((a, b) => parseFloat(a.x) - parseFloat(b.x));

  return {
    low: low,
    high: high,
    data: arr,
  };
}


