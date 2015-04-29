/*
 * Copyright (C) Pootle contributors.
 *
 * This file is a part of the Pootle project. It is distributed under the GPL3
 * or later license. See the LICENSE file for a copy of the license and the
 * AUTHORS file for copyright and authorship information.
 */

'use strict';

import React from 'react';
import { PureRenderMixin } from 'react/addons';


let AccountInactive = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    onClose: React.PropTypes.func.isRequired,
  },


  /* Layout */

  render() {
    return (
      <div className="actions">
        <p>{gettext('Your account is inactive because an administrator deactivated it.')}</p>
        <div>
          <button
            className="btn btn-primary"
            onClick={this.props.onClose}
          >
            {gettext('Close')}
          </button>
        </div>
      </div>
    );
  }

});


export default AccountInactive;
