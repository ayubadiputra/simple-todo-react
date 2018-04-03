/**
 * Import dependencies.
 */
import React, { Component } from 'react';
import MTAddTodo from './components/AddTodo';
import MTTodoList from './components/TodoList';
import './App.scss';

/**
 * Import Flux dependencies.
 */
import MTStore from './stores';

/**
 * Import constants.
 */
import {
  SUBMIT_TASK,
  COMPLETE_TASK,
  UPDATE_TASK,
  REMOVE_TASK,
} from './constants';

/**
 * Main App.
 *
 * Render components and controll data flow.
 *
 * @since 0.0.1
 */
class App extends Component {
  /**
   * The constructor.
   *
   * @param {object} props Object props.
   */
  constructor( props ) {
    super( props );

    // Initiate states.
    this.state = {
      tasks: MTStore.getAll(),
    };

    // Events handler.
    this.onTasksUpdated = this.onTasksUpdated.bind( this );
  }

  componentDidMount() {
    MTStore.addChangeListener( SUBMIT_TASK, this.onTasksUpdated );
    MTStore.addChangeListener( COMPLETE_TASK, this.onTasksUpdated );
    MTStore.addChangeListener( UPDATE_TASK, this.onTasksUpdated );
    MTStore.addChangeListener( REMOVE_TASK, this.onTasksUpdated );
  }

  componentWillUnmount() {
    MTStore.removeChangeListener( SUBMIT_TASK, this.onTasksUpdated );
    MTStore.removeChangeListener( COMPLETE_TASK, this.onTasksUpdated );
    MTStore.removeChangeListener( UPDATE_TASK, this.onTasksUpdated );
    MTStore.removeChangeListener( REMOVE_TASK, this.onTasksUpdated );
  }

  /**
   * Submit new task to the tasks list.
   *
   * @param {string} title New task title.
   */
  onTasksUpdated() {
    // Add new task to the list (appending not mutating).
    this.setState({
      tasks: MTStore.getAll(),
    });
  }

  /**
   * Render TodoList to display tasks list.
   *
   * @return {string} TodoList HTML tags.
   */
  render() {
    const tasks = this.state.tasks;

    return (
      <div className="mt-container">
        <MTAddTodo />
        <MTTodoList tasks={tasks} completeTask={this.onTaskCompleted} updateTask={this.onTaskUpdated} removeTask={this.onTaskRemoved} />
      </div>
    );
  }
}

export default App;
