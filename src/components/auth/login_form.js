import $ from 'jquery';

import React, { Component } from "react";

import * as setting from '../../setting.js';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.update_user_name = (user_name) => {
        this.props.update_user_name(user_name);
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let self = this;

    let data = {
      grant_type: 'password',
      username: this.state.username,
      password: this.state.password,
      client_id: setting.CLIENT_ID,
      client_secret: setting.CLIENT_SECRET
    };

    $.ajax({
      type: "POST",
      url: setting.AUTH_PATH,
      data: data,
      success: function (json) {
        setting.set_access_token(json['access_token']);
        self.update_user_name(self.state.username);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status + " " + thrownError + "\n" + xhr.responseText);
      }
    });
  }

  render() {
    return (
        <div className="container">
          <br/>
          <div className="row justify-content-md-center align-items-center">
            <div className="col-md-6 jumbotron">
              <h1 className="display-4">Log in</h1>
              <hr className="my-4"/>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                      name="username"
                      id="username"
                      className="form-control"
                      value={this.state.username}
                      onChange={this.handleInputChange}
                      required/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                      required/>
                </div>
                <input type="submit" value="Log In" className="btn btn-primary form-control"/>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default LoginForm;