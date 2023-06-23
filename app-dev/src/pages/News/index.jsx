import { useEffect, useState } from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Grid from "@mui/material/Grid";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Link from "@mui/material/Link";

const sourcesCategorys = [
  {
    id: "finance",
    url: "https://api.coinstats.app/public/v1/news/", /// add  '?skip=0&limit=20'
    categorys: ["trending", "latest", "bullish", "bearish"],
  }
];
function Home() {
  const [source, setSource] = useState("finance");
  const [category, setCategory] = useState("trending");
  const [loading, setLoading] = useState("false");
  const [data, setData] = useState(false);

  const handleSource = (event, newSource) => {
    setSource(newSource);
    setCategory(
      newSource === "finance"
        ? sourcesCategorys[0].categorys[0]
        : sourcesCategorys[1].categorys[0]
    );
  };

  const handleCategory = (event, newCategory) => {
    setCategory(
      typeof newCategory === "string" ? newCategory : newCategory.props.value
    );
  };

  let buttonsFilter = sourcesCategorys[
    source === "finance" ? 0 : 1
  ].categorys.map((name, item) => {
    return (
      <ToggleButton key={item} value={name}>
        {name}
      </ToggleButton>
    );
  });

  useEffect(() => {
    setLoading(true);
    fetch(
      sourcesCategorys[source === "finance" ? 0 : 1].url +
        category +
        (source === "finance" ? "?skip=0&limit=20" : "")
    )
      .then((res) => res.json())
      .then((dt) => {
        if (source === "finance") {
          setData(dt.news.length ? dt.news : []);
        } else {
          setData(dt.success ? dt.data : []);
        }
        setLoading(false);
      });
  }, [category, source]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: 1,
        minHeight: "93vh",
        px: { xs: 1, sm: 2, md: 3, lg: 4, xl: 4 },
      }}
    >
      <Box
        sx={{
          borderRadius: 3,
          mx: "auto",
          height: "fit-content",
          position: { xs: "block", md: "sticky" },
          top: { xs: "0", sm: "90px" },
          my: 1,
        }}
      >
        <Paper
          sx={{
            padding: 2,
            display: "flex",
            justifyContent: "center"
          }}
        >
          <ToggleButtonGroup
            value={source}
            exclusive
            onChange={handleSource}
            color="primary"
          >
            <ToggleButton value="finance">finance</ToggleButton>
          </ToggleButtonGroup>
        </Paper>
        <Divider />
        <Paper
          sx={{
            padding: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ToggleButtonGroup
            value={category}
            exclusive
            onChange={handleCategory}
            color="primary"
            orientation="vertical"
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            {buttonsFilter}
          </ToggleButtonGroup>

          <FormControl
            fullWidth
            sx={{
              display: { sx: "block", md: "none" },
            }}
          >
            <InputLabel>Category</InputLabel>
            <Select value={category} label="Category" onChange={handleCategory}>
              {sourcesCategorys[source === "finance" ? 0 : 1].categorys.map(
                (name, item) => (
                  <MenuItem key={item} value={name}>
                    {name}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Paper>
      </Box>

      {loading ? (
        <Box
          sx={{
            width: "1",
            display: "flex",
            justifyContent: "center",
            my: "auto",
          }}
        >
          <CircularProgress size="5rem" />
        </Box>
      ) : (
        <Grid
          container
          sx={{
            width: {xs: 1, md: 0.8},
            my: 1,
            mx: 'auto',
            px: { xs: 1, sm: 3 },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.map((elem, itemG) => (
            <Grid
              item
              key={itemG}
              xs={12}
              sm={12}
              md={itemG % 3 !== 0 ? 6 : 12}
              lg={itemG % 3 === 0 ? 4 : 8}
              sx={{
                p: 2,
                pt:0,
              }}
            >
              <Card sx={{ px: 1 }}>
                <CardHeader
                  title={elem.title}
                  subheader={elem.author ? elem.author : elem.source}
                />
                <CardMedia
                  component="img"
                  image={
                    elem.imageUrl
                      ? elem.imageUrl
                      : /redd/.test(elem.imgURL)
                      ? `https://via.placeholder.com/300x430.png?text=${elem.title}`
                      : elem.imgURL
                  }
                  alt="image"
                  sx={{
                    borderRadius: 1,
                    height: {
                      xs: "250px",
                      md: itemG % 3 !== 0 ? "200px" : "300px",
                      lg: itemG % 3 === 0 ? "250px" : "370px",
                    },
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "500",
                    }}
                    paragraph={true}
                  >
                    {elem.content
                      ? decodeHTMLEntities(elem.content)
                      : decodeHTMLEntities(elem.description)}
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  {elem.date ? elem.date : dateFormat(elem.feedDate)}
                  <Link
                    href={elem.readMoreUrl ? elem.readMoreUrl : elem.link}
                    rel="noopener"
                    underline="none"
                    variant="body2"
                    target="_blank"
                  >
                    READ MORE
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Home;

function dateFormat(timestamp) {
  const months = [
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date(timestamp);
  return (
    date.getDate() +
    " " +
    months[date.getMonth()] +
    " " +
    date.getFullYear() +
    ", " +
    days[date.getDay()]
  );
}

  function decodeHTMLEntities(str) {
      let textarea = document.createElement("textarea");
      textarea.innerHTML = str;
      let textHTML = textarea.value;
      textHTML = textHTML.replace( /<.+>/g, '' );
      return textHTML;

  }

