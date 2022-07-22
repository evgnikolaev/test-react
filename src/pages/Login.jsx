import React from 'react';
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import {useContext} from "react";
import {AuthContext} from "../context";

const Login = () => {
	const {isAuth, setIsAuth} = useContext(AuthContext);
	const login = (e) => {
		e.preventDefault();
		setIsAuth(true);
		localStorage.setItem('auth','true');
	};

	return (
		<div>
			<h1>Страница для логина</h1>
			<form onSubmit={login}>
				<MyInput type="text" placeholder="login"/> <MyInput type="text" placeholder="password"/>
				<MyButton>Send</MyButton>
			</form>
		</div>
	);
};

export default Login;