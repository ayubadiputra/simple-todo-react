/**
 * Import dependencies.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MTAddTodo from './components/AddTodo';
import MTTodoList from './components/TodoList';
import './App.scss';

/**
 * Import utilities.
 */
import uniqid from 'uniqid';
import mapKeys from 'lodash/mapKeys';
import has from 'lodash/has';

/**
 * Import dummy data for demo.
 */
import tasks from './tasks.json';

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
      tasks,
    };

    // Events handler.
    this.onTaskSubmit = this.onTaskSubmit.bind( this );
    this.onTaskCompleted = this.onTaskCompleted.bind( this );
    this.onTaskUpdated = this.onTaskUpdated.bind( this );
    this.onTaskRemoved = this.onTaskRemoved.bind( this );
  }

  /**
   * Submit new task to the tasks list.
   *
   * @param {string} title New task title.
   */
  onTaskSubmit( title ) {
    // Initiate the object data.
    const data = {
      id: uniqid(),
      title: title,
      active: true,
    };

    // Add new task to the list (appending not mutating).
    this.setState( prevState => ({
      tasks: [...prevState.tasks, data],
    }));
  }

  /**
   * Toggle task based on the task ID.
   *
   * @param {string}  id     Task ID.
   * @param {boolean} active Task status.
   */
  onTaskCompleted( id, active ) {
    let tasks = this.state.tasks;

    // TODO: Need to find better way to fix this!!!
    mapKeys( tasks, ( task, key ) => {
      // Find the task ID.
      if ( task.id == id ) {
        // Update the task status.
        task.active = ! active;
        tasks[key] = task;
      }
    } );

    // Mutate existing tasks.
    this.setState({
      tasks,
    });
  }

  /**
   * Update task title based on the task ID.
   *
   * @param {string}  id    Task ID.
   * @param {boolean} title Task title.
   */
  onTaskUpdated( id, title ) {
    let tasks = this.state.tasks;

    // TODO: Need to find better way to fix this!!!
    mapKeys( tasks, ( task, key ) => {
      // Find the task ID.
      if ( task.id == id ) {
        // Update the task title.
        task.title = title;
        tasks[key] = task;
      }
    } );

    // Mutate existing tasks.
    this.setState({
      tasks
    });
  }

  /**
   * Remove task from the list based on the task ID.
   *
   * @param {string} id Task ID.
   */
  onTaskRemoved( id ) {
    let tasks = this.state.tasks;

    // TODO: Need to find better way to fix this!!!
    // INSPECT: Not sure why, the loop called twice!!!
    mapKeys( tasks, ( task, key ) => {
      // Find the task ID.
      if ( has( task, 'id' ) && task.id == id ) {
         // Remove the task.
        tasks.splice( key, 1 );
      }
    } );

    // Mutate existing tasks.
    this.setState({
      tasks
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
        <MTAddTodo submitTask={this.onTaskSubmit} />
        <MTTodoList tasks={tasks} completeTask={this.onTaskCompleted} updateTask={this.onTaskUpdated} removeTask={this.onTaskRemoved} />
      </div>
    );
  }
}

export default App;
