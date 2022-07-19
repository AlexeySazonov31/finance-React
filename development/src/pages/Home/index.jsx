import { useEffect, useState } from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";


import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

const sourcesCategorys = [
  {
    id: "finance",
    url: "https://api.coinstats.app/public/v1/news/", ///  ?skip=0&limit=20
    categorys: ["handpicked", "trending", "latest", "bullish", "bearish"],
  },
  {
    id: "global",
    url: "https://inshorts.deta.dev/news?category=",
    categorys: [
      "all",
      "business",
      "sports",
      "world",
      "politics",
      "technology",
      "startup",
      "entertainment",
      "miscellaneous",
      "hatke",
      "science",
      "automobile",
    ],
  },
];
function Home() {
  const [source, setSource] = useState("global");
  const [category, setCategory] = useState("business");
  const [loading, setLoading] = useState("false");
  const [data, setData] = useState(false);

  const handleChange = (event, newSource) => {
    setSource(newSource);
    setCategory(
      newSource === "finance"
        ? sourcesCategorys[0].categorys[0]
        : sourcesCategorys[1].categorys[0]
    );
  };

  const handleCategory = (event, newCategory) => {
    setCategory(newCategory);
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
        if( source === 'finance' ){

        } else {
            setData( dt.success ? dt.data : [] );
        }
        setLoading(false);
      });
  }, [category, source]);

  return (


    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        border: '1px solid red',
        width: 1,
        justifyContent: 'flex-start'
      }}
    >



      <Box
        sx={{
          padding: 3,
          borderRadius: 3,
          width: 'fit-content',
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
            onChange={handleChange}
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
          >
            {buttonsFilter}
          </ToggleButtonGroup>
        </Paper>
      </Box>




      <Box sx={{ margin: 'auto'}}>

      {loading ? (
          <CircularProgress />
      ) : (
        data.map((elem, item) => (
            <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              title={elem.title}
              subheader={elem.author}
            />
            <CardMedia
              component="img"
              height="194"
              image={elem.imageUrl}
              alt="image"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {elem.content}
              </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{textAlign: 'right'}}>
              {elem.date}
            </CardActions>
          </Card>
        ))
      )}
      </Box>



    </Box>
  );
}

export default Home;
