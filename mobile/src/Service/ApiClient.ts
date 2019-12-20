//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import axios from "axios";

const ApiClient = axios.create({
  // baseURL: __DEV__ ? `http://localhost:8080/api/v1` : "http://3.15.28.92:8080/api/v1/",
  // baseURL: "http://sneakgeek-success.azurewebsites.net/api/v1",
  baseURL: __DEV__
    ? "http://localhost:8080/api/v1"
    : "https://sneakgeek-test.azurewebsites.net/api/v1",
  timeout: 10000
});

export default ApiClient;
