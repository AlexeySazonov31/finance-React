import React from "react";
import { ResponsiveLine } from "@nivo/line";
//import { VictoryChart, VictoryArea } from "victory";
import { useEffect, useState } from "react";

function Chart({ id, img }) {
  const [data, setData] = useState([]);

  console.log(getAverageRGB(img));

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

  console.log(data);

  return data ? (
    <ResponsiveLine
      data={data}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      xScale={{ type: "linear" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={null}
      enableGridX={false}
      enableGridY={false}
      enablePoints={false}
      pointSize={1}
      pointColor={{ from: "color", modifiers: [] }}
      pointBorderWidth={1}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableArea={true}
      areaOpacity={0.15}
      debugSlices={true}
      crosshairType="x"
      useMesh={true}
      legends={[]}
    />
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
      y: Number(data[i][1].toFixed()),
    };
    arr.push(obj);
  }

  return [
    {
      'id': 'bitcoin',
      'color': '#000',
      'data': arr,
    }
  ];
}


function getAverageRGB(imgEl) {

  var blockSize = 5, // only visit every 5 pixels
      defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
      canvas = document.createElement('canvas'),
      context = canvas.getContext && canvas.getContext('2d'),
      data, width, height,
      i = -4,
      length,
      rgb = {r:0,g:0,b:0},
      count = 0;

  if (!context) {
      return defaultRGB;
  }

  height = 100;
  width = 100;

  context.drawImage(imgEl, 0, 0);

  try {
      data = context.getImageData(0, 0, width, height);
  } catch(e) {
      /* security error, img on diff domain */
      return defaultRGB;
  }

  length = data.data.length;

  while ( (i += blockSize * 4) < length ) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i+1];
      rgb.b += data.data[i+2];
  }

  // ~~ used to floor values
  rgb.r = ~~(rgb.r/count);
  rgb.g = ~~(rgb.g/count);
  rgb.b = ~~(rgb.b/count);

  return rgb;

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
