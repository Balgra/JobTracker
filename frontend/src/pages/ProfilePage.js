import React from 'react'
import {Box, Button, Card, CardActions, CardContent, Container, Typography} from "@mui/material";
import Navbar from "../components/nav-bar";


const ProfilePage = () => {
	
	const bull = (
		<Box
			component="span"
			sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
		>
			•
		</Box>
	);
	
	const card = (
		<React.Fragment>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					Word of the Day
				</Typography>
				<Typography variant="h5" component="div">
					be{bull}nev{bull}o{bull}lent
				</Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					adjective
				</Typography>
				<Typography variant="body2">
					well meaning and kindly.
					<br />
					{'"a benevolent smile"'}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Learn More</Button>
			</CardActions>
		</React.Fragment>
	);
	
	return (
		<div>
			<Navbar></Navbar>
			<Box sx={{
				display: "flex",
				flexDirection : "row"
			}}>
				<Card variant="outlined">{card}</Card>
			</Box>
		<Box sx={{
			display: "flex",
			flexDirection : "row"
		}}>
			<Container sx={{
				display: "flex",
				justifyContent : "flex-start",
				alignItems : "center"
			}}>
			<Card variant="outlined">{card}</Card>
			</Container>
			<Container sx={{
				display: "flex",
				justifyContent : "flex-start",
				alignItems : "center"
			}}>
				<Card variant="outlined">{card}</Card>
			</Container>
			<Container sx={{
				display: "flex",
				justifyContent : "flex-start",
				alignItems : "center"
			}}>
				<Card variant="outlined">{card}</Card>
			</Container>
		</Box>
		</div>
	);
	
}

export default ProfilePage;