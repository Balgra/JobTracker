import {Box, List, Paper} from "@mui/material";
import Todo from "./Todo";

const Homemenmu = () => {
    
    const statusName=["Wishlist",
        "Applied",
        "OnlineAssignment",
        "Interview",
        "Verdict"];
    
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
                            <div>{e}</div>
                            <Todo />
            
                        </Box>
        
                    </List>
                </Paper>
            )}
        </Box>

    );
}

export default Homemenmu;