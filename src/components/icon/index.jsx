/**
 * Import dependencies.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types';
import MTGetIcon from './list';
import './style.scss';

/**
 * Icon component.
 *
 * Render icon component with following attributes:
 *
 * @since 0.0.1
 */
class MTIcon extends Component {
  /**
   * Hooks shouldComponentUpdate.
   *
   * Right now, MTIcon is dummy component. It doesn't need any rerendering process.
   * Once it's created, all the properties won't be changed. Consider to play any
   * effect or animation via CSS only. For example: hover or focus effect.
   *
   * @return {boolean} Return false if component doesn't need rerendering.
   */
  shouldComponentUpdate( nextProps ) {
    return false;
  }

  /**
   * Render icon container.
   *
   * @return {string} Icon container with size and color.
   */
  render() {
    // Icon properties.
    const iconSize = this.props.size;
    const iconName = this.props.name;
    const iconStyles = {
      color: this.props.color,
    };

    return (
      <div className="mt-icon" style={iconStyles}>
        <svg width={iconSize} height={iconSize} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
          { MTGetIcon( iconName ) }
        </svg>
      </div>
    );
  }
}

/**
 * Validate props data type.
 *
 * @type {Object}
 */
MTIcon.propTypes = {
  size: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  color: ExtraPropTypes.color.isRequired,
}

export default MTIcon;
