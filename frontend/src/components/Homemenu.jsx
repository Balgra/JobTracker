import {Box, Container, List} from "@mui/material";
import Todo from "./Todo";

const Homemenmu = () => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection : "row"
        }}>
            <Container sx={{
                display: "flex",
                justifyContent : "flex-start",
                alignItems : "center"
            }}>
                <List component="nav" aria-label="main mailbox folders">

                    <div className="todo-app">
                        <div>Companies you applied for</div>
                        <Todo />

                    </div>

                </List>
            </Container>

            <Container sx={{
                display: "flex",
                justifyContent : "flex-start",
                alignItems : "center"
            }}>
                <List component="nav" aria-label="main mailbox folders">

                    <div className="todo-app">
                        <div>Tests you have coming</div>
                        <Todo />
                    </div>

                </List>
            </Container>
            <Container sx={{
                display: "flex",
                justifyContent : "flex-start",
                alignItems : "center"
            }}>
                <List component="nav" aria-label="main mailbox folders">

                    <div className="todo-app">
                        <div>Interviews you have coming</div>
                        <Todo />
                    </div>

                </List>
            </Container>
            <Container sx={{
                display: "flex",
                justifyContent : "flex-start",
                alignItems : "center"
            }}>
                <List component="nav" aria-label="main mailbox folders">

                    <div className="todo-app">
                        <div>Companies that accepted you</div>
                        <Todo />
                    </div>

                </List>
            </Container>
        </Box>

    );
}

export default Homemenmu;