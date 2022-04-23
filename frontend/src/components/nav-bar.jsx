import {Box, Button, Container, IconButton} from "@mui/material";
import {useState} from "react";
import HomeIcon from '@mui/icons-material/Home';
import {Link} from "react-router-dom";


const Navbar = () => {
    
    const [loggedIn, setLoggedIn ] = useState(false);
    
    return(
    <Box sx={{
        display: "flex",
        backgroundColor: 'black',
        flexDirection : "row"
    }}>
        <Container sx={{
            display: "flex",
            justifyContent : "flex-start",
            alignItems : "center"
        }}>
            <IconButton>
                <HomeIcon color="primary"/>
            </IconButton>
        </Container>
        
        <Container sx={{
            display: "flex",
            justifyContent : "flex-end",
            alignItems : "center",
        }}>
          {loggedIn ? <Link component="button"
                            variant="body2" to="/">Logout</Link>
              // <Button variant="outlined" onClick={() => {setLoggedIn(!loggedIn)}}>Logout</Button>
           :<Button variant="outlined" onClick={() => {setLoggedIn(!loggedIn)}}>Login</Button>}
            
            {loggedIn ? <Button sx={{ marginLeft: '5px' }} variant="outlined">Profile</Button>
            : <Button sx={{ marginLeft: '5px' }} variant="outlined">Register</Button>}
        </Container>
    </Box>)
}

export default Navbar;