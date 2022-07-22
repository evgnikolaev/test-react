import React, {useState} from "react";

function App() {
	const [likes, setLikes] = useState(5);
	const [value, setValue] = useState('текст в инпуте');

	function increment() {
		setLikes(likes + 1)
	}

	function decrement() {
		setLikes(likes - 1)
	}

	return (
		/*
		Чтобы не расписывать таким образом, придумали язык jsx
		React.createElement('div', {},
			React.createElement('button', {
				disabled: false,
				onClick: () => {
					console.log(1111)
				}
			}, 'Нажми на меня'),
		)*/


		<div className="App">
			<h1>{likes}</h1>
			<h1>{value}</h1>
            Двустороннее связывание
			<input type="text" value={value} onChange={e => setValue(e.target.value)}/> <br/>
			<button onClick={increment}>Increment</button>
			<button onClick={decrement}>Decrement</button>
		</div>
	)
		;
}

export default App;
