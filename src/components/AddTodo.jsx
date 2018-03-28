/**
 * Import dependencies.
 */
import React, { Component } from 'react';
import './AddTodo.scss';

/**
 * AddTodo component.
 *
 * Render a form to submit new task.
 *
 * @since 0.0.1
 */
class MTAddTodo extends Component {
  /**
   * The constructor.
   *
   * @param {object} props Object props.
   */
  constructor( props ) {
    super( props );

    // Initiate state.
    this.state = {
      title: '',
    };

    // Events handler.
    this.handleChange = this.handleChange.bind( this );
    this.handleSubmit = this.handleSubmit.bind( this );
  }

  /**
   * Handle change event.
   *
   * @param {object} e Current target element.
   */
  handleChange(e) {
    // Update the title based on input value.
    this.setState({
      title: e.target.value,
    });
  }

  /**
   * Handle submit event.
   *
   * @param {object} e Current target element.
   */
  handleSubmit(e) {
    e.preventDefault();

    // Lift up task title to submitTask().
    this.props.submitTask( this.state.title );

    // Reset the input.
    this.setState({
      title: '',
    });
  }

  /**
   * Render AddTodo form to submit title task.
   *
   * @return {string} AddTodo HTML tags.
   */
  render() {
    return (
      <div className="mt-addtodo">
        <h2 className="mt-addtodo__title">
          What do you want to do today?
        </h2>
        <form className="mt-addtodo__form" onSubmit={this.handleSubmit}>
          <input type="text" className="mt-addtodo__form__input" placeholder="Type a task, then press enter ... " value={this.state.title} onChange={this.handleChange} />
        </form>
      </div>
    );
  }
}

export default MTAddTodo;
