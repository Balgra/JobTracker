import React, {useEffect} from 'react'
import {Box, Button, Card, CardActions, CardContent, Container, Typography} from "@mui/material";
import Navbar from "../components/nav-bar";
import {IsAuthenticated} from  "../services/AuthStatus.js";
import {useState} from "react";
import { Navigate } from "react-router-dom";

const ProfilePage = () => {
	
	const bull = (
		<Box
			component="span"
			sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
		>
			•
		</Box>
	);
	
	const [loggedIn, setLoggedIn] = useState(true);
	
	
	useEffect(() => {
		setLoggedIn(IsAuthenticated());
	},[]);
	
	return loggedIn ? (
		<div >
			<Navbar></Navbar>
			<Box sx={{
				display: "flex",
				justifyContent : "flex-start",
				flexDirection : "row",
				padding: "10px 22px"
			}}>
				<Card variant="outlined" >
					<React.Fragment>
						<CardContent>
							<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom variant="h5" component="div">
								UserName
							</Typography>
							<Typography variant="h5" component="div">
								be{bull}nev{bull}o{bull}lent
							</Typography>
							<Typography variant="body2">
								well meaning and kindly.
								<br />
								{'"a benevolent smile"'}
							</Typography>
						</CardContent>
					</React.Fragment>
				</Card>
				
			</Box>
		<Box sx={{
			display: "flex",
			flexDirection : "row",
		}}>
			<Container sx={{
				display: "flex",
				justifyContent : "flex-start",
				alignItems : "center",
				padding: "60px 160px"
			}}>
			<Card variant="outlined">
				<React.Fragment>
					<CardContent>
						<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom variant="h5" component="div">
							Companies you have applied
						</Typography>
						<br />
						<CardActions>
							<Button size="small">See More</Button>
						</CardActions>
					</CardContent>
				</React.Fragment>
			</Card>
			</Container>
			<Container sx={{
				display: "flex",
				justifyContent : "flex-start",
				alignItems : "center",
				padding: "60px 160px"
			}}>
				<Card variant="outlined">
					<React.Fragment>
						<CardContent>
							<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
								Mistakes done during interviews or tests
							</Typography>
							<Typography variant="body2">
								well meaning and kindly.
								<br />
								{'"a benevolent smile"'}
							</Typography>
						</CardContent>
						<CardActions>
							<Button size="small">See More</Button>
						</CardActions>
					</React.Fragment>
				</Card>
				
			</Container>
			<Container sx={{
				display: "flex",
				justifyContent : "flex-start",
				alignItems : "center",
				padding: "60px 160px"
			}}>
				<Card variant="outlined">
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
							<Button size="small">See More</Button>
						</CardActions>
					</React.Fragment>
				</Card>
			</Container>
		</Box>
		</div>
	) : (
		<Navigate to ="/Login"/>
	);
	
}

export default ProfilePage;