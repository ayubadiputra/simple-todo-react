/**
 * Import dependencies.
 */
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import MTIcon from './icon';
import './TodoItem.scss';

/**
 * Import Flux dependencies.
 */
import MTActions from './../actions';

/**
 * Import utilities.
 */
import isEqual from 'lodash/isEqual';

/**
 * TodoItem component.
 *
 * Render container task item.
 *
 * @since 0.0.1
 */
class MTTodoItem extends Component {
  /**
   * The constructor.
   *
   * @param {Object} props Object props.
   */
  constructor( props ) {
    super( props );

    // Declare vars.
    const {
      title,
      id,
    } = this.props.task;

    // Initiate states.
    this.state = {
      edit: false,
      title,
    };

    // Add class property.
    this.id = id;

    // Complete task event handler.
    this.handleComplete = this.handleComplete.bind( this );

    // Update task title event handler.
    this.handleEdit = this.handleEdit.bind( this );
    this.handleFocus = this.handleFocus.bind( this );
    this.handleChange = this.handleChange.bind( this );
    this.handleUpdate = this.handleUpdate.bind( this );

    // Remove task event handler.
    this.handleRemove = this.handleRemove.bind( this );
  }

  /**
   * Hooks componentDidUpdate function.
   */
  componentDidUpdate() {
    // Declare vars.
    const { edit } = this.state;

    // Focus on the input when the task is editing.
    if ( edit ) {
      this.textInput.focus();
    }
  }

  /**
   * Hooks shouldComponentUpdate.
   *
   * Avoid unnecessary rerendering component.
   *
   * @param  {Object} nextProps Props object.
   * @param  {Object} nextState State object.
   * @return {Boolean} Return false if component doesn't need rerendering.
   */
  shouldComponentUpdate( nextProps, nextState ) {
    // Declare vars.
    const {
      edit,
      title,
    } = this.state;

    const {
      edit: nextEdit,
      title: nextTitle,
    } = nextState;

    const { task } = this.props;
    const { task: nextTask } = nextProps;

    // When user click on update icon.
    if ( edit !== nextEdit ) {
      return true;
    }

    // When user is writing on the task title input.
    if ( title !== nextTitle ) {
      return true;
    }

    // When tasks list is updated because current task was completed.
    if ( ! isEqual( task, nextTask ) ) {
      return true;
    }

    return false;
  }

  /**
   * Handle complete task event.
   *
   * @param {Object} e Current target element.
   */
  handleComplete(e) {
    // Declare vars.
    const { id } = this;

    // Tell action creator to mark/unmark selected task.
    MTActions.completeTask({ id, active: ! e.target.checked });
  }

  /**
   * Handle remove task event.
   *
   * @param {Object} e Current target element.
   */
  handleRemove(e) {
    e.preventDefault();

    // Tell action creator to remove selected task.
    MTActions.removeTask( this.id );
  }

  /**
   * Handle update task event.
   *
   * @param {Object} e Current target element.
   */
  handleUpdate(e) {
    e.preventDefault();

    // Declare vars.
    const { id } = this;
    const { title } = this.state;

    // Tell action creator to update current task title based on submitted title.
    MTActions.updateTask({ id, title });

    // Set edit state as false to close the input.
    this.setState({
      edit: false,
    });
  }

  /**
   * Handle edit task event.
   *
   * @param {Object} e Current target element.
   */
  handleEdit(e) {
    // Update edit state to render the input.
    this.setState({
      edit: ! this.state.edit,
    });
  }

  /**
   * Handle focus task event.
   *
   * Focus on the last chars on the input.
   *
   * @param {Object} e Current target element.
   */
  handleFocus(e) {
    const title = e.target.value;
    e.target.value = '';
    e.target.value = title;
  }

  /**
   * Handle change task event.
   *
   * @param {Object} e Current target element.
   */
  handleChange(e) {
    // Update title state to render the input.
    this.setState({
      title: e.target.value,
    });
  }

  /**
   * Render TodoItem to display title task with the actions.
   *
   * @return {String} TodoItem HTML tags.
   */
  render() {
    // Fetch task object.
    const {
      active,
      title,
    } = this.props.task;

    const {
      edit: editable,
      title: currentTitle,
    } = this.state;

    // Label class names.
    const labelClass = classNames({
      'mt-todoitem__label': true,
      'mt-todoitem__label--completed': ! active,
    });

    return (
      <li className="mt-todoitem">
        <label className="mt-todoitem__checkbox">
          <input type="checkbox" defaultChecked={ ! active } onClick={this.handleComplete} />
          <span className="mt-todoitem__checkbox__checkmark"></span>
        </label>

        { ! editable &&
        <label className={labelClass}>
          {title}
        </label> }

        { editable &&
        <form className="mt-todoitem__input" onSubmit={this.handleUpdate}>
          <input
            value={currentTitle}
            ref={ input => this.textInput = input }
            onFocus={this.handleFocus}
            onChange={this.handleChange}
          />

          <button type="submit" className="mt-todoitem__input__save">
            <MTIcon name="save" color="#3498db" size={20}/>
          </button>
        </form> }

        <div className="mt-todoitem__actions">
          { ! editable &&
          <button className="mt-todoitem__actions__edit" onClick={this.handleEdit}>
            <MTIcon name="edit" color="#00b894" size={20}/>
          </button> }

          <button className="mt-todoitem__actions__remove" onClick={this.handleRemove}>
            <MTIcon name="trash" color="#d63031" size={20} />
          </button>
        </div>
      </li>
    );
  }
}

/**
 * Validate props data type.
 *
 * @type {Object}
 */
MTTodoItem.propTypes = {
  task: PropTypes.object.isRequired,
}

export default MTTodoItem;
