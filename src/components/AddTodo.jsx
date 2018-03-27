import React, { Component } from 'react';
import styles from './AddTodo.scss';

class MTAddTodo extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>What do you want to do today?</h2>
        <form className={styles.form}>
          <input type="text" name="task" className={styles.input} />
        </form>
      </div>
    );
  }
}

export default MTAddTodo;
