import React, { Component } from 'react';
import MTAddTodo from './components/AddTodo';
import MTTodoList from './components/TodoList';
import uniqid from 'uniqid';
import mapKeys from 'lodash/mapKeys';
import isEmpty from 'lodash/isEmpty';
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
		this.onTaskCompleted = this.onTaskCompleted.bind( this );
		this.onTaskUpdated = this.onTaskUpdated.bind( this );
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

	onTaskCompleted( id, active ) {
		let tasks = this.state.tasks;

		// TODO: Need to find better way to fix this!!!
		mapKeys( tasks, (task, key) => {
			if ( task.id == id ) {
				task.active = ! active;
				tasks[key] = task;
				return false;
			}
		} );

		this.setState({
			tasks: tasks
		});
	}

	onTaskUpdated( id, title ) {
		let tasks = this.state.tasks;

		// TODO: Need to find better way to fix this!!!
		mapKeys( tasks, (task, key) => {
			if ( task.id == id ) {
				task.title = title;
				tasks[key] = task;
				return false;
			}
		} );

		this.setState({
			tasks: tasks
		});
	}

	render() {
		const tasks = this.state.tasks;

		return (
			<div className="mt-container">
				<MTAddTodo submitTask={this.onTaskSubmit} />
				<MTTodoList tasks={tasks} completeTask={this.onTaskCompleted} updateTask={this.onTaskUpdated} />
			</div>
		);
	}
}

export default App;
