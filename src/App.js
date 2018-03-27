import React, { Component } from 'react';
import MTAddTodo from './components/AddTodo';
import MTTodoList from './components/TodoList';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="mt-container">
        <MTAddTodo />
        <MTTodoList />
      </div>
    );
  }
}

export default App;
