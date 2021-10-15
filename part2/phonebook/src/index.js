import ReactDOM from "react-dom";
import App from "./App";
import React from "react";
import axios from "axios";
import baseURL from "./config/url";

axios.defaults.baseURL = baseURL;
ReactDOM.render(<App />, document.getElementById("root"));
