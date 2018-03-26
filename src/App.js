import React, { Component } from 'react';
import MTAddTodo from './components/AddTodo';
import MTTodoList from './components/TodoList';
import styles from './App.css';

class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <MTAddTodo />
        <MTTodoList />
      </div>
    );
  }
}

export default App;
