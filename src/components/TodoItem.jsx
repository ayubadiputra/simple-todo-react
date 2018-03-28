import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from './icon/Icon';
import './TodoItem.scss';

class MTTodoItem extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      edit: false,
      title: this.props.task.title,
    };
    this.id = this.props.task.id;
    this.handleComplete = this.handleComplete.bind( this );
    this.handleEdit = this.handleEdit.bind( this );
    this.handleChange = this.handleChange.bind( this );
    this.handleUpdate = this.handleUpdate.bind( this );
    this.handleFocus = this.handleFocus.bind( this );
  }

  handleComplete(e) {
    this.props.completeTask( e.target.value, e.target.checked );
  }

  handleEdit(e) {
    this.setState({
      edit: ! this.state.edit
    });
  }

  handleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  handleFocus(e) {
    const tempTitle = e.target.value;
    e.target.value = '';
    e.target.value = tempTitle;
  }

  handleUpdate(e) {
    e.preventDefault();
    this.props.updateTask( this.id, this.state.title );
    this.setState({
      edit: false
    });
    this.textInput.blur();
  }

  componentDidUpdate() {
    if ( this.state.edit ) {
      this.textInput.focus();
    }
  }

  render() {
    const task = this.props.task;

    const itemClass = classNames({
      'mt-todoitem': true,
      'mt-todoitem--editable': this.state.edit,
    });

    const labelClass = classNames({
      'mt-todoitem__label': true,
      'mt-todoitem__label--completed': ! task.active,
      'mt-todoitem__label--hide': this.state.edit,
    });

    const inputClass = classNames({
      'mt-todoitem__input': true,
      'mt-todoitem__input--show': this.state.edit,
    });

    return (
      <li key={task.id} className={itemClass}>
        <label className="mt-todoitem__checkbox">
          <input type="checkbox" defaultChecked={! task.active} value={task.id} onClick={this.handleComplete} />
          <span className="mt-todoitem__checkbox__checkmark"></span>
        </label>
        <label className={labelClass}>
          {task.title}
        </label>

          <form className={inputClass} onSubmit={this.handleUpdate}>
            <input
              value={this.state.title}
              ref={ input => { this.textInput = input; } }
              onFocus={this.handleFocus}
              onChange={this.handleChange}
            />

            <button type="submit" className="mt-todoitem__input__save">
              <Icon name="save" color="#3498db" />
            </button>
          </form>

        <div className="mt-todoitem__actions">
          { ! this.state.edit &&
            <a href="#" className="mt-todoitem__actions__edit" onClick={this.handleEdit}>
              <Icon name="edit" color="#00b894" />
            </a>
          }
          <a href="#" className="mt-todoitem__actions__remove">
            <Icon name="trash" color="#d63031" />
          </a>
        </div>

      </li>
    );
  }
}

export default MTTodoItem;
