import React from 'react'
import {Box, Container} from "@mui/material";
import Navbar from "../components/nav-bar";

const ProfilePage = () => {
	
	return (
		<div>
		<Navbar></Navbar>
			<Box sx={{
				display: "flex",
				flexDirection : "row"
			}}>
					<Container sx={{
						display: "flex",
						justifyContent : "flex-start",
						alignItems : "center"
					}}>
					
					</Container>
			</Box>
			</div>
		
	);
	
}

export default ProfilePage;