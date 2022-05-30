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

    const getColor = (status) => {
        if (statuses[status] === "Offer")
            return "green"
        if (statuses[status] === "Rejection")
            return "red"
        return "black"
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
                    mt:"50px",
                    height: "50vh",
                    mr:"20px"
                }}>
                    
                    <List>
            
                        <Box className="todo-app" sx={{
                        }}>
                            <div className="mb-4" style={{minWidth: '200px', fontSize: '1.5rem', borderBottom: "2px solid gray"}}>{e}</div>
                            {getJobsByStatus(e).map(c => <Container onClick={() => handleClick(c.id)} style={{color: getColor(c.status), border: '1px solid ' + getColor(c.status), marginTop: '10px', marginBottom: '10px'
                            , borderRadius: '15px'}}>{c.jobName} at {c.company.companyName}</Container>)}
            
                        </Box>
        
                    </List>
                </Paper>
            )}
        </Box>

    );
}

export default Homemenmu;