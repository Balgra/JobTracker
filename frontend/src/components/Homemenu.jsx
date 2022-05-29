import {Box, List, Paper} from "@mui/material";
import { useEffect, useState } from "react";
import Todo from "./Todo";
import { GetJobs } from "../services/JobService";

const Homemenmu = () => {
    const [jobs, setJobs] = useState([]);

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
                    ml:"50px",
                    mt:"10px",
                    height: "90vh",
                    mr:"50px"
        
                }}>
                    
                    <List>
            
                        <Box className="todo-app" sx={{
                        }}>
                            <div className="mb-5">{e}</div>
                            {getJobsByStatus(e).map(c => <div>{c.jobName}</div>)}
            
                        </Box>
        
                    </List>
                </Paper>
            )}
        </Box>

    );
}

export default Homemenmu;