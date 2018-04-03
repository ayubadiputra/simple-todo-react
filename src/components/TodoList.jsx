/**
 * Import dependencies.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MTTodoItem from './TodoItem';
import './TodoList.scss';

/**
 * TodoList component.
 *
 * Render container tasks list.
 *
 * @since 0.0.1
 */
class MTTodoList extends Component {
  /**
   * The constructor.
   *
   * @param {Object} props Object props.
   */
  constructor( props ) {
    super( props );

    // Initiate states.
    this.state = {
      page: 'all',
    };

    // Event handler.
    this.handlePage = this.handlePage.bind( this );
  }

  /**
   * Handle change page event.
   *
   * @param {Object} e Current target element.
   */
  handlePage(e) {
    e.preventDefault();

    // Filter the list based on target ID.
    this.setState({
      page: e.target.id,
    });
  }

  /**
   * Get task item complete with the props.
   *
   * @param  {Object} task Current object task.
   * @return {String}      HTML tag for the task item.
   */
  getItem( task ) {
    return (
      <MTTodoItem key={task.id} task={task} />
    );
  }

  /**
   * Render TodoList to display tasks list.
   *
   * @return {String} TodoList HTML tags.
   */
  render() {
    // Initiate tasks and page.
    const { tasks } = this.props;
    const { page } = this.state;

    // Set class names.
    const pageClass = 'mt-todolist__filters--' + page;
    const activePageClass = classNames({
      'mt-todolist__filters': true,
      [pageClass]: true,
    });

    // Declare tasks list variables.
    let render = [];
    const active = [];
    const completed = [];

    // Grouping all the tasks based on the status.
    tasks.forEach( task => {
      if ( task.active ) {
        active.push( this.getItem( task ) );
      } else {
        completed.push( this.getItem( task ) );
      }
    } );

    // Filters the tasks based on the status and save it in render.
    if ( page === 'all' ) {
      render = active.concat( completed );
    } else if ( page === 'active' ) {
      render = active;
    } else {
      render = completed;
    }

    return (
      <div className="mt-todolist">
        <ul className="mt-todolist__list">
          {render}
        </ul>
        <div className={activePageClass}>
          <a id="all" href="#all" onClick={this.handlePage}>All</a>
          <a id="active" href="#active" onClick={this.handlePage}>Active</a>
          <a id="completed" href="#completed" onClick={this.handlePage}>Completed</a>
        </div>
      </div>
    );
  }
}

/**
 * Validate props data type.
 *
 * @type {Object}
 */
MTTodoList.propTypes = {
  tasks: PropTypes.array.isRequired,
}

export default MTTodoList;
