import React, { Component } from 'react';
import MTTodoItem from './TodoItem';
import styles from './TodoList.scss';

class MTTodoList extends Component {
  render() {
    const tasks = this.props.tasks;
    const active = [];
    const completed = [];

    tasks.forEach( task => {
      if ( task.active ) {
        active.push(
          <MTTodoItem key={task.id} task={task} completeTask={this.props.completeTask} />
        );
      } else {
        completed.push(
          <MTTodoItem key={task.id} task={task} completeTask={this.props.completeTask} />
        );
      }
    } );

    return (
      <div className="mt-todolist">
        <ul className="mt-todolist__list">
          { active }
          { completed }
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
