import React, {useState} from "react";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryZoomContainer, VictoryBrushContainer } from "victory";

import {
  Box,
  Typography,
  Modal,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

function Chartdetailed({ open, handleCloseModal, data, high, low }) {

  const [zoomDomain, handleZoom] = useState({ x: [(new Date()).setDate((new Date()).getDate() - 60), new Date()] });

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

  return data ? (
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
        width: { xs: "95vw", sm: "55vw" },
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        color: theme.palette.mode === "dark" ? "#fff" : "#000",
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        History Chart
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        You can use scrolling with the mouse or two fingers to move through the charts.
        </Typography>

        <VictoryChart
          height={300}
          width={600}
          scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={zoomDomain}
              onZoomDomainChange={handleZoom}
            />
          }
          maxDomain={{ y: high }}
          minDomain={{ y: low }}
          color="#fff"

        >
          <VictoryAxis style={{
              ...sharedAxisStyles,
            }} />
          <VictoryAxis dependentAxis style={{
              ...sharedAxisStyles,
              grid: {
                fill: "#fff",
                stroke: theme.palette.mode === "dark" ? "#666" : "#000",
                pointerEvents: "painted",
                strokeWidth: 0.5,
              },
            }}/>
          <VictoryLine
            data={formatDataObj(data.prices)}
            x="a"
            y="b"

            style={{
              data: {
                stroke: theme.palette.mode === "dark" ? "#7BADD4" : "#7BADD4",
                strokeWidth: 1,
                tickLabels: "#555",
              },
              parent: { border: "1px solid #ccc" }

            }}

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
            style={{
              ...sharedAxisStyles,
              grid: {
                fill: "#fff",
                stroke: theme.palette.mode === "dark" ? "#666" : "#000",
                pointerEvents: "painted",
                strokeWidth: 0.5,
              },
            }}
          />
          <VictoryLine
            style={{
              data: {
                stroke: theme.palette.mode === "dark" ? "#7BADD4" : "#7BADD4",
                strokeWidth: 1,

              }
            }}
            data={formatDataObj(data.prices)}
            x="a"
            y="b"

          />
        </VictoryChart>
      </Box>
    </Modal>
  ) : (
    <></>
  );
}

export default Chartdetailed;

function formatDataObj(data) {
  return data.map((elem) => {
    return {a: new Date(elem[0]), b: elem[1]};
  });
}