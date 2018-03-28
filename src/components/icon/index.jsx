/**
 * Import dependencies.
 */
import React, { Component } from 'react';
import './style.scss';

/**
 * Icon component.
 *
 * Render icon component with following attributes:
 * - icon name
 * - color
 * - size
 *
 * @since 0.0.1
 */
class MTIcon extends Component {
  /**
   * Get SVG icon based on the icon name.
   *
   * @param  {string} name Icon name.
   * @return {string|null} SVG icon string.
   */
  getIcon( name ) {

    // Check icon name.
    // TODO: PROPTYPES -> Ensure icon name is string.
    switch( name ) {

      case 'edit':
        return (
          <path d="M888 1184l116-116-152-152-116 116v56h96v96h56zm440-720q-16-16-33 1l-350 350q-17 17-1 33t33-1l350-350q17-17 1-33zm80 594v190q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q63 0 117 25 15 7 18 23 3 17-9 29l-49 49q-14 14-32 8-23-6-45-6h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-126q0-13 9-22l64-64q15-15 35-7t20 29zm-96-738l288 288-672 672h-288v-288zm444 132l-92 92-288-288 92-92q28-28 68-28t68 28l152 152q28 28 28 68t-28 68z"/>
        );

      case 'trash':
        return (
          <path d="M704 736v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm256 0v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm256 0v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm128 724v-948h-896v948q0 22 7 40.5t14.5 27 10.5 8.5h832q3 0 10.5-8.5t14.5-27 7-40.5zm-672-1076h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z"/>
        );

      case 'save':
        return (
          <path d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293h-704q-52 0-84.5-37.5t-32.5-90.5v-128q0-53 32.5-90.5t84.5-37.5h704l-293-294q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z"/>
        );

      default :
        return null;
    }
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
          { this.getIcon( iconName ) }
        </svg>
      </div>
    );
  }
}

export default MTIcon;
