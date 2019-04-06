import React, { Component } from "react";
import ReactDOM from 'react-dom';

import LoginForm from '../auth/login_form';
import * as setting from '../../setting.js';

// import '../styles/main.css';

function LoginButton(props) {
  return (
    <button type="button" class="btn btn-primary" onClick={props.onClick}>
      Log in
    </button>
  );
}

function UserControl(props) {
  return (
    <div className="dropdown">
      <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
        {props.username}
      </button>
      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
        <button className="dropdown-item" type="button" onClick={props.onClick}>Log out</button>
      </div>
    </div>
  );
}

function ShowAccessToken(props) {
  let access_token = setting.get_access_token();
  return (
    <div>
        <h1>Access token:</h1>
        <p> {access_token} </p>
    </div>

  );
}

class UserNav extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.update_user_name = this.update_user_name.bind(this);

    this.state = {username: null};
  }

  handleLoginClick() {
    ReactDOM.render(
        <LoginForm  update_user_name={this.update_user_name} />,
        document.getElementById("main")
    );
  }

  handleLogoutClick() {
    ReactDOM.render(<ShowAccessToken />, document.getElementById("main"));
    setting.set_access_token('');
    this.setState({username: null});
  }

  update_user_name(user_name) {
    ReactDOM.render(<ShowAccessToken />, document.getElementById("main"));
    this.setState({username: user_name});
  }

  render() {
    const username = this.state.username;
    let button;

    if (username) {
      button = <UserControl username={username} onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
          {button}
      </div>
    );
  }
}

export default UserNav;