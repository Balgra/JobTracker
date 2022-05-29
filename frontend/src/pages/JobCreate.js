// a big form to get values from company.
import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem, Select, TextField, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { ApplicationStatus } from '../Models/ApplicationStatus';
import { AddJob } from '../services/JobService';
import { GetCompanies } from '../services/CompaniesService';


const JobCreate = ({ loggedIn }) => {
	const [jobStatus, setJobStatus] = useState(0);
	const [selectedCompany, setSelectedCompany] = useState(0);
	const [jobName, setJobName] = useState("");
	const [notes, setNotes] = useState("");
	const [deadline, setDeadline] = useState();
	const [companies, setCompanies] = useState([]);

	useEffect(() => {
		GetCompanies().then((response) => setCompanies(response))
	}, [])
	const handleSubmit = () => {
		AddJob(jobName, jobStatus, selectedCompany.id, notes, deadline)
			.then(() => { })
			.catch((e) => console.log(e));
	}

	return (
		<div className="container d-flex flex-column">
			<h1 className='my-5'>Add your job</h1>
			<div className='mt-3'>
				<FormControl variant="standard">
					<InputLabel htmlFor="component-simple">Job name or title</InputLabel>
					<Input id="component-simple" value={jobName} onChange={(e) => setJobName(e.target.value)} />
				</FormControl>
			</div>
			<div className='mt-3' style={{ minWidth: '100px' }}>
				<FormControl>
					<InputLabel id="state-dropdown">Select the company</InputLabel>
					<Select
						labelId="state-dropdown"
						id="state_dropdown"
						value={selectedCompany}
						label="Select state"
						onChange={(e) => setSelectedCompany(e.target.value)}
					>
						{companies.map((c) => <MenuItem value={c}>{c.companyName}</MenuItem>)}
					</Select>
				</FormControl>
			</div>
			<div className='mt-3' style={{ minWidth: '100px' }}>
				<FormControl>
					<InputLabel id="state-dropdown">Select the job status</InputLabel>
					<Select
						labelId="state-dropdown"
						id="state_dropdown"
						value={jobStatus}
						label="Select state"
						onChange={(e) => setJobStatus(e.target.value)}
					>
						<MenuItem value={ApplicationStatus.Wishlist}>Wishlist</MenuItem>
						<MenuItem value={ApplicationStatus.Applied}>Applied</MenuItem>
						<MenuItem value={ApplicationStatus.OnlineAssignment}>Online Assignment</MenuItem>
						<MenuItem value={ApplicationStatus.Interview}>Interview</MenuItem>
						<MenuItem value={ApplicationStatus.Verdict}>Verdict</MenuItem>
					</Select>
				</FormControl>
			</div>
			<div className='mt-3'>
				<FormControl variant="standard">
					<InputLabel htmlFor="component-simple">Notes</InputLabel>
					<Input id="component-simple" value={notes} onChange={(e) => setNotes(e.target.value)} />
				</FormControl>
			</div>
			<div className='mt-3'>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DatePicker
						label="Deadline"
						value={deadline}
						onChange={(e) => setDeadline(e)}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>
			</div>

			<div className='mt-3'>
				<Button variant="outlined" onClick={() => handleSubmit()}>Save</Button>
			</div>
		</div>
	);

}

export default JobCreate;