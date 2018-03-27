import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from './icon/Icon';
import './TodoItem.scss';

class MTTodoItem extends Component {
  constructor( props ) {
    super( props );
    this.handleComplete = this.handleComplete.bind( this );
  }

  handleComplete(e) {
    this.props.completeTask( e.target.value, e.target.checked );
  }

  render() {
    const task = this.props.task;

    const labelClass = classNames({
      'mt-todoitem__label': true,
      'mt-todoitem__label--completed': ! task.active
    });

    return (
      <li key={task.id} className="mt-todoitem">
        <label className="mt-todoitem__checkbox">
          <input type="checkbox" defaultChecked={! task.active} value={task.id} onClick={this.handleComplete} />
          <span className="mt-todoitem__checkbox__checkmark"></span>
        </label>
        <input className="mt-todoitem__input" value={task.title} />
        <label className={labelClass}>
          {task.title}
        </label>
        <div className="mt-todoitem__actions">
          <a href="#" className="mt-todoitem__actions__edit">
            <Icon name="edit" color="#00b894" />
          </a>
          <a href="#" className="mt-todoitem__actions__remove">
            <Icon name="trash" color="#d63031" />
          </a>
        </div>
      </li>
    );
  }
}

export default MTTodoItem;
