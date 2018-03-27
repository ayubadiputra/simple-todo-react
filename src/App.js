import React, { Component } from 'react';
import MTAddTodo from './components/AddTodo';
import MTTodoList from './components/TodoList';
import uniqid from 'uniqid';
import './App.scss';

// Dummy data for demo.
import tasks from './tasks.json';

class App extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			tasks: tasks,
		};
		this.onTaskSubmit = this.onTaskSubmit.bind( this );
	}

	onTaskSubmit( title ) {
		const data = {
			id: uniqid(),
			title: title,
			active: true,
		};
		this.setState( prevState => ({
			tasks: [...prevState.tasks, data],
		}));
	}

	render() {
		const tasks = this.state.tasks;

		return (
			<div className="mt-container">
				<MTAddTodo submitTask={this.onTaskSubmit} />
				<MTTodoList tasks={tasks} />
			</div>
		);
	}
}

export default App;
