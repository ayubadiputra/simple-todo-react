import React, { Component } from 'react';
import MTTodoItem from './TodoItem';
import styles from './TodoList.scss';

class MTTodoList extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.filters}>
          <a id="all" href="#all">All</a>
          <a id="active" href="#active">Active</a>
          <a id="complete" href="#completed">Completed</a>
        </div>
        <ul className={styles.list}>
          <MTTodoItem />
        </ul>
      </div>
    );
  }
}

export default MTTodoList;
