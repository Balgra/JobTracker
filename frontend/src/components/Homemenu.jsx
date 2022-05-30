import {Box, Container, List, Paper} from "@mui/material";
import { useEffect, useState } from "react";
import {GetJobs} from "../services/JobService";
import {Navigate, useNavigate} from "react-router";

const Homemenmu = () => {
    const [jobs, setJobs] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        GetJobs().then(response => setJobs(response))
    }, []);
    const statusName=["Wishlist",
        "Applied",
        "OnlineAssignment",
        "Interview",
        "Verdict"];

    const getJobsByStatus = (status) => {
        let filteredJobs = jobs.filter(j => statusName[j.status] === status)
        return filteredJobs
    }


    const handleClick = () => {


        navigate("/jobEdit", { replace: true });
    }

    if (jobs.length <= 0)
        return <h1>You have not added any job. Please add a job application in order to see the list</h1>
    
    return (
        <Box sx={{
            display: "flex",
            flexDirection : "row",
            justifyContent : "center",
            alignItems : "flex-start",
        }}>
    
            {statusName.map((e) =>
                <Paper elevation={14} sx={{
                    display: "flex",
                    justifyContent : "flex-start",
                    alignItems : "flex-start",
                    ml:"20px",
                    mt:"10px",
                    height: "50vh",
                    mr:"20px",
                }}>
                    
                    <List>
            
                        <Box className="todo-app" sx={{
                        }}>
                            <div className="mb-4" style={{minWidth: '200px'}}>{e}</div>
                            {getJobsByStatus(e).map(c => <Container onClick={() => handleClick()}>{c.jobName} at {c.company.companyName}</Container>)}
            
                        </Box>
        
                    </List>
                </Paper>
            )}
        </Box>

    );
}

export default Homemenmu;