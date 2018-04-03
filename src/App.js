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
   * @param {Object} props Object props.
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

  /**
   * Run actions after component mounted.
   *
   * Subscribes to events for specific data changes.
   */
  componentDidMount() {
    MTStore.addChangeListener( SUBMIT_TASK, this.onTasksUpdated );
    MTStore.addChangeListener( COMPLETE_TASK, this.onTasksUpdated );
    MTStore.addChangeListener( UPDATE_TASK, this.onTasksUpdated );
    MTStore.addChangeListener( REMOVE_TASK, this.onTasksUpdated );
  }

  /**
   * Run actions after component unmounted.
   *
   * Unsubscribes from previous subscribed events to reduce memory leak.
   */
  componentWillUnmount() {
    MTStore.removeChangeListener( SUBMIT_TASK, this.onTasksUpdated );
    MTStore.removeChangeListener( COMPLETE_TASK, this.onTasksUpdated );
    MTStore.removeChangeListener( UPDATE_TASK, this.onTasksUpdated );
    MTStore.removeChangeListener( REMOVE_TASK, this.onTasksUpdated );
  }

  /**
   * Update state based on changed tasks list store.
   */
  onTasksUpdated() {
    // Update tasks list state based on store data.
    this.setState({
      tasks: MTStore.getAll(),
    });
  }

  /**
   * Render TodoList to display tasks list.
   *
   * @return {String} TodoList HTML tags.
   */
  render() {
    const { tasks } = this.state;

    return (
      <div className="mt-container">
        <MTAddTodo />
        <MTTodoList tasks={tasks} />
      </div>
    );
  }
}

export default App;
