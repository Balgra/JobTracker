// a big form to get values from company.
import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { MenuItem, TextField, Button } from "@mui/material";
import { DateTimePicker, LocalizationProvider} from "@mui/lab";
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
		window.location.href = 'HomePage.js';
	}

	return (
		<div className="container d-flex flex-column" style={{display: 'flex', textAlign: 'center'}}>
			<h1 className='my-5'>Add your job</h1>
			<div className='mt-3' >
				<TextField style={{minWidth: '300px', textAlign: 'center'}}
					id="outlined-multiline-flexible"
					label="Job title"
					multiline
					maxRows={4}
					value={jobName}
					onChange={(e) => setJobName(e.target.value)}
				/>
			</div>
			<div>
				<FormControl className='mt-4' style={{ minWidth: '300px', textAlign: 'center' }}>
					<TextField
						labelId="state-dropdown"
						id="state_dropdown"
						select
						value={selectedCompany}
						label="Select company"
						onChange={(e) => setSelectedCompany(e.target.value)}
					>
						{companies.map((c) => <MenuItem value={c}>{c.companyName}</MenuItem>)}
					</TextField>

				</FormControl>
			</div>
			<div>
				<FormControl className='mt-4' style={{ minWidth: '300px' }}>
					<TextField
						labelId="state-dropdown"
						id="state_dropdown"
						select
						value={jobStatus}
						label="Select the job status"
						onChange={(e) => setJobStatus(e.target.value)}
					>
						<MenuItem value={ApplicationStatus.Wishlist}>Wishlist</MenuItem>
						<MenuItem value={ApplicationStatus.Applied}>Applied</MenuItem>
						<MenuItem value={ApplicationStatus.OnlineAssignment}>Online Assignment</MenuItem>
						<MenuItem value={ApplicationStatus.Interview}>Interview</MenuItem>
						<MenuItem value={ApplicationStatus.Verdict}>Verdict</MenuItem>
					</TextField>
				</FormControl>
			</div>
			<div className='mt-3'>
				<FormControl className='mt-4' style={{ minWidth: '300px' }}>
					{/*<InputLabel htmlFor="component-simple">Notes</InputLabel>*/}
					{/*<Input id="component-simple" value={notes} onChange={(e) => setNotes(e.target.value)} />*/}
					<TextField
						id="outlined-multiline-static"
						label="Notes"
						multiline
						rows={4}
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
					/>
				</FormControl>
			</div>
			<div className='mt-4' style={{minWidth: '300px', textAlign: 'center'}}>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DateTimePicker
						autoOk
						ampm={false}
						disablePast
						value={deadline}
						onChange={(e) => setDeadline(e)}
						renderInput={(params) => <TextField {...params} />}
						label="Deadline"
					/>
				</LocalizationProvider>
			</div>

			<div className='mt-3'>
				<Button variant="outlined" onClick={() => handleSubmit()} style={{minWidth: '100px'}}>Save</Button>
			</div>
		</div>
	);

}

export default JobCreate;