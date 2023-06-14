import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Coin from "../../pages/Cryptocurrency/Coin";

export default function CoinPage() {
    const navigate = useNavigate();

    const [dataCoin, setDataCoin] = useState(null);
    const [historyData, setHistoryData] = useState(null);
    const [error, setError] = useState(null);

    let { idcoin } = useParams();

    useEffect(() => {
        fetch(
            `https://api.coingecko.com/api/v3/coins/${idcoin}`
        )
            .then((res) => res.json())
            .then((data) => {
                if( data.hasOwnProperty("error") ){
                    console.log(data.error);
                    // setError(data.error);
                    navigate("/error")
                } else {
                    setDataCoin(data);                }
            })
            .catch(err => {
                console.log(err);
                navigate("/error");
            });
        fetch(`https://api.coingecko.com/api/v3/coins/${idcoin}/market_chart?vs_currency=usd&days=max`)
            .then((res) => res.json())
            .then((data) => {
                if( data.hasOwnProperty("error") ){
                    console.log(data.error)
                    navigate("/error")
                } else {
                    setHistoryData(data);
                }
    })
        .catch(err => {
            console.log(err);
            navigate("/error");
        })
}, [idcoin]);
return <Coin data={dataCoin} id={idcoin} historyData={historyData} />
}
