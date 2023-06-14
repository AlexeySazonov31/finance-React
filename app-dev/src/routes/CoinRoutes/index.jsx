import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Coin from "../../pages/Cryptocurrency/Coin";
import { useError } from "../../pages/Error/ErrorContext";

export default function CoinPage() {

    const [dataCoin, setDataCoin] = useState(null);
    const [historyData, setHistoryData] = useState(null);

    const {showError} = useError();

    let {idcoin} = useParams();

    useEffect(() => {
        fetch(
            `https://api.coingecko.com/api/v3/coins/${idcoin}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.hasOwnProperty("error")) {
                    showError(data.error)
                } else {
                    setDataCoin(data);
                }
            })
            .catch(err => {
                showError(err)
            });
        fetch(`https://api.coingecko.com/api/v3/coins/${idcoin}/market_chart?vs_currency=usd&days=max`)
            .then((res) => res.json())
            .then((data) => {
                if (data.hasOwnProperty("error")) {
                    showError(data.error)
                } else {
                    setHistoryData(data);
                }
            })
            .catch(err => {
                showError(err)
            })
    }, [idcoin, showError]);
    return <Coin data={dataCoin} historyData={historyData} />
}
