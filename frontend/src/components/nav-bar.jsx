import {Box, Button, Container, IconButton} from "@mui/material";
import {useState} from "react";
import HomeIcon from '@mui/icons-material/Home';
import {Link} from "react-router-dom";

const Navbar = () => {
    
    const [loggedIn, setLoggedIn] = useState(true);
    
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
                <Link variant="body2" to="/"
                      style={{ textDecoration: 'none' }}><HomeIcon color="primary"/></Link>
            </IconButton>
        </Container>
        
        <Container sx={{
            display: "flex",
            justifyContent : "flex-end",
            alignItems : "center",
        }}>
          {loggedIn ? <Link variant="body2" to="/" style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" onClick={() => {setLoggedIn(!loggedIn)}}>Logout</Button></Link>
           : <Link variant="body2" to="Login" style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" onClick={() => {setLoggedIn(!loggedIn)}}>Login</Button></Link>}
            
            {loggedIn ? <Link variant="body2" to="Profile" style={{ textDecoration: 'none', marginLeft: '5px' }}>
                    <Button variant="outlined">Profile</Button></Link>
            : <Link variant="body2" to="Register" style={{ textDecoration: 'none',  marginLeft: '5px'}}>
                    <Button variant="outlined">Register</Button></Link>}

        </Container>
    </Box>)
}

export default Navbar;