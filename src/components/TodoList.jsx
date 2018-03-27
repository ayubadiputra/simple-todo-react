import React, { Component } from 'react';
import MTTodoItem from './TodoItem';
import styles from './TodoList.scss';

class MTTodoList extends Component {
  render() {
    const tasks = this.props.tasks;

    return (
      <div className="mt-todolist">
        <ul className="mt-todolist__list">
          { tasks.map( (task) =>
              <MTTodoItem key={task.id} task={task} completeTask={this.props.completeTask} />
          ) }
        </ul>
        <div className="mt-todolist__filters">
          <a id="all" href="#all">All</a>
          <a id="active" href="#active">Active</a>
          <a id="complete" href="#completed">Completed</a>
        </div>
      </div>
    );
  }
}

export default MTTodoList;
