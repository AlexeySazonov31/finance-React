import React from "react";
import { ResponsiveLine } from "@nivo/line";

function chart({ data }) {
  console.log(data);
  return (
    <ResponsiveLine
        data={data}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        xScale={{ type: 'linear' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        colors={{ scheme: 'red_yellow_blue' }}
        pointSize={4}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor', modifiers: [] }}
        pointLabel="y"
        pointLabelYOffset={-12}
        enableArea={true}
        areaOpacity={0.1}
        crosshairType="cross"
        useMesh={true}
        legends={[]}
    />
  );
}

export default chart;
