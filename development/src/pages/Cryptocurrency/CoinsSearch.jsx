import React from "react";

import CoinCard from "./CoinCard";

import Grid from "@mui/material/Grid";

import { useEffect, useState } from "react";

function CoinsSearch({ coins, setLoading }) {

  const [newData, setNewData] = useState(null);

  useEffect(() => {


    let arr = [];
    for( let el of coins ){
      arr.push(fetch( `https://api.coinstats.app/public/v1/coins/${el.id.replace( /[a-z]+-/, '' )}?currency=USD`) );
    }

    Promise.all(arr)
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then( coinsData => {
        let arr = [];
        for( let coin of coinsData ){
          if( coin.coin ){
            arr.push(coin.coin);
          }
        }
        setNewData(arr);

        setLoading(true);

      } );




  }, []);

  console.log(newData);


  return (
    <Grid
      container
      sx={{
        border: "1px solid green",
        justifyContent: "center",
        p: { xs: 0, md: 2 },
      }}
    >
      {newData ? (
        newData.map((elem, key) => <CoinCard elem={elem} key={key} />)
      ) : (
        <></>
      )}
    </Grid>
  );
}

export default CoinsSearch;
