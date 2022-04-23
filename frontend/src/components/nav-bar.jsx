import {Box, Container, IconButton} from "@mui/material";
import {useState} from "react";
import HomeIcon from '@mui/icons-material/Home';
import {Link} from "react-router-dom";

const Navbar = () => {
    
    const [loggedIn, setLoggedIn] = useState(false);
    
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
          {loggedIn ? <Link component="button" variant="body2" to="/" onClick={() => {setLoggedIn(!loggedIn)}}
                            style={{ textDecoration: 'none' }}>Logout</Link>
           :<Link component="button" variant="body2" to="Login" onClick={() => {setLoggedIn(!loggedIn)}}
                  style={{ textDecoration: 'none' }}>Login</Link>
          }
            
            {loggedIn ? <Link component="button" variant="body2" to="Profile"
                              style={{ textDecoration: 'none', marginLeft: '5px' }}>Profile</Link>
            : <Link component="button" variant="body2" to="Register"
                    style={{ textDecoration: 'none',  marginLeft: '5px'}}>Register</Link>}

        </Container>
    </Box>)
}

export default Navbar;