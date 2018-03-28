import React, { Component } from 'react';
import './AddTodo.scss';

class MTAddTodo extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      title: '',
    };
    this.handleSubmit = this.handleSubmit.bind( this );
    this.handleChange = this.handleChange.bind( this );
  }

  handleSubmit( e ) {
    e.preventDefault();
    this.setState({
      title: '',
    });
    this.props.submitTask( this.state.title );
  }

  handleChange( e ) {
    this.setState({
      title: e.target.value,
    });
  }

  render() {
    return (
      <div className="mt-addtodo">
        <h2 className="mt-addtodo__title">
          What do you want to do today?
        </h2>
        <form className="mt-addtodo__form" onSubmit={this.handleSubmit}>
          <input type="text" className="mt-addtodo__form__input" placeholder="Type a task, then press enter ... " onChange={this.handleChange} value={this.state.title} />
        </form>
      </div>
    );
  }
}

export default MTAddTodo;
