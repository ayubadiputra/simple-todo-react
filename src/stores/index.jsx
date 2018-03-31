/**
 * Import dependencies.
 */
import MTDispatcher from './../dispatcher';
import { EventEmitter } from 'events';
import {
  SUBMIT_TASK,
  COMPLETE_TASK,
  UPDATE_TASK,
  REMOVE_TASK,
} from './../constants';

/**
 * Import utilities.
 */
import uniqid from 'uniqid';
import has from 'lodash/has';
import mapKeys from 'lodash/mapKeys';

/**
 * Import dummy data for demo.
 */
import tasks from './../tasks.json';

let _tasks = tasks;

class MTStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = MTDispatcher.register( this.dispatcherCallback.bind( this ) );
  }

  submitTask( title ) {
    // Initiate the object data.
    const data = {
      id: uniqid(),
      title: title,
      active: true,
    };

    // Add new task to the list (appending not mutating).
    _tasks = [..._tasks, data];
  }

  completeTask( data ) {
    this.updateSingleTaskProperty( data.id, 'active', data.active );
  }

  updateTask( data ) {
    this.updateSingleTaskProperty( data.id, 'title', data.title );
  }

  removeTask( id ) {
    /**
     * Remove task recursively.
     *
     * @todo Need to find better way to fix this!!!
     * - TODO:  Don't run looping just to remove a task, imagine we have 1000 tasks!
     * - FIXED: Not working with shouldComponentUpdate because the task object is
     *          mutated. It's fixed by applying spread variable to update task title.
     */
    mapKeys( _tasks, ( task, key ) => {
      // Find the task ID.
      if ( has( task, 'id' ) && task.id === id ) {
         // Remove the task.
        _tasks.splice( key, 1 );
      }
    } );
  }

  getAll() {
    return _tasks;
  }

  /**
   * Update single task property.
   *
   * @param  {string} id        Task ID.
   * @param  {string} taskKey   Task property.
   * @param  {mixed}  taskValue New task property value
   */
  updateSingleTaskProperty( id, taskKey, taskValue ) {
    /**
     * Update task property by checking the items recursively.
     *
     * @todo Need to find better way to fix this!!!
     * - TODO:  Don't run looping just to update the value, imagine we have 1000 tasks!
     * - FIXED: Not working with shouldComponentUpdate because the task object is
     *          mutated. It's fixed by applying spread variable to update task status.
     */
    mapKeys( _tasks, ( task, key ) => {
      // Find the task ID.
      if ( task.id === id ) {
        // Update the task status.
        task = {...task, [taskKey]: taskValue};
        _tasks[key] = task;
      }
    } );

    // Update existing tasks.
    // this.setState({
    //   tasks,
    // });
  }

  emitSubmitChange() {
    this.emit( SUBMIT_TASK );
  }

  emitCompleteChange() {
    this.emit( COMPLETE_TASK );
  }

  emitUpdateChange() {
    this.emit( UPDATE_TASK );
  }

  emitRemoveChange() {
    this.emit( REMOVE_TASK );
  }

  addChangeListener( event, callback ) {
    this.on( event, callback );
  }

  removeChangeListener( event, callback ) {
    this.removeListener( event, callback );
  }

  dispatcherCallback( action ) {
    switch ( action.type ) {
      case SUBMIT_TASK:
        this.submitTask( action.title );
        this.emitSubmitChange();
        break;

      case COMPLETE_TASK:
        this.completeTask( action.data );
        this.emitCompleteChange();
        break;

      case UPDATE_TASK:
        this.updateTask( action.data );
        this.emitUpdateChange();
        break;

      case REMOVE_TASK:
        this.removeTask( action.id );
        this.emitRemoveChange();
        break;
    }

    return true;
  }
}

export default new MTStore();
