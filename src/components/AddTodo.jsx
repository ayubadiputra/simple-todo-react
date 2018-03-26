import React, { Component } from 'react';
import styles from './AddTodo.css';

class MTAddTodo extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.header}>What do you want to do today?</h1>
        <form className={styles.form}>
          <input type="text" name="task" className={styles.input} />
        </form>
      </div>
    );
  }
}

export default MTAddTodo;
