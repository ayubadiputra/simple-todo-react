import React, { Component } from 'react';
import MTTodoItem from './TodoItem';
import classNames from 'classnames';
import styles from './TodoList.scss';

class MTTodoList extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      page: 'all'
    };
    this.handlePage = this.handlePage.bind( this );
  }

  handlePage(e) {
    this.setState({
      page: e.target.id
    });
  }

  render() {
    const tasks = this.props.tasks;
    const page = this.state.page;
    const active = [];
    const completed = [];
    let render = [];

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

    if ( page == 'all' ) {
      render = active.concat( completed );
    } else if ( page == 'active' ) {
      render = active;
    } else {
      render = completed;
    }

    return (
      <div className="mt-todolist">
        <ul className="mt-todolist__list">
          { render }
        </ul>
        <div className="mt-todolist__filters">
          <a id="all" href="#all" onClick={this.handlePage}>
            All
          </a>
          <a id="active" href="#active" onClick={this.handlePage}>
            Active
          </a>
          <a id="completed" href="#completed" onClick={this.handlePage}>
            Completed
          </a>
        </div>
      </div>
    );
  }
}

export default MTTodoList;
