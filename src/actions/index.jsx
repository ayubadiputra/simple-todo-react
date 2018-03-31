/**
 * Import dependencies.
 */
import MTDispatcher from './../dispatcher';
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

  completeTask( data ) {
    MTDispatcher.dispatch({
      type: COMPLETE_TASK,
      data: data,
    });
  }

  updateTask( data ) {
    MTDispatcher.dispatch({
      type: UPDATE_TASK,
      data: data,
    });
  }

  removeTask( id ) {
    MTDispatcher.dispatch({
      type: REMOVE_TASK,
      id: id,
    });
  }
}

export default new MTActions();
