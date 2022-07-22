import React, {useState} from "react";
import './styles/App.css'
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {AuthContext} from "./context";
import {useEffect} from "react";

function App() {
	const [isAuth, setIsAuth] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
		if (localStorage.getItem('auth')) {
			setIsAuth(true);
		} else {
			setIsAuth(false);
		}
	}, []);

	return (
		<AuthContext.Provider value={{isAuth, setIsAuth, isLoading}}> <BrowserRouter> <Navbar/> <AppRouter/>
		</BrowserRouter> </AuthContext.Provider>
	);
}

export default App;
