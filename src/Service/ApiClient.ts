//!
//! Copyright (c) 2019 - VSNKRS. All rights reserved
//!

import axios from "axios";

const ApiClient = axios.create({
  baseURL: __DEV__ ? `http://localhost:8080/api/v1` : "http://3.15.28.92:8080/api/v1/",
  timeout: 10000
});

export default ApiClient;
