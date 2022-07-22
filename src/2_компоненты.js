import React, {useState} from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";

function App() {
	return (
		<div className="App">
			<ClassCounter/> <ClassCounter/>
		</div>
	);
}

export default App;
