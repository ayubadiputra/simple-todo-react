/**
 * Import dependencies.
 */
import { EventEmitter } from 'events';

/**
 * Import Flux dependencies.
 */
import MTDispatcher from './../dispatcher';

/**
 * Import constants.
 */
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

/**
 * Flux store.
 *
 * Handle data processing and emit events to listeners (components that subscribed).
 *
 * @since 0.0.1
 */
class MTStore extends EventEmitter {
  /**
   * The constructor.
   */
  constructor() {
    super();

    // Dispatcher register store callback.
    this.dispatchToken = MTDispatcher.register( this.dispatcherCallback.bind( this ) );
  }

  /*============================================================
   * EVENTS EMITTER
   *
   * Emit specific event to listener (components that subscribed).
   *============================================================*/

  /**
   * Emit event for submitting new task.
   */
  emitSubmitChange() {
    this.emit( SUBMIT_TASK );
  }

  /**
   * Emit event for completing specific task.
   */
  emitCompleteChange() {
    this.emit( COMPLETE_TASK );
  }

  /**
   * Emit event for updating specific task title.
   */
  emitUpdateChange() {
    this.emit( UPDATE_TASK );
  }

  /**
   * Emit event for removing specific task.
   */
  emitRemoveChange() {
    this.emit( REMOVE_TASK );
  }

  /*============================================================
   * REGISTER/UNREGISTER EVENTS
   *
   * Used by components to subscribe on specific events. When
   * component will unmount, the subscription will be removed.
   *============================================================*/

   /**
    * Subscribes on specific event.
    *
    * @param {String}   event    Event name.
    * @param {Function} callback Function callback of component.
    */
  addChangeListener( event, callback ) {
    this.on( event, callback );
  }

  /**
    * Unsubscribes on specific event.
    *
    * @param {String}   event    Event name.
    * @param {Function} callback Function callback of component.
    */
  removeChangeListener( event, callback ) {
    this.removeListener( event, callback );
  }

  /*============================================================
   * LIST OF DISPATCH CALLBACK
   *
   * Called by dispatcher after specific event is triggered.
   *============================================================*/

  /**
   * Submit new task to "local" tasks list.
   *
   * @param {String} title New task title.
   */
  submitTask( title ) {
    // Initiate the object data.
    const data = {
      id: uniqid(),
      active: true,
      title,
    };

    // Add new task to "local" list (appending not mutating).
    _tasks = [..._tasks, data];
  }

  /**
   * Toggle task in "local" tasks list based on the task ID.
   *
   * @param {Object} data Task ID and active status.
   */
  completeTask( data ) {
    this.updateSingleTaskProperty( data.id, 'active', data.active );
  }

  /**
   * Update specific task title in "local" tasks list based on the task ID.
   *
   * @param {Object} data Task ID and new title.
   */
  updateTask( data ) {
    this.updateSingleTaskProperty( data.id, 'title', data.title );
  }

  /**
   * Remove task from "local" list based on the task ID.
   *
   * @param {String} id Task ID.
   */
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

  /**
   * Update single task property.
   *
   * @param  {String} id        Task ID.
   * @param  {String} taskKey   Task property.
   * @param  {Mixed}  taskValue New task property value
   */
  updateSingleTaskProperty( id, taskKey, taskValue ) {
    /**
     * Update task property by checking the items recursively.
     *
     * @todo Need to find better way to fix this!!!
     * - TODO:  Don't run looping just to update the value, imagine we have 1000 tasks!
     * - FIXED: Not working with shouldComponentUpdate because the task object is
     *          mutated. It's fixed by applying spread variable to update task property.
     */
    mapKeys( _tasks, ( task, key ) => {
      // Find the task ID.
      if ( task.id === id ) {
        // Update the task property.
        task = {...task, [taskKey]: taskValue};
        _tasks[key] = task;
      }
    } );
  }

  /**
   * Return "local" tasks list.
   *
   * @return {Array} Local tasks list.
   */
  getAll() {
    return _tasks;
  }

  /**
   * Dispatcher callback.
   *
   * When an action is called, the action will ask dispatcher to run the callback
   * and emit the event to listener.
   *
   * @param  {Object} action Action type and additional data.
   * @return {Boolean}       Flag about the callback.
   */
  dispatcherCallback( action ) {
    switch ( action.type ) {

      // Submit new task.
      case SUBMIT_TASK:
        this.submitTask( action.title );
        this.emitSubmitChange();
        break;

      // Complete existing task.
      case COMPLETE_TASK:
        this.completeTask( action.data );
        this.emitCompleteChange();
        break;

      // Update task title.
      case UPDATE_TASK:
        this.updateTask( action.data );
        this.emitUpdateChange();
        break;

      // Remove existing task.
      case REMOVE_TASK:
        this.removeTask( action.id );
        this.emitRemoveChange();
        break;

      default:
        return false;
    }

    return true;
  }
}

export default new MTStore();
