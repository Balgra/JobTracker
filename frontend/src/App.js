import './App.css';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import JobCreate from "./pages/JobCreate";
import {BrowserRouter, Routes, Route,} from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/nav-bar";
import {useEffect, useState} from "react";
import {IsAuthenticated} from "./services/AuthStatus";
import JobEdit from "./pages/JobEdit";


function App() {
	
	const [loggedIn, setLoggedIn] = useState(true);
	
	
	useEffect(() => {
		setLoggedIn(IsAuthenticated());
	}, []);
	
	return (
		<>
			
			<BrowserRouter>
				<Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
				<Routes>
					{loggedIn ? <><Route path="/" element={<HomePage/>}/>
							<Route path="job" element={<JobCreate loggedIn={loggedIn} />}/>
							<Route path="jobEdit/:id" element={<JobEdit loggedIn={loggedIn} />}/>
							<Route path="Profile" element={<ProfilePage loggedIn={loggedIn}/>}/> </>
						: <Route path="Login" element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
					}
					<Route path="*" element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}> </Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
