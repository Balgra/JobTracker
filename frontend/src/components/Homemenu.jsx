import {Box, Container, List, ListItemButton, ListItemText} from "@mui/material";

const Homemenmu = () => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection : "row"
        }}>
            <Container x={{
                display: "flex",
                justifyContent : "flex-start",
                alignItems : "center"
            }}>
            <List component="nav" aria-label="main mailbox folders">
                    <ListItemText primary="1st step" />
                <ListItemButton>
                    <ListItemText primary="Add company" />
                </ListItemButton>
            </List>
            </Container>
    
            <Container x={{
                display: "flex",
                justifyContent : "flex-start",
                alignItems : "center"
            }}>
            <List component="nav" aria-label="main mailbox folders">
                <ListItemText primary="2nd step" />
                <ListItemButton>
                    <ListItemText primary="Drafts" />
                </ListItemButton>
            </List>
            </Container>
            <Container x={{
                display: "flex",
                justifyContent : "flex-start",
                alignItems : "center"
            }}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItemText primary="3rd step" />
                    <ListItemButton>
                        <ListItemText primary="Drafts" />
                    </ListItemButton>
                </List>
            </Container>
            <Container x={{
                display: "flex",
                justifyContent : "flex-start",
                alignItems : "center"
            }}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItemText primary="4th step" />
                    <ListItemButton>
                        <ListItemText primary="Drafts" />
                    </ListItemButton>
                </List>
            </Container>
        </Box>
        
    );
}

export default Homemenmu;