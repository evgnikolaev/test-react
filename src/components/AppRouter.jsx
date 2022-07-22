import React from 'react';
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import {Route, Switch, Redirect} from "react-router-dom";
import PostIdPage from "../pages/PostIdPage";
import {privateRoutes, publicRoutes} from "../router/index";
import {useContext} from "react";
import {AuthContext} from "../context";
import Loader from "./UI/loader/loader";


const AppRouter = () => {
	const {isAuth, isLoading} = useContext(AuthContext);
	if (isLoading) {
		return <Loader/>
	}
	return (
		isAuth
			?
			<Switch>
				{privateRoutes.map((route) =>
					<Route key={route.path} path={route.path} component={route.component} exact={route.exact}/>
				)} <Redirect to="/posts"/> </Switch>
			:
			<Switch>
				{publicRoutes.map((route) =>
					<Route key={route.path} path={route.path} component={route.component} exact={route.exact}/>
				)} <Redirect to="/login"/> </Switch>
	);
};

export default AppRouter;