import 'bootstrap';
import './scss/main.scss';

import React from "react";
import ReactDOM from "react-dom";

import UserNav from "./components/navs/user_nav.js";

ReactDOM.render(<UserNav />, document.getElementById("user_nav"));
