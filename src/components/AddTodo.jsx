/**
 * Import dependencies.
 */
import React, { Component } from 'react';
import './AddTodo.scss';

/**
 * Import Flux dependencies.
 */
import MTActions from './../actions';

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
   * Hooks shouldComponentUpdate.
   *
   * Avoid unnecessary rerendering component.
   *
   * @return {Boolean} Return false if component doesn't need rerendering.
   */
  shouldComponentUpdate( nextProps, nextState ) {
    // Declare vars.
    const { title } = this.state;
    const { title: nextTitle } = nextState;

    // When user is writing the task title.
    if ( title !== nextTitle ) {
      return true;
    }

    return false;
  }

  /**
   * Handle change event.
   *
   * @param {Object} e Current target element.
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
   * @param {Object} e Current target element.
   */
  handleSubmit(e) {
    e.preventDefault();

    // Declare vars.
    const { title } = this.state;

    // Tell action creator to add new task based on submitted title.
    MTActions.submitTask( title );

    // Reset the input.
    this.setState({
      title: '',
    });
  }

  /**
   * Render AddTodo form to submit title task.
   *
   * @return {String} AddTodo HTML tags.
   */
  render() {
    // Declare vars.
    const { title } = this.state;

    return (
      <div className="mt-addtodo">
        <h2 className="mt-addtodo__title">
          What do you want to do today?
        </h2>
        <form className="mt-addtodo__form" onSubmit={this.handleSubmit}>
          <input type="text" className="mt-addtodo__form__input" placeholder="Type a task, then press enter ... " value={title} onChange={this.handleChange} />
        </form>
      </div>
    );
  }
}

export default MTAddTodo;
