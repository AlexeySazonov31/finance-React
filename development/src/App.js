import { Link } from 'react-router-dom';

import {
    AppBar,
    Toolbar,
    Typography,
    Button,
} from "@mui/material";

import Routes from "./routes";


function App(){

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Real App
                    </Typography>
                    <div> 
                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>
                    </div>
                    <div>
                        <Button color="inherit" component={Link} to="/cryptocurrency">
                            Сryptocurrency
                        </Button>
                    </div>
                    <div>
                        <Button color="inherit" component={Link} to="/stock">
                            Stock
                        </Button>
                    </div>
                    <div>
                        <Button color="inherit" component={Link} to="/currencies">
                            Currencies
                        </Button>
                    </div>
                    <div>
                        <Button color="inherit" component={Link} to="/nft">
                            NFT
                        </Button>
                    </div>

                </Toolbar>
            </AppBar>

            <Routes />
        </div>
    )
}

export default App;