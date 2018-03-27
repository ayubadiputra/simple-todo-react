import React, { Component } from 'react';
import './AddTodo.scss';

class MTAddTodo extends Component {
  render() {
    return (
      <div className="mt-addtodo">
        <h2 className="mt-addtodo__title">
          What do you want to do today?
        </h2>
        <form className="mt-addtodo__form">
          <input type="text" name="task" className="mt-addtodo__form__input" placeholder="Type a task, then press enter ... " />
        </form>
      </div>
    );
  }
}

export default MTAddTodo;
