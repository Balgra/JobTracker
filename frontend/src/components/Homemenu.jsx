import {Box, Container, List, Paper} from "@mui/material";
import { useEffect, useState } from "react";
import {GetJobs} from "../services/JobService";
import {useNavigate} from "react-router";

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

    const statuses=["Wishlist",
        "Applied",
        "OnlineAssignment",
        "Interview",
        "Offer",
        "Rejection"];

    const getJobsByStatus = (status) => {
        let filteredJobs;

        if (status === "Verdict")
            filteredJobs = jobs.filter(j => statuses[j.status] === "Offer" || statuses[j.status] === "Rejection")
        else
            filteredJobs = jobs.filter(j => statusName[j.status] === status)

        return filteredJobs
    }


    const handleClick = (id) => {
        navigate("/jobEdit/" + id, { replace: true });
    }

    if (jobs.length <= 0)
        return <h2>You have not added any job. Please add a job application in order to see the list</h2>
    
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
                            {getJobsByStatus(e).map(c => <Container onClick={() => handleClick(c.id)} style={{color: 'red'}}>{c.jobName} at {c.company.companyName}</Container>)}
            
                        </Box>
        
                    </List>
                </Paper>
            )}
        </Box>

    );
}

export default Homemenmu;