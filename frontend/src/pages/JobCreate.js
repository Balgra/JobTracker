// a big form to get values from company.
import React, {useState} from 'react';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import {MenuItem, Select, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const JobCreate = ({loggedIn}) => {
	
	const [dropdown] = [];
	const [name] = [];
	const deadline = new Date();
	const [notes] = [];
	
	const handleChange = (event) => {
		console.log(event.target.value);
	};

	const handleDate = (deadline) => {
		console.log(deadline)
	}
	
	return (
		<Box
			component="form"
			sx={{
				'& > :not(style)': { m: 1 },
			}}
			noValidate
			autoComplete="off"
		>
			<FormControl sx={{ m: 1, minWidth: 400 }}>
				<InputLabel id="state-dropdown">Select state</InputLabel>
				<Select
					labelId="state-dropdown"
					id="state_dropdown"
					defaultValue={dropdown ||""}
					label="Select state"
					onChange={handleChange}
				>
					<MenuItem value={"Wishlist"}>Wishlist</MenuItem>
					<MenuItem value={"Applied"}>Applied</MenuItem>
					<MenuItem value={"Online Assignment"}>Online Assignment</MenuItem>
					<MenuItem value={"Interview"}>Interview</MenuItem>
					<MenuItem value={"Verdict"}>Verdict</MenuItem>
				</Select>
			</FormControl>

			<br></br>

			<FormControl variant="standard">
				<InputLabel htmlFor="component-simple">Name</InputLabel>
				<Input id="component-simple" value={name} onChange={handleChange} />
			</FormControl>

			<FormControl variant="standard">
				<InputLabel htmlFor="component-simple">Notes</InputLabel>
				<Input id="component-simple" value={notes} onChange={handleChange} />
			</FormControl>

			<br></br>

			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DatePicker
					label="Deadline"
					value={deadline}
					onChange={handleDate}
					renderInput={(params) => <TextField {...params} />}
				/>
			</LocalizationProvider>

			<button type="submit">Subscribe</button>
		</Box>
	);

}

export default JobCreate;

module.exports = {JobCreate}