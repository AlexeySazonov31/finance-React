import React from 'react';

import CoinCard from './CoinCard';

import { useEffect, useState } from 'react';
  
  function CoinSearch({ elem }) {

    const [ elemNewData, setElemNewData ] = useState(null);

    useEffect( () => {
        let id = elem.id.split('-');
        id.shift();
        id = id.join('-');
        console.log(id);
        fetch( `https://api.coinstats.app/public/v1/coins/${id}?currency=USD`)
          .then( res => res.json() )
          .then( data => {
            setElemNewData(data.coin);
          })
    }, [] )


    return elemNewData ? <CoinCard elem={elemNewData} /> : <></>;
  }
  
  export default CoinSearch;