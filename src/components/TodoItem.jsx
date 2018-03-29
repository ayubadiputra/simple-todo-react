/**
 * Import dependencies.
 */
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from './icon';
import './TodoItem.scss';

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
   * @param {object} props Object props.
   */
  constructor( props ) {
    super( props );

    const task = this.props.task;

    // Initiate states.
    this.state = {
      edit: false,
      title: task.title,
    };

    // Add class property.
    this.id = task.id;

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
   * Hooks shouldComponentUpdate.
   *
   * Avoid unnecessary rerendering component.
   *
   * @return {boolean} Return false if component doesn't need rerendering.
   */
  shouldComponentUpdate( nextProps, nextState ) {
    // When user click on update icon.
    if ( this.state.edit !== nextState.edit ) {
      return true;
    }

    // When user is writing on the task title input.
    if ( this.state.title !== nextState.title ) {
      return true;
    }

    // When tasks list is updated because current task was completed.
    if ( ! isEqual( this.props.task, nextProps.task ) ) {
      return true;
    }

    return false;
  }

  /**
   * Handle complete task event.
   *
   * @param {object} e Current target element.
   */
  handleComplete(e) {
    // Lift up task ID and active status to completeTask().
    this.props.completeTask( this.id, e.target.checked );
  }

  /**
   * Handle edit task event.
   *
   * @param {object} e Current target element.
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
   * @param {object} e Current target element.
   */
  handleFocus(e) {
    const title = e.target.value;
    e.target.value = '';
    e.target.value = title;
  }

  /**
   * Handle change task event.
   *
   * @param {object} e Current target element.
   */
  handleChange(e) {
    // Update title state to render the input.
    this.setState({
      title: e.target.value,
    });
  }

  /**
   * Handle update task event.
   *
   * @param {object} e Current target element.
   */
  handleUpdate(e) {
    e.preventDefault();

    // Lift up task ID and active status to updateTask().
    this.props.updateTask( this.id, this.state.title );

    // Set edit state as false to close the input.
    this.setState({
      edit: false,
    });
  }

  /**
   * Handle remove task event.
   *
   * @param {object} e Current target element.
   */
  handleRemove(e) {
    e.preventDefault();

    // Lift up task ID to removeTask().
    this.props.removeTask( this.id );
  }

  /**
   * Hooks componentDidUpdate function.
   */
  componentDidUpdate() {
    // Focus on the input when the task is editing.
    if ( this.state.edit ) {
      this.textInput.focus();
    }
  }

  /**
   * Render TodoItem to display title task with the actions.
   *
   * @return {string} TodoItem HTML tags.
   */
  render() {
    // Fetch task object.
    const task = this.props.task;
    const editable = this.state.edit;

    // Label class names.
    const labelClass = classNames({
      'mt-todoitem__label': true,
      'mt-todoitem__label--completed': ! task.active,
    });

    return (
      <li className="mt-todoitem">
        <label className="mt-todoitem__checkbox">
          <input type="checkbox" defaultChecked={ ! task.active } onClick={this.handleComplete} />
          <span className="mt-todoitem__checkbox__checkmark"></span>
        </label>

        { ! editable &&
        <label className={labelClass}>
          {task.title}
        </label> }

        { editable &&
        <form className="mt-todoitem__input" onSubmit={this.handleUpdate}>
          <input
            value={this.state.title}
            ref={ input => this.textInput = input }
            onFocus={this.handleFocus}
            onChange={this.handleChange}
          />

          <button type="submit" className="mt-todoitem__input__save">
            <Icon name="save" color="#3498db" size={20}/>
          </button>
        </form> }

        <div className="mt-todoitem__actions">
          { ! editable &&
          <a href="#" className="mt-todoitem__actions__edit" onClick={this.handleEdit}>
            <Icon name="edit" color="#00b894" size={20}/>
          </a> }

          <a href="#" className="mt-todoitem__actions__remove" onClick={this.handleRemove}>
            <Icon name="trash" color="#d63031" size={20} />
          </a>
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
  completeTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
}

export default MTTodoItem;
