// a big form to get values from company.
import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { MenuItem, TextField, Button } from "@mui/material";
import { DateTimePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { ApplicationStatus } from '../Models/ApplicationStatus';
import {EditJob, GetJobById, DeleteJob} from '../services/JobService';
import { GetCompanies } from '../services/CompaniesService';
import {useNavigate, useParams} from "react-router";


const JobCreate = ({ loggedIn }) => {
    let { id } = useParams();
    let navigate = useNavigate();

    const [job, setJob] = useState(undefined);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        GetCompanies().then((response) => setCompanies(response))
        GetJobById(id).then((response) => setJob(response))

    }, [])

    const handleSubmit = () => {
       EditJob(job)
            .then(() => { })
            .catch((e) => console.log(e));
       navigate("/", { replace: true })
    }

    const handleDelete = () => {
        DeleteJob(id)
            .then(() => { })
            .catch((e) => console.log(e));
        navigate("/", { replace: true })
    }

    if (job === undefined)
        return <div>Loading</div>
    else
        console.log(job)

    return (
        <div className="container d-flex flex-column" style={{display: 'flex', textAlign: 'center'}}>
            <h1 className='my-5'>Edit existing job</h1>
            <div className='mt-3' >
                <TextField style={{minWidth: '300px', textAlign: 'center'}}
                           id="outlined-multiline-flexible"
                           label="Job title"
                           multiline
                           maxRows={4}
                           value={job.jobName}
                           onChange={(e) => {let newJob = {...job, jobName: e.target.value}; setJob(newJob)}}
                />
            </div>
            <div>
                <FormControl className='mt-4' style={{ minWidth: '300px', textAlign: 'center' }}>
                    <TextField
                        id="outlined-multiline-flexible"
                        disabled
                        value={companies.find((e) => e.id === job.companyId).companyName}
                        label="Company"
                    >
                        {job.company.companyName}
                    </TextField>
                </FormControl>
            </div>
            <div>
                <FormControl className='mt-4' style={{ minWidth: '300px' }}>
                    <TextField
                        labelId="state-dropdown"
                        id="state_dropdown"
                        select
                        value={job.status}
                        label="Select the job status"
                        onChange={(e) => {let newJob = {...job, status: e.target.value}; setJob(newJob)}}
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
                        value={job.notes}
                        onChange={(e) => {let newJob = {...job, notes: e.target.value}; setJob(newJob)}}
                    />
                </FormControl>
            </div>
            <div className='mt-4' style={{minWidth: '300px', textAlign: 'center'}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        autoOk
                        ampm={false}
                        disablePast
                        value={job.deadline}
                        onChange={(e) => {let newJob = {...job, deadline: e.target.value}; setJob(newJob)}}
                        renderInput={(params) => <TextField {...params} />}
                        label="Deadline"
                    />
                </LocalizationProvider>
            </div>

            <div className='mt-3'>
                <Button variant="outlined" onClick={() => handleSubmit()} style={{minWidth: '100px'}}>Save</Button>
                <Button variant="outlined" onClick={() => handleDelete()} style={{minWidth: '100px', marginLeft: '10px'}} color="error">Delete</Button>
            </div>
        </div>
    );

}

export default JobCreate;