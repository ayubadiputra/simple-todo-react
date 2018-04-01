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
} from './../constants/';

/**
 * Flux actions creator.
 *
 * Declare all needed action to dispatch action type and value.
 *
 * @since 0.0.1
 */
class MTActions {
  /**
   * Submit new task action.
   *
   * @param {string} title New task title.
   */
  submitTask( title ) {
    MTDispatcher.dispatch({
      type: SUBMIT_TASK,
      title: title,
    });
  }

  /**
   * Complete existing task action.
   *
   * @param {object} data Task details includes id and active status.
   */
  completeTask( data ) {
    MTDispatcher.dispatch({
      type: COMPLETE_TASK,
      data: data,
    });
  }

  /**
   * Update task title action.
   *
   * @param {object} data Task details includes id and new task title.
   */
  updateTask( data ) {
    MTDispatcher.dispatch({
      type: UPDATE_TASK,
      data: data,
    });
  }

  /**
   * Remove existing task action.
   *
   * @param {string} id Task id will be removed.
   */
  removeTask( id ) {
    MTDispatcher.dispatch({
      type: REMOVE_TASK,
      id: id,
    });
  }
}

export default new MTActions();
