/**
 * Import dependencies.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types';
import MTIcon from './../icon';
import './style.scss';

/**
 * Button icon component.
 *
 * Render button with icon component with following attributes:
 *
 * @since 0.0.1
 */
class MTButtonIcon extends Component {
  /**
   * Hooks shouldComponentUpdate.
   *
   * Right now, MTButtonIcon is dummy component. It doesn't need any rerendering
   * process. Once it's created, all the properties won't be changed. Consider to
   * play any effect or animation via CSS only. For example: hover or focus effect.
   *
   * @return {Boolean} Return false if component doesn't need rerendering.
   */
  shouldComponentUpdate() {
    return false;
  }

  /**
   * Render icon container.
   *
   * @return {String} Icon container with size and color.
   */
  render() {
    // Icon properties.
    const {
      iconName,
      iconColor,
      iconSize,
      ...buttonProps,
    } = this.props;

    return (
      <button {...buttonProps}>
        <MTIcon name={iconName} color={iconColor} size={iconSize}/>
      </button>
    );
  }
}

/**
 * Validate props data type.
 *
 * @type {Object}
 */
MTButtonIcon.propTypes = {
  iconSize: PropTypes.number.isRequired,
  iconName: PropTypes.string.isRequired,
  iconColor: ExtraPropTypes.color.isRequired,
}

export default MTButtonIcon;
