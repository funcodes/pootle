/*
 * Copyright (C) Pootle contributors.
 *
 * This file is a part of the Pootle project. It is distributed under the GPL3
 * or later license. See the LICENSE file for a copy of the license and the
 * AUTHORS file for copyright and authorship information.
 */

'use strict';

import React from 'react';
import FluxComponent from 'flummox/component';

import AccountActivation from './AccountActivation';
import AccountInactive from './AccountInactive';
import AuthWindow from './AuthWindow';
import RequestPasswordResetForm from './RequestPasswordResetForm';
import RequestPasswordResetSent from './RequestPasswordResetSent';
import PasswordResetForm from './PasswordResetForm';
import SignInPanel from './SignInPanel';
import SignUpForm from './SignUpForm';


let AuthController = React.createClass({

  propTypes: {
    // Optionally overrides state
    initialScreen: React.PropTypes.string,
    onClose: React.PropTypes.func.isRequired,
    socialAuthProviders: React.PropTypes.array.isRequired,
    tokenFailed: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      initialScreen: 'signIn',
      tokenFailed: false,
    };
  },


  /* Lifecycle */

  componentWillMount() {
    if (this.props.initialScreen) {
      this.props.flux.getActions('auth').gotoScreen(this.props.initialScreen);
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo !== null) {
      let currentLocation = window.location.pathname + window.location.hash;
      if (currentLocation !== nextProps.redirectTo) {
        window.location = nextProps.redirectTo;
      } else {
        window.location.reload();
      }
    }
  },


  /* Layout */

  getScreen(screenName, props) {
    // FIXME: use react-router
    switch (screenName) {
      case 'signIn':
        let hasSocialAuth = props.socialAuthProviders.length !== 0;
        return {
          title: hasSocialAuth ? gettext('Sign In With...') : gettext('Sign In'),
          content: SignInPanel,
        };
        break;

      case 'inactive':
        return {
          title: gettext('Account Inactive'),
          content: AccountInactive,
        };
        break;

      case 'signUp':
        return {
          title: gettext('Sign Up'),
          content: SignUpForm,
        };
        break;

      case 'activation':
        return {
          title: gettext('Account Activation'),
          content: AccountActivation,
        };
        break;

      case 'activation':
        return {
          title: gettext('Account Activation'),
          content: AccountActivation,
        };
        break;

      case 'requestPasswordReset':
        return {
          title: gettext('Reset Your Password'),
          content: RequestPasswordResetForm,
        };
        break;

      case 'requestPasswordResetSent':
        return {
          title: gettext('Reset Your Password'),
          content: RequestPasswordResetSent,
        };
        break;

      case 'passwordReset':
        return {
          title: gettext('Reset Your Password'),
          content: PasswordResetForm,
        };
        break;
    }
  },

  render() {
    let currentScreen = this.getScreen(this.props.screen, this.props);
    let ContentComponent = currentScreen.content;

    return (
      <AuthWindow
        title={currentScreen.title}
        onClose={this.props.onClose}
      >
        <ContentComponent
          canRegister={this.props.canRegister}
          onClose={this.props.onClose}
          socialAuthProviders={this.props.socialAuthProviders}
          tokenFailed={this.props.tokenFailed}
          {...this.props}
        />
      </AuthWindow>
    );
  }

});


export default AuthController;
