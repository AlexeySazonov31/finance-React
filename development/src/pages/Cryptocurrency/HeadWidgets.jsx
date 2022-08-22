import React from 'react';
import {Grid, Card} from '@mui/material';
import { useState, useEffect } from 'react';

function HeadWidgets(){

    const [dataGlobal, setDataGlobal] = useState(null);

    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/global")
          .then((res) => res.json())
          .then((data) => {
            console.log(!data.error ? data : data.error);
            setDataGlobal(!data.error ? data.data : null);
          });
        }, []);


    return <>
    {dataGlobal ? (
            <Grid
              container
              spacing={2}
              sx={{
                width: "2",
                border: "1px solid green",
                padding: 1,
                justifyContent: "center",
              }}
            >
              <Grid item>
                <Card
                  width="fit-content"
                  sx={{
                    p: 0.7,
                    px: 2,
    
                    width: "fit-content",
                    m: "auto",
                  }}
                >
                  Total coins: {dataGlobal.active_cryptocurrencies}
                </Card>
              </Grid>
    
              <Grid item>
                <Card
                  sx={{
                    p: 0.7,
                    px: 2,
    
                    width: "fit-content",
                    m: "auto",
                  }}
                >
                  capitalization (24h):{" "}
                  {dataGlobal.market_cap_change_percentage_24h_usd.toFixed(2)}%
                </Card>
              </Grid>
    
              <Grid item>
                <Card
                  sx={{
                    p: 0.7,
                    px: 2,
                    width: "fit-content",
                    m: "auto",
                  }}
                >
                  Total markets: {dataGlobal.markets}
                </Card>
              </Grid>
    
              <Grid item>
                <Card
                  sx={{
                    p: 0.7,
                    px: 2,
                    width: "fit-content",
                    m: "auto",
                  }}
                >
                  btc: {dataGlobal.market_cap_percentage.btc.toFixed(3)}%
                </Card>
              </Grid>
    
              <Grid item>
                <Card
                  sx={{
                    p: 0.7,
                    px: 2,
                    width: "fit-content",
                    m: "auto",
                  }}
                >
                  eth: {dataGlobal.market_cap_percentage.eth.toFixed(3)}%
                </Card>
              </Grid>
            </Grid>
          ) : (
            <></>
          )}

</>
    
}

export default HeadWidgets;