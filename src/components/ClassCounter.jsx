import React from 'react';

class ClassCounter extends React.Component {

	constructor(props) {
		super(props);
		//Задание состояния
		this.state = {
			count: 0
		};

		//так как тераяется контекст this
		this.increment = this.increment.bind(this);
		this.decrement = this.decrement.bind(this);
	}

	increment() {
		//изменение состояния, через setState, напрямую нельзя
		this.setState({
			count: this.state.count + 1
		});
	}

	decrement() {
		this.setState({
			count: this.state.count - 1
		});
	}

	//В классовых компонентах воозвращаем jsx в классовых компонентах
	render() {
		return (
			<div>
				<h1>{this.state.count}</h1>
				<button onClick={this.increment}>Increment</button>
				<button onClick={this.decrement}>Decrement</button>
			</div>
		);
	}
}

export default ClassCounter;