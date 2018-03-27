import React, { Component } from 'react';
import styles from './TodoItem.scss';

class MTTodoItem extends Component {
  render() {
    return (
      <li key="1">
        <input name="task-item" className={styles.input} value="Task number 1" />
        <div className={styles.label}>Task number 1</div>
        <a href="#" className={styles.edit}>Edit</a>
        <a href="#" className={styles.remove}>Remove</a>
      </li>
    );
  }
}

export default MTTodoItem;
