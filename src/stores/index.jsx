/**
 * Import dependencies.
 */
import MTDispatcher from './../MTDispatcher';
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

/**
 * Import dummy data for demo.
 */
import tasks from './../tasks.json';

let _mt_tasks = tasks;

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
    _mt_tasks = [..._mt_tasks, data];
    console.log(_mt_tasks)
  }

  completeTask( title ) {
    console.log(title)
  }

  updateTask( title ) {
    console.log(title)
  }

  removeTask( title ) {
    console.log(title)
  }

  getAll() {
    return _mt_tasks;
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
        this.completeTask( action.value );
        this.emitCompleteChange();
        break;

      case UPDATE_TASK:
        this.updateTask( action.value );
        this.emitUpdateChange();
        break;

      case REMOVE_TASK:
        this.removeTask( action.value );
        this.emitRemoveChange();
        break;
    }

    return true;
  }
}

export default new MTStore();
