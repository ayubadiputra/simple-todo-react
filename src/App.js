import React, { Component } from 'react';
import MTAddTodo from './components/AddTodo';
import MTTodoList from './components/TodoList';
import './App.scss';

// Dummy data for demo.
import tasks from './tasks.json';

class App extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			tasks: tasks
		};
	}

	render() {
		const tasks = this.state.tasks;

		return (
			<div className="mt-container">
				<MTAddTodo />
				<MTTodoList tasks={tasks} />
			</div>
		);
	}
}

export default App;
