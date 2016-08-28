import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import React from 'react';
import { If, Then } from 'react-if';
import { Link } from 'react-router';

import './NavbarComponentStyle.less';

const navbar = React.createClass({
  componentDidMount: function () {
    $(this.refs.profile).dropdown();
  },
  render: function () {
    return (
      <div className="ui top attached menu">
        <a className="ui icon item" onClick={this.openContactAddModal}>
          <i className="add user icon"/>
          &nbsp; Add contacts
        </a>
        <Link className="ui icon item" to="/invites">
          <i className="users icon"/>
          &nbsp; Invites
          <If condition={this.props.hasInvites}>
            <Then>
              <span className="ui mini green circular label navbar-label">
                {this.props.invites}
              </span>
            </Then>
          </If>
        </Link>
        <div className="right menu">
          <div className="ui right aligned category search item">
            <div className="ui transparent icon input">
              <input className="prompt" placeholder="Search..." type="text"/>
              <i className="search link icon"/>
            </div>
            <div className="results"></div>
          </div>
          
          <div ref="profile" className="ui right dropdown icon item">
            <i className="user icon"/>
            &nbsp; Profile
            <div className="menu">
              <div className="item"><i className="life ring icon"/> Help</div>
              <div className="item"><i className="share icon"/> Feedback</div>
              <a className="item"><i className="setting icon"/> Settings</a>
              <a className="item" onClick={this.logout}>
                <i className="sign out icon"/>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  },
  openContactAddModal: function (event) {
    event.preventDefault();
    $('#contact-add-modal').modal('show');
  },
  logout: function () {
    Meteor.logout();
  }
});

function composer(props, onData) {
  const subscription = Meteor.subscribe('navbar.invites');
  
  if (subscription.ready()) {
    if (Counts.has('navbar.invites')) {
      const invites = Counts.get('navbar.invites');
      
      onData(null, {
        hasInvites: invites > 0,
        invites
      });
    }
  }
}

export const NavbarComponent = composeWithTracker(composer)(navbar);
