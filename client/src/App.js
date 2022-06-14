import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import Catagories from './components/Pages/Catagories'
import Cars from './components/Pages/Cars'
import Dashboard from "./components/Pages/Dashboard";
function App() {
	return (
		<>
			<Main />
			<Routes>
				<Route path="/signup" exact element={<Signup />}/>
				<Route path="/login" exact element={<Login />} />
				<Route path="/catagories" exact element={<Catagories />} />
				<Route path="/cars" exact element={<Cars />} />
				<Route path="/dashboard" exact element={<Dashboard />} />
				<Route path="/" element={<Navigate replace to="/dashboard" />} />
			</Routes>
		</>
	);
}

export default App;
