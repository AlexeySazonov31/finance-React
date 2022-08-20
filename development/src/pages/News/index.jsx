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
  },
  {
    id: "global",
    url: "https://inshorts.deta.dev/news?category=",
    categorys: [
      "business",
      "sports",
      "world",
      "technology",
      "startup",
      "entertainment",
      "science",
      "automobile",
    ],
  },
];
function Home() {
  const [source, setSource] = useState("global");
  const [category, setCategory] = useState("world");
  const [loading, setLoading] = useState("false");
  const [data, setData] = useState(false);
  console.log(data);

  console.log(category);
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
        console.log(dt);
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
        flexDirection: { xs: "column", sm: "row" },
        width: "1",
        minHeight: "93vh",
      }}
    >
      <Box
        sx={{
          padding: 3,
          borderRadius: 3,
          mx: "auto",
          height: "fit-content",
          position: { xs: "block", sm: "sticky" },
          top: { xs: "0", sm: "60px" },
        }}
      >
        <Paper
          sx={{
            padding: 2,
          }}
        >
          <ToggleButtonGroup
            value={source}
            exclusive
            onChange={handleSource}
            color="primary"
          >
            <ToggleButton value="finance">finance</ToggleButton>
            <ToggleButton value="global">global</ToggleButton>
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
              display: { xs: "none", sm: "flex" },
            }}
          >
            {buttonsFilter}
          </ToggleButtonGroup>

          <FormControl
            fullWidth
            sx={{
              display: { sx: "block", sm: "none" },
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

      <Box
        sx={{
          width: "1",
          display: "flex",
          justifyContent: "center",
          my: "auto",
        }}
      >
        {loading ? (
          <CircularProgress size="5rem" />
        ) : (
          <Grid
            container
            spacing={2}
            sx={{ px: {xs: 1, sm: 3},py: {xs: 0, sm: 2}, justifyContent: "center", alignItems: "center" }}
          >
            {data.map((elem, itemG) => (
              <Grid
                item
                key={itemG}
                xs={12}
                sm={12}
                md={itemG % 3 !== 0 ? "6" : "12"}
                lg={itemG % 3 === 0 ? "4" : "8"}
              >
                <Card sx={{ px: 1, my: 1, mx: { xs: 0, sm: 0, md: 1 } }}>
                  <CardHeader
                    title={elem.title}
                    subheader={elem.author ? elem.author : elem.source}
                  />
                  <CardMedia
                    component="img"
                    image={
                      elem.imageUrl
                        ? elem.imageUrl
                        : /undefined/.test(elem.imgURL)
                        ? `https://via.placeholder.com/300x430.png?text=${elem.title}`
                        : elem.imgURL
                    }
                    alt="image"
                    sx={{
                      borderRadius: 1,
                      height: {                         xs: "250px",
                      md: (itemG % 3 !== 0 ? "270px" : "370px"),
                      lg: (itemG % 3 === 0 ? "250px" : "370px") }
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{
                        fontWeight: "500",
                      }}
                    >
                      {elem.content
                        ? decodeHtmlCharCodes(elem.content)
                        : decodeHtmlCharCodes(elem.description)}
                    </Typography>
                  </CardContent>
                  <Divider />
                  <CardActions
                    sx={{ displat: "flex", justifyContent: "space-between" }}
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
    "," +
    days[date.getDay()]
  );
}

function decodeHtmlCharCodes(str) {
  return str.replace(/(&#(\d+);)/g, function (match, capture, charCode) {
    return String.fromCharCode(charCode);
  });
}
