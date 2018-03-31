/**
 * Import dependencies.
 */
import MTDispatcher from './../MTDispatcher';
import {
  SUBMIT_TASK,
  COMPLETE_TASK,
  UPDATE_TASK,
  REMOVE_TASK,
} from './../constants/';

class MTActions {
  submitTask( title ) {
    MTDispatcher.dispatch({
      type: SUBMIT_TASK,
      title: title,
    });
  }

  completeTask( status ) {
    MTDispatcher.dispatch({
      type: COMPLETE_TASK,
      value: status,
    });
  }

  updateTask( data ) {
    MTDispatcher.dispatch({
      type: UPDATE_TASK,
      value: data,
    });
  }

  removeTask( id ) {
    MTDispatcher.dispatch({
      type: REMOVE_TASK,
      value: id,
    });
  }
}

export default new MTActions();
